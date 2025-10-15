// src/types/collections.ts
import { z, type ZodObject } from "zod";

export type BaseCollection = {
  slug: string;
  label: string;
};

export type RelationConfig = {
  collection: string;
  labelField: string;
  valueField: string;
};

type BaseFieldEntry<FieldName extends string> = {
  field: FieldName;
  required?: boolean;
  placeholder?: string;
  label?: string;
};

type TextFieldEntry<FieldName extends string> = BaseFieldEntry<FieldName> & {
  fieldComponent:
    | "text-field"
    | "textarea-field"
    | "url-field"
    | "number-field"
    | "email-field";
  relation?: never;
};

type EmailFieldEntry<FieldName extends string> = BaseFieldEntry<FieldName> & {
  fieldComponent: "email-field";
  relation?: never;
};

type SelectFieldEntry<FieldName extends string> = BaseFieldEntry<FieldName> & {
  fieldComponent: "select-field";
  relation: RelationConfig;
};

export type FieldMapEntry<FieldName extends string> =
  | TextFieldEntry<FieldName>
  | EmailFieldEntry<FieldName>
  | SelectFieldEntry<FieldName>;

export type DbTable = any;

export type Collection<Schema extends ZodObject<any>> = {
  label: string;
  table: DbTable;
  schema: Schema;
  fieldMap: Array<FieldMapEntry<keyof Schema["shape"] & string>>;
};

export type CollectionRegistry = Record<string, Collection<any>>;

export function hasRelation(
  field: FieldMapEntry<string>
): field is SelectFieldEntry<string> {
  return field.fieldComponent === "select-field" && "relation" in field;
}
