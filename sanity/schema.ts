import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { catagory } from "./catagory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, catagory],
};
