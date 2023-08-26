import { defineType, defineField } from "sanity";
export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Product Title",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Product Description",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Product Price",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Product Image",
    }),
    defineField({
      name: "catagory",
      type: "reference",
      title: "Product Catagory",
      to: [{ type: "catagory" }],
    }),
  ],
});
