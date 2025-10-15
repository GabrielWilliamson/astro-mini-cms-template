// collections/employees.ts
import { z } from "zod";
import { employee } from "astro:db";
import type { Collection } from "@/types/collections";

const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

export const employeesCollection = {
  label: "Employees",
  table: employee,
  schema: employeeSchema,
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
      label: "Name",
    },
    {
      field: "email",
      fieldComponent: "email-field",
      required: true,
      label: "Email",
    },
    {
      field: "phone",
      fieldComponent: "text-field",
      required: true,
      label: "Phone",
    },
  ],
} satisfies Collection<typeof employeeSchema>;
