# E-commerce Shop Integration

This project now includes a complete e-commerce solution integrated into your portfolio website.

## Features

- **Product Management**: Display products with images, descriptions, and inventory tracking
- **Shopping Cart**: Add/remove items, update quantities
- **Stripe Integration**: Secure payment processing
- **Order Tracking**: Track orders from payment to delivery
- **Admin Panel**: Manage products and orders
- **Database**: PostgreSQL with Prisma ORM

## Setup Instructions

### 1. Environment Variables

Update your `.env` file with the following Stripe configuration:

```env
# Stripe Configuration (replace with your actual keys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 2. Get Stripe Keys

1. Create a Stripe account at https://stripe.com
2. Get your test keys from the Stripe Dashboard
3. Replace the placeholder values in your `.env` file

### 3. Set up Stripe Webhook

1. In your Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy the webhook secret to your `.env` file

### 4. Database Setup

The database is already set up with:
- Products table
- Orders table
- Order items table
- Sample products

### 5. Pages and Routes

- **Shop**: `/shop` - Main shopping page
- **Success**: `/shop/success` - Order confirmation page
- **Admin Products**: `/admin` - Manage products
- **Admin Orders**: `/admin/orders` - Manage orders

## API Routes

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `POST /api/checkout` - Create Stripe checkout session
- `GET /api/orders` - Get order details
- `POST /api/webhooks/stripe` - Handle Stripe webhooks
- `GET /api/admin/orders` - Get all orders (admin)
- `PATCH /api/admin/orders` - Update order status (admin)

## Usage

### For Customers
1. Visit `/shop` to browse products
2. Add items to cart
3. Fill in customer details
4. Checkout with Stripe
5. Receive confirmation on success page

### For Admin
1. Visit `/admin` to manage products
2. Visit `/admin/orders` to manage orders
3. Update order status as items are shipped

## Database Schema

### Products
- id, name, description, price (in cents), imageUrl, inventory
- Timestamps: createdAt, updatedAt

### Orders
- id, customerEmail, customerName, customerAddress
- totalAmount (in cents), status, stripeSessionId, stripePaymentId
- Timestamps: createdAt, updatedAt

### Order Items
- Links orders to products with quantity and price at time of purchase

## Order Status Flow

1. **PENDING** - Order created, awaiting payment
2. **PAID** - Payment confirmed via Stripe webhook
3. **SHIPPED** - Order shipped (update manually)
4. **DELIVERED** - Order delivered (update manually)
5. **CANCELLED** - Order cancelled

## Security Notes

- All payments processed through Stripe
- No sensitive payment data stored locally
- Webhook signature verification for security
- Inventory automatically updated on successful payment

## Next Steps

1. Replace sample products with your actual items
2. Add product images to your public folder or use a CDN
3. Customize the design to match your portfolio
4. Set up production Stripe keys when ready to go live
5. Configure your domain for Stripe webhooks

## Testing

Use Stripe's test card numbers:
- `4242424242424242` - Successful payment
- `4000000000000002` - Declined payment

The webhook will automatically update orders when payments are successful.