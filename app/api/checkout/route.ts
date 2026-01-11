import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { CartItem } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail, customerName, customerAddress } = await request.json()
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }
    
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json({ 
        error: 'Payment processing is not configured. Please set up Stripe credentials.' 
      }, { status: 503 })
    }
    
    // Verify product availability and get current prices
    const productIds = items.map((item: CartItem) => item.product.id)
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    })
    
    // Check inventory and calculate total
    let totalAmount = 0
    const lineItems = []
    
    for (const item of items) {
      const product = products.find(p => p.id === item.product.id)
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product.name} not found` },
          { status: 400 }
        )
      }
      
      if (product.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient inventory for ${product.name}` },
          { status: 400 }
        )
      }
      
      totalAmount += product.price * item.quantity
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description || undefined,
            images: product.imageUrl ? [product.imageUrl] : []
          },
          unit_amount: product.price
        },
        quantity: item.quantity
      })
    }
    
    // Create order in database
    const order = await prisma.order.create({
      data: {
        customerEmail,
        customerName,
        customerAddress,
        totalAmount,
        status: 'PENDING',
        orderItems: {
          create: items.map((item: CartItem) => {
            const product = products.find(p => p.id === item.product.id)!
            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price
            }
          })
        }
      }
    })
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/shop`,
      customer_email: customerEmail,
      metadata: {
        orderId: order.id
      }
    })
    
    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id }
    })
    
    return NextResponse.json({ 
      sessionId: session.id,
      checkoutUrl: session.url 
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}