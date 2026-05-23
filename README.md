# Avion

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Stripe" src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-AI_Assistant-412991?style=for-the-badge&logo=openai&logoColor=white" />
</p>

Full-stack ecommerce platform for a furniture store. The project includes a customer storefront, checkout and payments, profile order management, admin and designer workspaces, product reviews, promocodes, image uploads, and an AI product assistant.

<p align="center">
  <img alt="Technology icons" src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nestjs,postgres,prisma,docker" />
</p>

## Overview

Avion is built as a production-style TypeScript monorepo with separate frontend and backend applications.

- Customer storefront with catalog, filters, search, cart, wishlist, checkout, Stripe payment flow, profile, orders, and reviews.
- Admin workspace for products, categories, orders, promocodes, reviews, and users.
- Designer workspace for managing product catalog content.
- Backend API with role-based access control, PostgreSQL persistence, Prisma ORM, MinIO file storage, email flows, Stripe payments, and OpenAI-powered product assistance.

## Tech Stack

### Frontend

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| State management | Redux Toolkit, React Redux |
| API data layer | RTK Query |
| Persistence | Redux Persist |
| Payments UI | Stripe React SDK, Stripe.js |
| Animations | Motion |
| Inputs | rc-slider |
| Language | TypeScript |
| Quality | ESLint, Prettier |

### Backend

| Area | Technology |
| --- | --- |
| Framework | NestJS 11 |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | Passport JWT, bcrypt |
| Validation | class-validator, class-transformer |
| File storage | MinIO |
| Payments | Stripe |
| Email | Nodemailer |
| Scheduling | Nest Schedule |
| AI | OpenAI Responses API |
| Tests | Jest |
| Language | TypeScript |

### Infrastructure

- Docker Compose for PostgreSQL, pgAdmin, MinIO, and API development.
- Prisma migrations for database versioning.
- Environment-based configuration for secrets and service credentials.

## Features

### Storefront

- Product catalog with pagination, filters, sorting, and search.
- Product details page with image, dimensions, stock, discount pricing, designer and category information.
- Wishlist.
- Cart with quantity controls.
- Promo code support.
- Product reviews from customers who purchased paid orders.
- AI product assistant for detailed product-specific buying guidance.

### Checkout & Payments

- Order creation from cart.
- Stripe PaymentIntent flow.
- Payment confirmation endpoint.
- Profile order payment modal.
- Payment success/failure toast notice.
- Order cancellation for pending orders by owner or admin.
- Stock reservation and restoration on cancellation.

### Profile

- Authentication-aware profile page.
- Editable profile name.
- Two-factor authentication toggle.
- Order history with status filter and pagination.
- Collapsible order rows with item details and totals.
- Pay/cancel order actions.

### Admin Panel

Available to `ADMIN` users.

- Dashboard.
- Products management:
  - list
  - pagination
  - search
  - sorting
  - create
  - edit
  - delete
- Categories management:
  - list
  - pagination
  - search
  - create
  - edit
  - delete
- Orders management:
  - list
  - pagination
  - status filter
  - customer search
  - expandable order details
  - product thumbnails
  - cancel pending orders
- Promocodes management:
  - list
  - pagination
  - search
  - create
  - activate/deactivate
- Reviews management:
  - list
  - pagination
  - delete
- Users management:
  - list
  - pagination
  - role filter
  - search
  - edit name

### Designer Panel

Available to `DESIGNER` users.

- Separate `/designer` workspace.
- Product management using the same production UI patterns as admin.
- Access limited to designer-appropriate sections.

### Backend Domains

- Auth
- Users
- Products
- Categories
- Orders
- Payments
- Promocodes
- Reviews
- Files
- Email
- AI

## Roles

| Role | Access |
| --- | --- |
| `CUSTOMER` | Storefront, cart, profile, own orders, payments, reviews |
| `DESIGNER` | Designer panel, product management |
| `ADMIN` | Admin panel, all management sections |

## Project Structure

```text
.
├── backend
│   ├── prisma
│   │   ├── schema.prisma
│   │   └── migrations
│   └── src
│       ├── ai
│       ├── auth
│       ├── categories
│       ├── email
│       ├── files
│       ├── orders
│       ├── payments
│       ├── products
│       ├── promocodes
│       ├── reviews
│       └── users
└── frontend
    └── src
        ├── app
        ├── features
        ├── shared
        ├── store
        └── widgets
```

