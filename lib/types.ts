import { Product, Order, OrderItem, OrderStatus } from '@prisma/client'

export type { Product, Order, OrderItem, OrderStatus }

export interface CartItem {
  product: Product
  quantity: number
}

export interface CheckoutSessionData {
  customerEmail: string
  customerName?: string
  customerAddress?: string
  items: CartItem[]
}

export interface OrderWithItems extends Order {
  orderItems: (OrderItem & {
    product: Product
  })[]
}