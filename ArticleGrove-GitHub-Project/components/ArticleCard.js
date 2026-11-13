import Link from "next/link";

export default function ArticleCard({ article, featured = false }) {
  const category = article.category?.title || "Editor's pick";
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "New article";

  return (
    <article className={`article-card magazine-card ${featured ? "article-card-featured" : ""}`}>
      <Link href={`/article/${article.slug}`} className="card-art magazine-card-art" aria-label={`Read ${article.title}`}>
        {article.image ? (
          <img src={article.image} alt={article.imageAlt || article.title} loading={featured ? "eager" : "lazy"} />
        ) : (
          <span className="card-art-symbol" aria-hidden="true">{article.symbol || "✦"}</span>
        )}
        <span className="mag-category-tag">{category}</span>
      </Link>
      <div className="card-copy magazine-card-copy">
        <div className="card-meta"><span>{category}</span><span>{date} · {article.readingTime || "5 min read"}</span></div>
        <h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <Link className="card-read" href={`/article/${article.slug}`}>Continue reading <span>→</span></Link>
      </div>
    </article>
  );
}
