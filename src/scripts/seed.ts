import { db, product, category, brand, employee, user } from "astro:db";
import { randomUUID } from "node:crypto";

export default async function seed() {
  const categories = [
    {
      id: randomUUID(),
      name: "Electronics",
      slug: "electronics",
      description: "Devices, gadgets and accessories.",
    },
    {
      id: randomUUID(),
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Appliances and kitchen essentials.",
    },
    {
      id: randomUUID(),
      name: "Books",
      slug: "books",
      description: "Fiction, non-fiction and educational books.",
    },
    {
      id: randomUUID(),
      name: "Fashion",
      slug: "fashion",
      description: "Clothing, shoes and accessories.",
    },
    {
      id: randomUUID(),
      name: "Sports",
      slug: "sports",
      description: "Sporting goods and fitness equipment.",
    },
  ];

  const brands = [
    {
      id: randomUUID(),
      name: "Acme",
      slug: "acme",
      description: "High-quality gadgets and tools.",
      website: "https://acme.example.com",
    },
    {
      id: randomUUID(),
      name: "HomePro",
      slug: "homepro",
      description: "Reliable home and kitchen solutions.",
      website: "https://homepro.example.com",
    },
    {
      id: randomUUID(),
      name: "Bookify",
      slug: "bookify",
      description: "Books for everyone.",
      website: "https://bookify.example.com",
    },
    {
      id: randomUUID(),
      name: "StyleZone",
      slug: "stylezone",
      description: "Latest fashion trends.",
      website: "https://stylezone.example.com",
    },
    {
      id: randomUUID(),
      name: "FitGear",
      slug: "fitgear",
      description: "Premium sports equipment.",
      website: "https://fitgear.example.com",
    },
  ];

  const employees = [
    {
      id: randomUUID(),
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 555-1234",
    },
    {
      id: randomUUID(),
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 555-5678",
    },
    {
      id: randomUUID(),
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "+1 555-9012",
    },
    {
      id: randomUUID(),
      name: "Diana Prince",
      email: "diana@example.com",
      phone: "+1 555-3456",
    },
    {
      id: randomUUID(),
      name: "Evan Lee",
      email: "evan@example.com",
      phone: "+1 555-7890",
    },
  ];

  const products = [
    {
      id: randomUUID(),
      name: "Smartphone X",
      slug: "smartphone-x",
      description: "High-end smartphone with 5G support.",
      price: 899.99,
      brandId: brands[0].id,
      categoryId: categories[0].id,
    },
    {
      id: randomUUID(),
      name: "Blender Pro",
      slug: "blender-pro",
      description: "Powerful kitchen blender.",
      price: 129.99,
      brandId: brands[1].id,
      categoryId: categories[1].id,
    },
    {
      id: randomUUID(),
      name: "Learning TypeScript",
      slug: "learning-typescript",
      description: "Comprehensive guide to TypeScript.",
      price: 39.99,
      brandId: brands[2].id,
      categoryId: categories[2].id,
    },
    {
      id: randomUUID(),
      name: "Running Shoes",
      slug: "running-shoes",
      description: "Lightweight and comfortable running shoes.",
      price: 79.99,
      brandId: brands[3].id,
      categoryId: categories[3].id,
    },
    {
      id: randomUUID(),
      name: "Yoga Mat",
      slug: "yoga-mat",
      description: "Non-slip mat for yoga and fitness.",
      price: 29.99,
      brandId: brands[4].id,
      categoryId: categories[4].id,
    },
  ];

  await db.insert(category).values(categories);
  await db.insert(brand).values(brands);
  await db.insert(employee).values(employees);
  await db.insert(product).values(products);

  console.log(" Database seeded successfully");
}
