'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Icons as SVG components
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const RocketIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
)

const CrownIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
  </svg>
)

const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckout = async (slug) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: slug })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout failed:', error)
    }
  }

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Owner, Bloom Coffee Roasters',
      quote: 'This kit transformed how I approach partnerships. In 3 months, I built relationships with 5 local businesses that now bring in 40% of my new customers.',
      rating: 5
    },
    {
      name: 'Marcus Chen',
      role: 'Founder, FitLife Studio',
      quote: 'The email scripts alone were worth the price. I went from getting ignored to getting responses within 24 hours. Game changer for my marketing.',
      rating: 5
    },
    {
      name: 'Jessica Torres',
      role: 'Manager, Glow Salon & Spa',
      quote: 'I was skeptical, but the partnership proposal template helped me close a deal I would have fumbled before. Professional and easy to customize.',
      rating: 5
    }
  ]

  const deliverables = [
    { icon: '🎯', title: 'Partnership Target List', desc: 'Identify and qualify your ideal partnership prospects' },
    { icon: '🎁', title: 'Co-Promo Offer Builder', desc: 'Design irresistible partnership offers' },
    { icon: '📧', title: 'Email Scripts', desc: 'Proven outreach templates that get responses' },
    { icon: '💬', title: 'DM Scripts', desc: 'Instagram DM templates for social outreach' },
    { icon: '📄', title: 'Proposal Template', desc: 'Professional partnership proposals' },
    { icon: '💰', title: 'Revenue Split Worksheet', desc: 'Fair profit-sharing calculations' },
    { icon: '📋', title: 'Pop-up Checklist', desc: 'Event execution guide for collaborations' },
    { icon: '🤝', title: 'Referral Scripts', desc: 'Turn partners into referral machines' },
    { icon: '📈', title: 'Follow-up Sequence', desc: '7-touch persistence system' },
    { icon: '📊', title: 'Tracking Sheet', desc: 'Monitor and optimize your partnerships' }
  ]

  const benefits = [
    {
      title: 'Recurring Exposure',
      desc: 'Partnerships bring ongoing visibility, not one-time hits. A single partnership can generate hundreds of impressions every month.'
    },
    {
      title: 'Zero-Cost Marketing',
      desc: 'Co-promotions cost nothing upfront. You share audiences, split content creation, and leverage each other\'s networks.'
    },
    {
      title: 'Built-In Credibility',
      desc: 'When a trusted local business recommends you, their audience is pre-sold. You skip the trust-building phase entirely.'
    },
    {
      title: 'Scalable Growth',
      desc: 'One great partnership can lead to three more. Word spreads in local communities. Build one relationship, unlock a network.'
    }
  ]

  const faqs = [
    {
      q: 'What\'s included in each tier?',
      a: 'Starter includes 6 core templates and basic scripts. Professional adds the full proposal template, pop-up checklist, referral scripts, and tracking sheet. Agency adds editable PowerPoint/Google Sheets versions, white-label rights, training videos, and 1-on-1 support.'
    },
    {
      q: 'Can I use these templates for my clients?',
      a: 'The Agency tier includes white-label rights, allowing you to use and resell the templates to your clients. Starter and Professional are for personal use only.'
    },
    {
      q: 'How do I get access after purchase?',
      a: 'Immediately after purchase, you\'ll receive a download link via email. You\'ll also see the download button on the confirmation page. The PDF is yours to keep and use forever.'
    },
    {
      q: 'Is this for beginners or experienced marketers?',
      a: 'Both! The kit is designed to be simple enough for first-time partnership seekers while comprehensive enough for experienced marketers. Step-by-step instructions make everything actionable.'
    },
    {
      q: 'Will there be updates?',
      a: 'Professional and Agency tier holders receive free updates. We regularly add new scripts, templates, and improvements based on user feedback and market changes.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🤝</span>
            </div>
            <span className="font-display text-xl font-bold text-dark">Partnership Kit</span>
          </div>
          <button
            onClick={scrollToPricing}
            className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Get Instant Access
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-dark via-dark to-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Local Business Partnership Toolkit
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            Get Cafes, Gyms, Salons & Offices to<br />
            <span className="gradient-text">Promote Your Business</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            The complete system for building recurring partnerships that bring consistent,
            zero-cost exposure from your local community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToPricing}
              className="bg-accent hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-accent/25"
            >
              See Pricing Options
            </button>
            <a href="#whats-inside" className="border border-white/30 hover:border-white/60 px-8 py-4 rounded-xl font-medium text-lg transition-colors">
              View What's Inside
            </a>
          </div>

          {/* Social Proof Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-gray-400 text-sm mt-1">Templates Used</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">10</div>
              <div className="text-gray-400 text-sm mt-1">Core Documents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">47+</div>
              <div className="text-gray-400 text-sm mt-1">Pages of Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">98%</div>
              <div className="text-gray-400 text-sm mt-1">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section id="whats-inside" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Everything You Need to Build Partnerships</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              10 professional templates and scripts designed to help you identify, approach,
              and close partnerships with local businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 hover:bg-orange-50 transition-colors border border-gray-100 hover:border-accent/20"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Why Local Partnerships Win</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Forget expensive ads and cold outreach. Partnerships give you built-in
              audiences with zero upfront cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <CheckIcon />
                </div>
                <h3 className="font-semibold text-xl mb-3">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">Who This Is For</h2>
              <p className="text-gray-600 text-lg mb-8">
                The Local Partnership Pitch Kit is designed for entrepreneurs,
                small business owners, and marketers who want to leverage local
                relationships for growth.
              </p>
              <ul className="space-y-4">
                {[
                  'Local service providers (salons, gyms, cafes)',
                  'E-commerce brands looking for retail partnerships',
                  'Event organizers seeking venue sponsorships',
                  'Coaches and consultants building referral networks',
                  'Startups wanting to build community presence'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckIcon />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-orange-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="font-display text-2xl font-bold mb-4">Proven System</h3>
                <p className="text-gray-600 mb-6">
                  This isn't theory. Every template has been tested and refined based on
                  real partnership deals worth thousands in combined value.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-accent">3-5x</div>
                    <div className="text-sm text-gray-600">ROI on partnerships</div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-2xl font-bold text-accent">18%</div>
                    <div className="text-sm text-gray-600">Reply rate average</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-dark text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 text-lg">Real results from real partnerships built with this kit.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the tier that fits your needs. All tiers include instant digital delivery.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 h-96 skeleton rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((product, i) => {
                const features = JSON.parse(product.features)
                const icons = { starter: <RocketIcon />, professional: <CrownIcon />, agency: <BuildingIcon /> }
                const borderColors = {
                  starter: 'border-gray-200',
                  professional: 'border-accent',
                  agency: 'border-gray-800'
                }

                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl p-8 border-2 ${borderColors[product.tier]} ${
                      product.featured ? 'pricing-card-featured transform md:-translate-y-4' : ''
                    } relative`}
                  >
                    {product.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-sm font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`inline-flex p-3 rounded-xl mb-4 ${
                        product.featured ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {icons[product.tier]}
                      </div>
                      <h3 className="font-display text-2xl font-bold">{product.name}</h3>
                      <p className="text-gray-500 text-sm mt-2">{product.description}</p>
                    </div>

                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold">
                        ${(product.price / 100).toFixed(0)}
                        <span className="text-lg font-normal text-gray-500"> one-time</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleCheckout(product.slug)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        product.featured
                          ? 'bg-accent text-white hover:bg-orange-600 shadow-lg shadow-accent/25'
                          : 'bg-gray-100 text-dark hover:bg-gray-200'
                      }`}
                    >
                      Get {product.name}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50"
                >
                  {faq.q}
                  <svg
                    className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-dark via-dark to-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready to Build Your Partnership Empire?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Stop waiting for customers to find you. Start building relationships that
            put your business in front of new audiences every single day.
          </p>
          <button
            onClick={scrollToPricing}
            className="bg-accent hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-accent/25"
          >
            Get Your Partnership Kit Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-dark text-gray-400 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🤝</span>
            </div>
            <span className="font-display font-bold text-white">Partnership Kit</span>
          </div>
          <p className="text-sm">© 2026 Local Partnership Pitch Kit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}