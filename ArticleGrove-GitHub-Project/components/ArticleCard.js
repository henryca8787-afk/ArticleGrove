import Link from "next/link";

export default function ArticleCard({ article, featured = false }) {
  const category = article.category?.title || "Editor's pick";
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "New article";

  return (
    <article className={`article-card magazine-card article-card-clean ${featured ? "article-card-featured" : ""}`}>
      <Link
        href={`/article/${article.slug}`}
        className="card-art magazine-card-art"
        aria-label={`Read ${article.title}`}
      >
        {article.image ? (
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            loading={featured ? "eager" : "lazy"}
          />
        ) : (
          <span className="card-art-symbol" aria-hidden="true">
            {article.symbol || "✦"}
          </span>
        )}
      </Link>

      <div className="card-copy magazine-card-copy">
        <div className="card-meta">
          <span className="card-category">{category}</span>
          <span className="card-date">{date} · {article.readingTime || "5 min read"}</span>
        </div>
        <h3>
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt ? <p>{article.excerpt}</p> : null}
        <Link className="card-read" href={`/article/${article.slug}`}>
          Continue reading <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
