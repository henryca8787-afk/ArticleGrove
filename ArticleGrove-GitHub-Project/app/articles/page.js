import { getArticles } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export const metadata = { title: "All Articles", description: "Browse all ArticleGrove articles, explainers, how-to guides and practical insights." };
export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticles();
  return <div className="page-shell wrap">
    <div className="page-intro"><span className="eyebrow">THE READING ROOM</span><h1>Explore the <em>library.</em></h1><p>Browse practical guides, useful explainers and fresh perspectives across the topics that shape everyday life.</p></div>
    <div className="article-grid article-grid-wide">{articles.map((article) => <ArticleCard key={article.slug} article={article}/>)}</div>
  </div>;
}
