// collections/brands.ts
import { z } from "zod";
import { brand } from "astro:db";
import type { Collection } from "@/types/collections";

const brandSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  website: z.string().optional(),
});

export const brandsCollection = {
  label: "Brands",
  table: brand,
  schema: brandSchema,
  fieldMap: [
    {
      field: "id",
      fieldComponent: "text-field",
      label: "ID",
    },
    {
      field: "name",
      fieldComponent: "text-field",
      required: true,
      label: "Brand Name",
    },
    {
      field: "description",
      fieldComponent: "textarea-field",
      label: "Description",
      placeholder: "Optional brand description",
    },
    {
      field: "slug",
      fieldComponent: "text-field",
      required: true,
      label: "Slug",
      placeholder: "brand-slug",
    },
    {
      field: "website",
      fieldComponent: "url-field",
      label: "Website",
      placeholder: "https://example.com",
    },
  ],
} satisfies Collection<typeof brandSchema>;
