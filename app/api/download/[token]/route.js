import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { token } = req.query

    if (!token) {
      return res.status(400).json({ error: 'Download token is required' })
    }

    const purchase = await prisma.purchase.findUnique({
      where: { downloadToken: token },
      include: { product: true }
    })

    if (!purchase) {
      return res.status(404).json({ error: 'Invalid download token' })
    }

    // Check if token has expired
    if (new Date() > purchase.tokenExpiresAt) {
      return res.status(410).json({ error: 'Download link has expired' })
    }

    // Check download count
    if (purchase.downloadCount >= purchase.maxDownloads) {
      return res.status(410).json({ error: 'Maximum downloads reached' })
    }

    // Find the PDF file
    const pdfPath = path.join(process.cwd(), 'public', 'products', 'Local-Partnership-Pitch-Kit.pdf')

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'Product file not found' })
    }

    // Increment download count
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: { downloadCount: { increment: 1 } }
    })

    // Serve the file
    const fileName = `Local-Partnership-Pitch-Kit-${purchase.product.name.replace(' ', '-')}.pdf`
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)

    const fileStream = fs.createReadStream(pdfPath)
    fileStream.pipe(res)

  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ error: 'Failed to process download' })
  }
}