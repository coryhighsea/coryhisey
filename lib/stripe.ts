import Stripe from 'stripe'
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js'

// Create a mock stripe instance for development when keys are not set
const createStripeInstance = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('STRIPE_SECRET_KEY is not set - Stripe functionality will be limited in development')
      return null
    }
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-10-29.clover',
  })
}

export const stripe = createStripeInstance()

let stripePromise: Promise<StripeJS | null>
export const getStripe = () => {
  if (!stripePromise) {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set - checkout will not work')
        stripePromise = Promise.resolve(null)
        return stripePromise
      }
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
    }
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}