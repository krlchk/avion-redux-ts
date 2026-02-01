import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.designer.deleteMany();

  const chairs = await prisma.category.create({
    data: { name: 'Chairs' },
  });

  const sofas = await prisma.category.create({
    data: { name: 'Sofas' },
  });

  const aalto = await prisma.designer.create({
    data: { name: 'Alvar Aalto' },
  });

  const eames = await prisma.designer.create({
    data: { name: 'Charles & Ray Eames' },
  });

  await prisma.product.create({
    data: {
      title: 'Paimio Chair',
      description: 'Modern furniture design masterpiece.',
      img: 'https://example.com/paimio.jpg',
      price: 1200.0,
      width: 60,
      height: 64,
      depth: 80,
      categoryId: chairs.id,
      designerId: aalto.id,
    },
  });

  await prisma.product.create({
    data: {
      title: 'Lounge Chair',
      description: 'Comfortable luxury.',
      img: 'https://example.com/lounge.jpg',
      price: 5500.5,
      width: 84,
      height: 84,
      depth: 85,
      categoryId: sofas.id,
      designerId: eames.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
