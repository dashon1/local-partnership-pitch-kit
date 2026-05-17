# Local Partnership Pitch Kit

> Built by **MiniMax Agent** - Get Cafes, Gyms, Salons, Offices, and Event Hosts to Promote Your Business

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-18%2B-green.svg)
![Next.js](https://img.shields.io/badge/next.js-14-black.svg)

## What Is This?

The **Local Partnership Pitch Kit** is a complete digital product for building recurring local business partnerships. It includes 10 professional templates, scripts, and worksheets designed to help you identify, approach, and close partnerships with local businesses.

## What's Inside (10 Templates)

1. **Partnership Target List Worksheet** - Identify and qualify your ideal prospects
2. **Co-Promo Offer Builder** - 5 types of partnership offers with value calculator
3. **Outreach Email Scripts** - 3 proven templates with customization prompts
4. **Instagram DM Scripts** - 4 scripts for social outreach with response tracking
5. **Sample Partnership Proposal** - Professional proposal template with all sections
6. **Revenue Split Worksheet** - Fair profit-sharing calculator with negotiation tips
7. **Pop-up Collaboration Checklist** - 4-week event planning system
8. **Referral Partner Script** - 3 scripts for turning partners into referral engines
9. **Follow-up Sequence** - 7-touch persistence system with scripts
10. **Partnership Tracking Sheet** - Pipeline overview with metrics dashboard

## Live Demo

**Sales Page**: https://z5w9pxp4u6na.space.minimax.io

## Quick Start

```bash
# Clone the repository
git clone https://github.com/dashon1/local-partnership-pitch-kit.git
cd local-partnership-pitch-kit

# Install dependencies
npm install

# Set up database
npx prisma db push
npm run db:seed

# Run development server
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Keys (replace with your actual keys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Starter** | $49 | 6 core templates, email support |
| **Professional** | $97 | All 10 templates, priority support |
| **Agency** | $197 | Everything + white-label rights, training |

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Payments**: Stripe Checkout
- **PDF Generation**: Playwright + HTML/CSS

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── checkout/          # Stripe checkout
│   │   ├── products/          # Product API
│   │   ├── download/          # Secure download
│   │   └── webhook/stripe/    # Stripe webhook
│   ├── admin/                 # Admin dashboard
│   └── page.js               # Sales page
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                # Product seed data
├── public/products/           # PDF files
└── dist/                      # Static build output
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Fetch all products |
| `/api/checkout` | POST | Create Stripe checkout session |
| `/api/webhook/stripe` | POST | Handle payment webhook |
| `/api/download/[token]` | GET | Serve PDF download |
| `/api/purchase/verify` | POST | Verify purchase |
| `/api/admin/stats` | GET | Admin dashboard data |

## Admin Access

- **URL**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@partnershipkit.com`
  - Password: `admin123`

## Features

- ✅ 47+ page professional PDF
- ✅ 3-tier pricing with Stripe integration
- ✅ Secure download system (72hr expiry, 5 downloads)
- ✅ Admin dashboard with sales tracking
- ✅ Mobile responsive sales page
- ✅ FAQ accordion
- ✅ Testimonial section
- ✅ Real-time product fetching

## To Go Live

1. Replace Stripe keys in `.env` with live keys
2. Set up Stripe webhook endpoint
3. Deploy to Vercel or your preferred platform
4. Update admin credentials

## Author

**Built by MiniMax Agent** 🤖

## License

MIT License - feel free to use and modify for your own projects.

---

*Stop waiting for customers to find you. Start building relationships that put your business in front of new audiences every single day.*