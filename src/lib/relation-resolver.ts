// src/lib/relation-resolver.ts
import { db } from "astro:db";
import { getTableBySlug } from "@/collections";
import type { Collection } from "@/types/collections";
import { hasRelation } from "@/types/collections";

interface RelationCache {
  [collectionSlug: string]: {
    [id: string]: {
      id: string;
      label: string;
      [key: string]: any;
    };
  };
}

interface ResolvedRecord extends Record<string, any> {
  [key: `_resolved_${string}`]: {
    id: string;
    label: string;
    [key: string]: any;
  };
}

export async function resolveRelations(
  data: Array<Record<string, any>>,
  collection: Collection<any>
): Promise<Array<ResolvedRecord>> {
  if (!data.length) return data;

  const relationFields = collection.fieldMap.filter(hasRelation);

  if (relationFields.length === 0) return data;

  const cache: RelationCache = {};

  // Precargar todas las relaciones necesarias
  for (const field of relationFields) {
    const { collection: relCollection, labelField = "name" } = field.relation;
    const table = getTableBySlug(relCollection);

    if (!table) continue;

    try {
      const records = await db.select().from(table);
      cache[relCollection] = {};

      for (const record of records) {
        const recordAny = record as Record<string, any>;
        const recordId = String(recordAny.id);
        const recordLabel = String(recordAny[labelField] || "Unknown");

        cache[relCollection][recordId] = {
          id: recordId,
          label: recordLabel,
          ...Object.fromEntries(
            Object.entries(recordAny).filter(
              ([key]) => key !== "id" && key !== labelField
            )
          ),
        };
      }
    } catch (error) {
      console.error(`Error loading relation ${relCollection}:`, error);
      cache[relCollection] = {};
    }
  }

  return data.map((row) => {
    const resolvedRow: ResolvedRecord = { ...row };

    for (const field of relationFields) {
      const fieldValue = row[field.field];
      if (!fieldValue) continue;

      const relCollection = field.relation.collection;
      const relatedData = cache[relCollection]?.[String(fieldValue)];

      if (relatedData) {
        resolvedRow[`_resolved_${field.field}`] = relatedData;
      }
    }

    return resolvedRow;
  });
}
