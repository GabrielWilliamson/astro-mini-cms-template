// collections/index.ts
import type { CollectionRegistry } from "@/types/collections";
import { categoriesCollection } from "@/collections/categories";
import { brandsCollection } from "@/collections/brands";
import { productsCollection } from "@/collections/products";
import { employeesCollection } from "@/collections/employees";

export const collections = {
  categories: categoriesCollection,
  brands: brandsCollection,
  products: productsCollection,
  employees: employeesCollection,
} as const satisfies CollectionRegistry;

export type Collections = typeof collections;


export function getCollectionBySlug(slug: string) {
  return collections[slug as keyof typeof collections] ?? undefined;
}

export function getSourceBySlug(slug: string) {
  const collection = getCollectionBySlug(slug);
  return collection?.table;
}

export function getTableBySlug(slug: string) {
  const collection = getCollectionBySlug(slug);
  return collection?.table;
}

