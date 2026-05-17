'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PurchaseSuccess() {
  const [purchase, setPurchase] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const verifyPurchase = async () => {
      const params = new URLSearchParams(window.location.search)
      const sessionId = params.get('session_id')

      if (!sessionId) {
        setError('No session found')
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/purchase/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        })
        const data = await res.json()

        if (res.ok) {
          setPurchase(data)
        } else {
          setError(data.error || 'Failed to verify purchase')
        }
      } catch (err) {
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    verifyPurchase()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your purchase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4 font-display">Thank You for Your Purchase!</h1>
        <p className="text-xl text-gray-300 mb-8">
          Your download is ready. Click the button below to get your Local Partnership Pitch Kit.
        </p>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
          <div className="text-sm text-gray-400 mb-2">Product</div>
          <div className="text-2xl font-bold mb-4">
            Local Partnership Pitch Kit - {purchase?.productName}
          </div>
          <div className="text-sm text-gray-400 mb-2">Sent to</div>
          <div className="text-lg">{purchase?.email}</div>
        </div>

        <div className="space-y-4">
          <a
            href={purchase?.downloadUrl}
            className="inline-block bg-accent hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-accent/25"
          >
            Download Now
          </a>
          <p className="text-gray-400 text-sm">
            {purchase?.downloadsRemaining} downloads remaining • Expires in 72 hours
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-4">What's next?</p>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl mb-2">📖</div>
              <h3 className="font-semibold mb-1">Review the Kit</h3>
              <p className="text-sm text-gray-400">Go through all 10 templates and scripts</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Pick Your Targets</h3>
              <p className="text-sm text-gray-400">Use the worksheet to identify your first partners</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold mb-1">Start Outreach</h3>
              <p className="text-sm text-gray-400">Send your first email or DM today</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}