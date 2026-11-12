import { getArticles } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
export const metadata = { title: "Search Articles", description: "Search ArticleGrove for practical guides, explainers and useful ideas." };
export default async function SearchPage({ searchParams }) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const articles = await getArticles();
  const results = q ? articles.filter(a => [a.title,a.excerpt,a.category?.title,(a.tags||[]).join(" ")].join(" ").toLowerCase().includes(q)) : [];
  return <div className="page-shell wrap"><div className="page-intro"><span className="eyebrow">SEARCH THE GROVE</span><h1>Find your next <em>read.</em></h1><form className="search-form"><input name="q" defaultValue={searchParams.q || ""} placeholder="Try technology, productivity, money..." aria-label="Search articles"/><button className="button button-dark">Search ↗</button></form><p>{q ? `${results.length} result${results.length===1?"":"s"} for “${q}”` : "Search topics, questions and ideas."}</p></div>
  {results.length ? <div className="article-grid article-grid-wide">{results.map(a=><ArticleCard key={a.slug} article={a}/>)}</div> : q ? <div className="empty-state">No matching articles yet. Try a broader search.</div> : null}</div>;
}
