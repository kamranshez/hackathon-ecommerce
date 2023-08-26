import { defineType, defineField } from "sanity";
export const catagory = defineType({
  name: "catagory",
  type: "document",
  title: "Category",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Catagory Name",
    }),
  ],
});
