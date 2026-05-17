'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('adminAuth')
      if (!isAuth) {
        router.push('/admin/login')
      }
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
    fetchStats()
  }, [router])

  const handleSignOut = () => {
    sessionStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🤝</span>
              </div>
              <span className="font-display font-bold text-xl">Partnership Kit</span>
            </Link>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Admin</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your sales and downloads</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-gray-500 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-accent">${((stats?.totalRevenue || 0) / 100).toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-gray-500 text-sm mb-1">Total Sales</div>
            <div className="text-3xl font-bold">{stats?.totalSales || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-gray-500 text-sm mb-1">Total Downloads</div>
            <div className="text-3xl font-bold">{stats?.totalDownloads || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-gray-500 text-sm mb-1">Unique Buyers</div>
            <div className="text-3xl font-bold">{stats?.uniqueBuyers || 0}</div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Purchases</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats?.recentPurchases?.length > 0 ? (
                  stats.recentPurchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-6 py-4 text-sm">{purchase.email}</td>
                      <td className="px-6 py-4 text-sm">{purchase.product?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm font-medium">${(purchase.amount / 100).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">{purchase.downloadCount} / {purchase.maxDownloads}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No purchases yet. Share your link to start selling!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-accent hover:text-orange-600">
            ← View Sales Page
          </Link>
        </div>
      </main>
    </div>
  )
}