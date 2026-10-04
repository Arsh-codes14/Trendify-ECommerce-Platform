# 🛒 Trendify: Full-Stack E-Commerce Platform

Trendify is a full-stack fashion store built with React, Node.js/Express, and Supabase (PostgreSQL). It has three apps: a **customer storefront**, an **admin dashboard**, and a **REST API**. Shoppers browse a catalog, sign in with Clerk, check out with Cash on Delivery, and track their orders. Admins manage products and move orders through fulfilment.

## ✨ Features

### Storefront (`/frontend`)
- **"Candy Pop" design system**: grape-ink outlines and hard offset "sticker" shadows on a vanilla-cream base, pastel candy palette (bubblegum, lemon, mint, lilac, peach, sky), Fredoka + Nunito + Caveat typography, colour-coded categories, playful micro-animations (scrolling ticker, spinning badge, cart-count pop) that respect `prefers-reduced-motion`, and a mobile slide-in menu. Tokens live in `tailwind.config.js`, shared component classes in `src/index.css`
- **Home page**: hero with calls to action, shop-by-category tiles built from real product photos, latest arrivals, best sellers, trust badges, and a newsletter band
- **Shop page with URL-driven filters**: category, type, search and sort live in the query string (`/collection?category=Men&sort=low-high`), so links are shareable and the back button works; includes filter chips and result counts
- **Product page**: breadcrumbs, image gallery, size picker, quantity stepper, Add to bag / Buy now, and info tabs
- **Wishlist**: save products with the heart icon (persisted in localStorage)
- **Cart**: quantity steppers, line totals, and a **free-shipping progress bar** (free over ₹1,999, enforced by the API too)
- **Checkout**: step indicator, address form prefilled from the Clerk profile, order summary, and an order-confirmation page
- **Order tracking**: visual status tracker (Order Placed → Packing → Shipped → Out for Delivery → Delivered)
- **Authentication with Clerk**: email, Google, or Apple sign-in themed to match the store; protected checkout and order routes
- UX details: loading skeletons, empty and error states, scroll-to-top on navigation, per-page titles, lazy-loaded images, accessible icon buttons, and a 404 page

### Admin Dashboard (`/admin`)
- **Product management**: add products with up to 4 images (stored in Supabase Storage), list and remove them
- **Order management**: view every order with customer and address details, update status, and see summary stats (total orders, pending fulfilment, revenue)
- JWT-secured session with automatic logout when it expires

### REST API (`/backend`)
- Express + Supabase (PostgreSQL) with input validation and consistent JSON errors
- **Row Level Security** enabled on every table with no public policies, so only the backend (service role key) can read or write data
- **Server-side pricing**: order totals are calculated from database prices; prices sent by the client are ignored
- **Shopper auth**: Clerk session tokens are verified against Clerk's public JWKS (RS256), and each user can only see their own orders
- **Admin auth**: signed JWT carrying a role claim, with a 1-day expiry
- Starter catalog auto-seeds on an empty database, plus a health-check endpoint
- Product images uploaded straight to Supabase Storage (in-memory, images only, 5 MB limit)
- Integration tests covering auth, validation, server-side pricing, free shipping, and authorization

## 🛠️ Tech Stack

| Layer    | Technology |
| -------- | ---------- |
| Frontend | React 18, React Router 6, Tailwind CSS, Vite, Axios, React Toastify, Lucide icons |
| Auth     | Clerk (shoppers), JWT (admin) |
| Backend  | Node.js, Express 4, supabase-js, Multer, Validator |
| Database | Supabase: PostgreSQL + Storage |
| Testing  | Node.js built-in test runner (`node:test`) |
| Hosting  | Vercel configs for all three apps |

## 🧭 Architecture

