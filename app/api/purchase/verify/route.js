import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { sessionId } = req.body

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' })
    }

    const purchase = await prisma.purchase.findFirst({
      where: { stripeSessionId: sessionId },
      include: { product: true }
    })

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' })
    }

    // Check if download is still valid
    const isValid = new Date() <= purchase.tokenExpiresAt && purchase.downloadCount < purchase.maxDownloads

    res.status(200).json({
      success: true,
      downloadUrl: isValid ? `/api/download/${purchase.downloadToken}` : null,
      productName: purchase.product.name,
      expiresAt: purchase.tokenExpiresAt,
      downloadsRemaining: Math.max(0, purchase.maxDownloads - purchase.downloadCount),
      email: purchase.email
    })

  } catch (error) {
    console.error('Verification error:', error)
    res.status(500).json({ error: 'Failed to verify purchase' })
  }
}