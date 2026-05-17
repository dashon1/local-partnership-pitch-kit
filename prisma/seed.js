const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const products = [
  {
    name: 'Starter',
    slug: 'starter',
    description: 'Essential partnership templates to get started',
    price: 4900, // $49
    tier: 'starter',
    featured: false,
    features: JSON.stringify([
      'Partnership Target List Worksheet',
      'Co-Promo Offer Builder',
      'Outreach Email Scripts (3)',
      'Instagram DM Scripts (4)',
      'Basic Partnership Proposal Template',
      'Revenue Split Worksheet',
      'Email Support'
    ])
  },
  {
    name: 'Professional',
    slug: 'professional',
    description: 'Complete partnership toolkit with all templates and scripts',
    price: 9700, // $97
    tier: 'professional',
    featured: true,
    features: JSON.stringify([
      'ALL Starter Features',
      'Sample Partnership Proposal',
      'Pop-up Collaboration Checklist',
      'Referral Partner Script',
      'Follow-up Sequence (7 touches)',
      'Partnership Tracking Sheet',
      'Quick Reference Guide',
      'Priority Email Support',
      'Access to Updates'
    ])
  },
  {
    name: 'Agency',
    slug: 'agency',
    description: 'Everything in Professional plus editable templates and white-label rights',
    price: 19700, // $197
    tier: 'agency',
    featured: false,
    features: JSON.stringify([
      'ALL Professional Features',
      'Editable PowerPoint Proposal Template',
      'Editable Google Sheets Tracking',
      'White-Label Rights',
      'Client-Facing Templates',
      'Training Video Access',
      'Private Community Access',
      '1-on-1 Strategy Call',
      'Lifetime Updates',
      'Phone Support'
    ])
  }
]

async function main() {
  console.log('Seeding database...')

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    })
    console.log(`Upserted product: ${product.name}`)
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })