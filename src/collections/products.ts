// collections/products.ts
import { z } from "zod";
import { product } from "astro:db";
import type { Collection } from "@/types/collections";

const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  brandId: z.string().min(1, "Brand is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export const productsCollection = {
  label: "Products",
  table: product,
  schema: productSchema,
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
      label: "Product Name",
    },
    {
      field: "description",
      fieldComponent: "textarea-field",
      label: "Description",
      placeholder: "Product description",
    },
    {
      field: "slug",
      fieldComponent: "text-field",
      required: true,
      label: "Slug",
      placeholder: "product-slug",
    },
    {
      field: "price",
      fieldComponent: "number-field",
      required: true,
      label: "Price",
      placeholder: "0.00",
    },
    {
      field: "brandId",
      fieldComponent: "select-field",
      required: true,
      label: "Brand",
      relation: {
        collection: "brands",
        labelField: "name",
        valueField: "id",
      },
    },
    {
      field: "categoryId",
      fieldComponent: "select-field",
      required: true,
      label: "Category",
      relation: {
        collection: "categories",
        labelField: "name",
        valueField: "id",
      },
    },
  ],
} satisfies Collection<typeof productSchema>;