```
 ┌──────────────┐   Clerk session JWT    ┌──────────────────────┐
 │  Storefront  │ ─────────────────────▶ │                      │      ┌──────────┐
 │  React/Vite  │   /api/product, order  │   Express REST API   │ ───▶ │ Supabase │
 └──────────────┘                        │                      │      │ Postgres │
 ┌──────────────┐   Admin JWT (token)    │  userAuth (JWKS)     │      │ + Storage│
 │    Admin     │ ─────────────────────▶ │  adminAuth (JWT)     │      └──────────┘
 │  React/Vite  │   /api/product, order  │                      │
 └──────────────┘                        └──────────────────────┘
```

## 🗂️ Folder Structure

```
├── admin/                # Admin dashboard (React + Vite, port 5174)
├── backend/              # REST API (Express, port 4000)
│   ├── config/           # Supabase client
│   ├── controllers/      # Route handlers (products, users, orders)
│   ├── middleware/       # adminAuth, userAuth (Clerk JWKS), multer uploads
│   ├── models/           # Row <-> API mappers
│   ├── supabase/         # schema.sql (tables, RLS, storage bucket)
│   ├── routes/           # Express routers
│   ├── seed/             # Starter catalog and seeding script
│   ├── public/products/  # Images for the starter catalog
│   └── tests/            # Integration tests
└── frontend/             # Customer storefront (React + Vite, port 5173)
```

## 🔌 API Reference

| Method | Endpoint              | Auth          | Description |
| ------ | --------------------- | ------------- | ----------- |
| GET    | `/api/health`         | none          | API and database status |
| GET    | `/api/product/list`   | none          | All products |
| POST   | `/api/product/single` | none          | One product (`{ productId }`) |
| POST   | `/api/product/add`    | Admin         | Create product (multipart, `image1`–`image4`) |
| POST   | `/api/product/remove` | Admin         | Delete product (`{ id }`) |
| POST   | `/api/user/admin`     | none          | Admin login → JWT |
| POST   | `/api/order/place`    | Shopper       | Place a COD order (`{ items, address }`) |
| GET    | `/api/order/user`     | Shopper       | Logged-in user's orders |
| GET    | `/api/order/list`     | Admin         | All orders |
| POST   | `/api/order/status`   | Admin         | Update order status (`{ orderId, status }`) |

Shopper requests send `Authorization: Bearer <Clerk session token>`. Admin requests send a `token: <admin JWT>` header.

## 🤸 Getting Started

**Prerequisites:** Node.js 18+, a free [Supabase](https://supabase.com) project, and a free [Clerk](https://clerk.com) application.

```bash
git clone <repository-url>
cd MERN-Ecommerce

cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

**Database setup:** in the Supabase dashboard, open **SQL Editor → New query**, paste [`backend/supabase/schema.sql`](backend/supabase/schema.sql), and click **Run**. This creates the tables, enables Row Level Security, and creates the `product-images` storage bucket.

**Environment variables:** copy each `.env.example` to `.env` and fill it in:

| File            | Key variables |
| --------------- | ------------- |
| `backend/.env`  | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API), `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLERK_PUBLISHABLE_KEY` |
| `frontend/.env` | `VITE_BACKEND_URL`, `VITE_CLERK_PUBLISHABLE_KEY` |
| `admin/.env`    | `VITE_BACKEND_URL` |

**Run** (in three terminals):

```bash
cd backend && npm run server     # http://localhost:4000 (seeds the catalog on first run)
cd frontend && npm run dev       # http://localhost:5173
cd admin && npm run dev          # http://localhost:5174
```

**Useful scripts (backend):**

```bash
npm test                  # integration tests against your Supabase project (cleans up its own test orders)
npm run seed              # seed the starter catalog if the products table is empty
npm run seed -- --force   # reset products to the starter catalog
```

## 🗺️ Roadmap

- Online payments (Stripe / Razorpay) alongside Cash on Delivery
- Sync the cart to the user's account across devices
- Product reviews and ratings
- Product editing and stock tracking in the admin panel
