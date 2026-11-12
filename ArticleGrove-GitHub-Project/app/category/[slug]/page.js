import { notFound } from "next/navigation";
import { getArticles, getCategories } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;
export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }) {
  const cats = await getCategories();
  const category = cats.find((c) => c.slug === params.slug);
  if (!category) return {};
  return { title: `${category.title} Articles`, description: category.description, alternates: { canonical: `/category/${category.slug}` } };
}
export default async function CategoryPage({ params }) {
  const [categories, articles] = await Promise.all([getCategories(), getArticles()]);
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();
  const filtered = articles.filter((a) => a.category?.slug === category.slug);
  return <div className="page-shell wrap"><div className="page-intro"><span className="eyebrow">TOPIC COLLECTION</span><h1>{category.title} <em>articles.</em></h1><p>{category.description}</p></div>
  {filtered.length ? <div className="article-grid article-grid-wide">{filtered.map((a)=><ArticleCard key={a.slug} article={a}/>)}</div> : <div className="empty-state">New articles in this topic are coming soon.</div>}</div>;
}
