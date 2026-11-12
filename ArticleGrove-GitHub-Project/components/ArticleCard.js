import Link from "next/link";
export default function ArticleCard({article,featured=false}) {
  const category = article.category?.title || "Editor's pick";
  return <article className={`article-card ${featured?"article-card-featured":""}`}>
    <Link href={`/article/${article.slug}`} className={`card-art card-art-${article.theme || "green"}`} aria-label={`Read ${article.title}`}>
      <span className="card-art-label">{category}</span><span className="card-art-symbol">{article.symbol || "✳"}</span><span className="card-art-caption">A G / READING NOTES</span>
    </Link>
    <div className="card-copy"><div className="card-meta"><span>{category}</span><span>{article.readingTime || "5 min read"}</span></div><h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link className="card-read" href={`/article/${article.slug}`}>Read article <span>↗</span></Link></div>
  </article>;
}
