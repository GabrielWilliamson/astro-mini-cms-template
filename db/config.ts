// db/config.ts
import { column, defineDb, defineTable } from "astro:db";

const category = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    slug: column.text({ unique: true }),
    description: column.text({ optional: true }),
  },
});

const brand = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    slug: column.text({ unique: true }),
    description: column.text({ optional: true }),
    website: column.text({ optional: true }),
  },
});

const product = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    slug: column.text({ unique: true }),
    description: column.text({ optional: true }),
    price: column.number(),
    brandId: column.text({ references: () => brand.columns.id }),
    categoryId: column.text({ references: () => category.columns.id }),
  },
});

const employee = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    phone: column.text(),
  },
});


const user = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    role: column.text(),
    emailVerified: column.boolean({ default: false }),
    createdAt: column.date({ default: new Date() }),
  },
});

const session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => user.columns.id }),
    expiresAt: column.date(),
    createdAt: column.date({ default: new Date() }),
  },
});



export default defineDb({
  tables: {
    user,
    session,
    category,
    brand,
    product,
    employee,
  },
});
