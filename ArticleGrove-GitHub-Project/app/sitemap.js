import { getArticles, getCategories } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);

  const fixedPaths = [
    "",
    "/articles",
    "/categories",
    "/about",
    "/editorial-standards",
    "/contact",
    "/privacy",
    "/terms"
  ];

  const fixed = fixedPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${siteConfig.url}/category/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  const articleEntries = articles.map((article) => ({
    url: `${siteConfig.url}/article/${article.slug}`,
    ...(article.updatedAt || article.publishedAt
      ? { lastModified: new Date(article.updatedAt || article.publishedAt) }
      : {}),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [...fixed, ...categoryEntries, ...articleEntries];
}
