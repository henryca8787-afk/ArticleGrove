import Link from "next/link";
import { getCategories } from "@/lib/content";
export const metadata = { title: "Topics & Categories", description: "Explore ArticleGrove topics including technology, business, lifestyle, money and personal growth." };
export default async function CategoriesPage() {
  const categories = await getCategories();
  return <div className="page-shell wrap"><div className="page-intro"><span className="eyebrow">FIND YOUR NEXT READ</span><h1>Explore by <em>topic.</em></h1><p>Follow a question, discover a new interest or find a practical guide for something on your mind.</p></div>
  <div className="topic-grid">{categories.map((c,i)=><Link className={`topic-card topic-${i%5}`} href={`/category/${c.slug}`} key={c.slug}><span className="topic-number">0{i+1}</span><span className="topic-icon">{["✳","◒","⌘","↗","✦"][i%5]}</span><h2>{c.title}</h2><p>{c.description}</p><span className="topic-arrow">Explore topic ↗</span></Link>)}</div></div>;
}
