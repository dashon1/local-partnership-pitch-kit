import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // In production, add proper authentication check
  // const isAuth = req.headers.authorization === `Bearer ${process.env.ADMIN_SECRET}`
  // if (!isAuth) return res.status(401).json({ error: 'Unauthorized' })

  try {
    // Get stats
    const purchases = await prisma.purchase.findMany({
      include: { product: true }
    })

    const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0)
    const totalSales = purchases.length
    const totalDownloads = purchases.reduce((sum, p) => sum + p.downloadCount, 0)
    const uniqueBuyers = new Set(purchases.map(p => p.email)).size

    // Recent purchases (last 10)
    const recentPurchases = await prisma.purchase.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { product: true }
    })

    res.status(200).json({
      totalRevenue,
      totalSales,
      totalDownloads,
      uniqueBuyers,
      recentPurchases
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}