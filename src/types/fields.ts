// src/types/fields.ts
export type FieldComponent =
  | "text-field"
  | "textarea-field"
  | "email-field"
  | "url-field"
  | "number-field"
  | "select-field";

export interface FieldDisplayProps {
  type: FieldComponent;
  value: string | number | undefined | null;
  field: string;
  resolvedData?: {
    id: string;
    label: string;
    [key: string]: any;
  } | null;
}
