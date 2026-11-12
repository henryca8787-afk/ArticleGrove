import { defineType, defineField } from "sanity";
export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Category name", type: "string", validation: r => r.required().max(60) }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 70 }, validation: r => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: r => r.max(180) })
  ],
  preview: { select: { title: "title", subtitle: "description" } }
});
