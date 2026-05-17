import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import crypto from 'crypto'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    } else {
      event = JSON.parse(req.body)
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: 'Webhook error' })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    try {
      const productId = session.metadata?.productId

      if (!productId) {
        console.error('No product ID in session metadata')
        return res.status(400).json({ error: 'Missing product ID' })
      }

      // Generate secure download token
      const downloadToken = crypto.randomBytes(32).toString('hex')
      const tokenExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000) // 72 hours

      // Create purchase record
      await prisma.purchase.create({
        data: {
          email: session.customer_email || session.customer_details?.email || 'unknown',
          amount: session.amount_total,
          currency: session.currency,
          stripePaymentId: session.payment_intent,
          stripeSessionId: session.id,
          downloadToken,
          tokenExpiresAt,
          maxDownloads: 5,
          productId
        }
      })

      console.log(`Purchase created for ${session.customer_email}`)
    } catch (error) {
      console.error('Error creating purchase:', error)
      return res.status(500).json({ error: 'Failed to create purchase' })
    }
  }

  res.status(200).json({ received: true })
}