## Environment Variables

The values below are examples only. Do not commit real `.env` files, API keys, passwords, webhook secrets, SMTP credentials, or database credentials to a public repository.

### Backend

Create `backend/.env` from your own local values.

```env
PORT=3001

DATABASE_URL=postgresql://<user>:<password>@localhost:<port>/<database>?schema=public
SECRET=<jwt-secret>

POSTGRES_USER=<postgres-user>
POSTGRES_PASSWORD=<postgres-password>
POSTGRES_DB=<postgres-database>
DB_PORT=<local-postgres-port>

PGADMIN_DEFAULT_EMAIL=<pgadmin-email>
PGADMIN_DEFAULT_PASSWORD=<pgadmin-password>
PGADMIN_PORT=<local-pgadmin-port>

MINIO_ENDPOINT=<minio-host>
MINIO_PORT=<minio-api-port>
MINIO_CONSOLE_PORT=<minio-console-port>
MINIO_ROOT_USER=<minio-user>
MINIO_ROOT_PASSWORD=<minio-password>
MINIO_BUCKET_NAME=<minio-bucket>

STRIPE_SECRET_KEY=<stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>

EMAIL_USER=<smtp-user>
EMAIL_PASS=<smtp-password>
EMAIL_FROM=<sender-email>
EMAIL_CONTACT_TO=<operator-email>

OPENAI_API_KEY=<openai-api-key>
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_OUTPUT_TOKENS=700
```

### Frontend

Create `frontend/.env.local`.

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<stripe-publishable-key>
```

## Local Development

### 1. Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Start Infrastructure

From the backend directory:

```bash
cd backend
docker compose up -d db pg_admin minio
```

### 3. Run Prisma Migrations

```bash
cd backend
npx prisma migrate dev
```

Optional Prisma Studio:

```bash
npx prisma studio
```

### 4. Start Backend

```bash
cd backend
npm run start:dev
```

The API runs at:

```text
http://localhost:3001/api
```

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

The app runs at:

```text
http://localhost:3000
```

## Scripts

### Backend

```bash
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## API Highlights

The backend exposes REST endpoints under `/api`.

| Domain | Examples |
| --- | --- |
| Auth | login, OTP verification, password reset, 2FA |
| Users | profile, users list, designers, update user |
| Products | catalog, my products, create, update, delete, discount |
| Categories | list, create, update, delete |
| Orders | create, my orders, admin orders, cancel |
| Payments | create payment intent, confirm payment |
| Promocodes | list, validate, create, activate/deactivate |
| Reviews | product reviews, create review, admin list, delete |
| Files | upload product images to MinIO |
| AI | product assistant powered by OpenAI |

## Data Model

Main Prisma models:

- `User`
- `Product`
- `Category`
- `Order`
- `OrderItem`
- `PromoCode`
- `Review`

Enums:

- `Role`: `CUSTOMER`, `ADMIN`, `DESIGNER`
- `OrderStatus`: `PENDING`, `PAID`, `CANCELLED`
- `PromoCodeType`: `PERCENT`, `FIXED`

## Production Notes

- Keep all secrets on the backend.
- Commit `.env.example` files only, never real `.env` files.
- Never expose `OPENAI_API_KEY` or `STRIPE_SECRET_KEY` to the frontend.
- Configure CORS for the production frontend origin.
- Use managed PostgreSQL and object storage in production.
- Run Prisma migrations during deployment.
- Use HTTPS for frontend and backend.
- Configure Stripe webhook secrets for real payment confirmation.
- Set usage limits for OpenAI in the OpenAI dashboard.
- Use strong JWT secrets.

## Data & Content Disclaimer

This project was built for educational and portfolio purposes only. Demo product data and furniture references were populated using publicly available materials from [woo.furniture](https://woo.furniture/) as a development reference. The project is not affiliated with woo.furniture, does not represent a real commercial storefront, and was not used for any real commercial activity.

## Quality Checks

The project currently supports:

```bash
cd backend && npm run build
cd frontend && npm run lint
cd frontend && npm run build
```

Backend lint is available as well:

```bash
cd backend && npm run lint
```

## License

Private educational/full-stack ecommerce project.
