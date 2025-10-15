// collections/categories.ts
import { z } from "zod";
import { category } from "astro:db";
import type { Collection } from "@/types/collections";

const categorySchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
});

export const categoriesCollection = {
  label: "Categories",
  table: category,
  schema: categorySchema,
  fieldMap: [
    {
      field: "id",
      fieldComponent: "text-field",
      label: "ID",
      placeholder: "Auto-generated",
    },
    {
      field: "name",
      fieldComponent: "text-field",
      required: true,
      label: "Category Name",
    },
    {
      field: "description",
      fieldComponent: "textarea-field",
      label: "Description",
      placeholder: "Optional category description",
    },
    {
      field: "slug",
      fieldComponent: "text-field",
      required: true,
      label: "Slug",
      placeholder: "category-slug",
    },
  ],
} satisfies Collection<typeof categorySchema>;
