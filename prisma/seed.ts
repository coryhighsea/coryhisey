import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing products
  await prisma.product.deleteMany()

  // Create sample products
  const products = [
    {
      name: 'Vintage T-Shirt',
      description: 'Comfortable vintage-style t-shirt made from 100% organic cotton',
      price: 2999, // $29.99 in cents
      imageUrl: '/placeholder-tshirt.jpg',
      inventory: 50
    },
    {
      name: 'Coffee Mug',
      description: 'High-quality ceramic coffee mug with custom design',
      price: 1499, // $14.99 in cents
      imageUrl: '/placeholder-mug.jpg',
      inventory: 25
    },
    {
      name: 'Laptop Sticker Pack',
      description: 'Set of 10 waterproof vinyl stickers for your laptop',
      price: 999, // $9.99 in cents
      imageUrl: '/placeholder-stickers.jpg',
      inventory: 100
    },
    {
      name: 'Tote Bag',
      description: 'Eco-friendly canvas tote bag perfect for shopping',
      price: 1999, // $19.99 in cents
      imageUrl: '/placeholder-bag.jpg',
      inventory: 30
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Sample products created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })