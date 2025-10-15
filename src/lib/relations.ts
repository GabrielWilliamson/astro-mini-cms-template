// src/lib/relations.ts
import { db } from "astro:db";
import { getTableBySlug } from "@/collections";

export async function getRelationOptions(
  collectionSlug: string,
  labelField: string = "name",
  valueField: string = "id"
) {
  const table = getTableBySlug(collectionSlug);

  if (!table) {
    throw new Error(`Collection not found: ${collectionSlug}`);
  }

  try {
    const records = await db.select().from(table);

    const options = records
      .map((record: any) => {
        const value = record[valueField];
        const label = record[labelField];

        if (!value) {
          console.warn(
            `Record missing valueField "${valueField}" in ${collectionSlug}:`,
            record
          );
        }
        if (!label) {
          console.warn(
            `Record missing labelField "${labelField}" in ${collectionSlug}:`,
            record
          );
        }

        return {
          value: String(value || ""),
          label: String(label || "Unknown"),
        };
      })
      .filter((opt) => opt.value);

    return options;
  } catch (error) {
    console.error(
      `Error loading relation options for ${collectionSlug}:`,
      error
    );
    return [];
  }
}
