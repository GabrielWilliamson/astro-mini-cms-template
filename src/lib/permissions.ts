import type { Collections } from "@/collections";

export type CollectionSlug = keyof Collections;

export const rolePermissions: Record<
  string,
  { collections: CollectionSlug[] }
> = {
  admin: { collections: ["products", "categories", "brands", "employees"] },
  editor: { collections: ["products", "categories", "brands"] },
  viewer: { collections: ["products"] },
};

export async function canAccessCollection(
  role: string,
  collection: CollectionSlug
): Promise<boolean> {
  if (!role) return false;

  const allowed = rolePermissions[role]?.collections ?? [];
  return allowed.includes(collection);
}
