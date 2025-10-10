import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
  }
  
  // Check if Stripe is configured
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }
  
  try {
    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (!session.metadata?.orderId) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // Get order from database
    const order = await prisma.order.findUnique({
      where: { id: session.metadata.orderId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    return NextResponse.json({
      order,
      session: {
        id: session.id,
        customer_email: session.customer_email,
        payment_status: session.payment_status
      }
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}