import { defineType, defineField } from "sanity";
export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & sharing" }
  ],
  fields: [
    defineField({ name: "title", title: "Article title", type: "string", group: "content", validation: r => r.required().max(110) }),
    defineField({ name: "slug", title: "URL slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: "excerpt", title: "Short introduction", type: "text", rows: 3, group: "content", validation: r => r.required().max(220) }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, group: "content", fields: [{ name: "alt", title: "Alternative text", type: "string" }], validation: r => r.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], group: "content", validation: r => r.required() }),
    defineField({ name: "author", title: "Author / editorial byline", type: "string", initialValue: "ArticleGrove Editorial", group: "content" }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", group: "content", validation: r => r.required() }),
    defineField({ name: "readingTime", title: "Estimated reading time", type: "string", initialValue: "5 min read", group: "content" }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false, group: "content" }),
    defineField({ name: "tags", title: "Topic tags", type: "array", of: [{ type: "string" }], group: "content" }),
    defineField({ name: "body", title: "Article body", type: "array", group: "content", of: [
      { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }, { title: "Quote", value: "blockquote" }], marks: { decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }, { title: "Underline", value: "underline" }], annotations: [{ name: "link", type: "object", title: "Link", fields: [{ name: "href", type: "url", title: "URL" }] }] } },
      { type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alternative text" }, { name: "caption", type: "string", title: "Caption" }] }
    ], validation: r => r.required() }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: r => r.max(65) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo", validation: r => r.max(160) }),
    defineField({ name: "imageAlt", title: "Cover image alt text", type: "string", group: "seo" })
  ],
  orderings: [{ title: "Publish date, newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category.title", media: "coverImage" } }
});
