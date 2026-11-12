import { getArticles, getCategories } from "@/lib/content";
import { siteConfig } from "@/lib/site";
export default async function sitemap() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const fixed = ["", "/articles", "/categories", "/about", "/contact", "/privacy", "/terms"].map((path)=>({
    url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "" ? 1 : 0.6
  }));
  return [
    ...fixed,
    ...categories.map(c=>({url:`${siteConfig.url}/category/${c.slug}`,lastModified:new Date(),changeFrequency:"weekly",priority:0.7})),
    ...articles.map(a=>({url:`${siteConfig.url}/article/${a.slug}`,lastModified:a.updatedAt?new Date(a.updatedAt):new Date(),changeFrequency:"monthly",priority:0.8}))
  ];
}
