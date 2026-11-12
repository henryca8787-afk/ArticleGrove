import { sanityClient, sanityConfigured } from "./sanity";
import { sampleArticles, sampleCategories } from "./sample-content";

const articleQuery = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
  title, "slug": slug.current, excerpt, "category": category->{title,"slug":slug.current},
  "image": coverImage.asset->url, imageAlt, author, publishedAt, updatedAt, readingTime,
  featured, tags, seoTitle, seoDescription, body
}`;
const categoryQuery = `*[_type == "category"] | order(title asc) {title, "slug":slug.current, description}`;
const singleArticleQuery = `*[_type == "article" && slug.current == $slug && defined(publishedAt)][0] {
  title, "slug": slug.current, excerpt, "category": category->{title,"slug":slug.current},
  "image": coverImage.asset->url, imageAlt, author, publishedAt, updatedAt, readingTime,
  featured, tags, seoTitle, seoDescription, body
}`;

export async function getArticles() {
  if (!sanityConfigured) return sampleArticles;
  try { return await sanityClient.fetch(articleQuery, {}, { next: { revalidate: 60 } }); }
  catch (error) { console.error("Sanity article query failed:", error); return sampleArticles; }
}
export async function getCategories() {
  if (!sanityConfigured) return sampleCategories;
  try {
    const data = await sanityClient.fetch(categoryQuery, {}, { next: { revalidate: 300 } });
    return data?.length ? data : sampleCategories;
  } catch (error) { console.error("Sanity category query failed:", error); return sampleCategories; }
}
export async function getArticle(slug) {
  if (!sanityConfigured) return sampleArticles.find((a) => a.slug === slug) || null;
  try { return await sanityClient.fetch(singleArticleQuery, { slug }, { next: { revalidate: 60 } }); }
  catch (error) { console.error("Sanity single article query failed:", error); return sampleArticles.find((a) => a.slug === slug) || null; }
}
