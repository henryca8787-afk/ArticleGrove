import Link from "next/link";
import { getArticles, getCategories } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

function formatDate(value) {
  if (!value) return "Latest stories";
  return new Date(value).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const featured = articles.find((article) => article.featured) || articles[0];
  const remaining = articles.filter((article) => article.slug !== featured?.slug);
  const latest = remaining.slice(0, 6);
  const sidebarArticles = remaining.slice(0, 4);
  const secondaryFeatured = remaining.slice(0, 2);

  return (
    <>
      <div className="mag-datebar">
        <div className="wrap mag-datebar-inner"><span>{formatDate(new Date().toISOString())}</span><span>READ · LEARN · DISCOVER</span></div>
      </div>

      {articles.length > 0 && (
        <section className="mag-breaking wrap" aria-label="Latest headline">
          <span className="breaking-label">TRENDING NOW</span>
          <Link href={`/article/${articles[0].slug}`}>{articles[0].title}</Link>
          <span className="breaking-arrow">LATEST STORY&nbsp; ↗</span>
        </section>
      )}

      <section className="mag-lead wrap">
        <div className="mag-section-title"><span>THE DAILY READ</span><h1>Stories that <em>inform.</em><br/>Ideas that inspire.</h1></div>
        {featured ? (
          <div className="mag-lead-grid">
            <ArticleCard article={featured} featured />
            <div className="mag-lead-side">
              <div className="mag-side-heading"><span>EDITOR'S PICKS</span><Link href="/articles">VIEW ALL ↗</Link></div>
              {secondaryFeatured.map((article, index) => (
                <article className="mag-mini-story" key={article.slug}>
                  <Link className="mag-mini-image" href={`/article/${article.slug}`}>
                    {article.image ? <img src={article.image} alt={article.imageAlt || article.title} loading="lazy"/> : <span>{String(index + 1).padStart(2, "0")}</span>}
                  </Link>
                  <div><span className="mag-mini-category">{article.category?.title || "FEATURED"}</span><h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3><small>{article.readingTime || "5 min read"}</small></div>
                </article>
              ))}
              <div className="mag-ad-placeholder"><span>ADVERTISEMENT</span><b>Your brand could be here</b><small>Advertising space</small></div>
            </div>
          </div>
        ) : (
          <div className="mag-empty"><h2>Your next great read starts here.</h2><p>New stories will appear here as soon as you publish them in ArticleGrove Studio.</p></div>
        )}
      </section>

      <section className="mag-topicbar wrap" aria-label="Browse topics">
        <strong>EXPLORE</strong>
        {categories.slice(0, 8).map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.title}</Link>)}
        <Link className="mag-topic-all" href="/categories">ALL TOPICS →</Link>
      </section>

      <section className="mag-latest wrap">
        <div className="mag-section-heading"><div><span className="mag-kicker">FRESHLY PUBLISHED</span><h2>Latest articles</h2></div><Link href="/articles">VIEW ALL ARTICLES&nbsp; ↗</Link></div>
        {latest.length ? (
          <div className="mag-content-grid">
            <div className="mag-article-grid">{latest.map((article) => <ArticleCard key={article.slug} article={article}/>)}</div>
            <aside className="mag-sidebar">
              <div className="mag-side-heading"><span>MOST READ</span><Link href="/articles">MORE ↗</Link></div>
              {sidebarArticles.map((article, index) => (
                <article className="mag-popular" key={article.slug}>
                  <span className="mag-popular-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><span>{article.category?.title || "ARTICLE"}</span><h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3></div>
                </article>
              ))}
              <div className="mag-newsletter">
                <span className="mag-kicker">THE ARTICLE GROVE LETTER</span>
                <h3>Good stories.<br/><em>Delivered to you.</em></h3>
                <p>Get new ideas and useful reads in your inbox.</p>
                <NewsletterForm/>
              </div>
              <div className="mag-ad-placeholder mag-ad-tall"><span>ADVERTISEMENT</span><b>Thoughtful content.<br/>Great brands.</b><small>Advertising space</small></div>
            </aside>
          </div>
        ) : (
          <div className="mag-empty"><p>There are no published articles yet. Publish your first story in Sanity Studio to populate this section.</p></div>
        )}
      </section>

      <section className="mag-category-feature wrap">
        <div className="mag-section-heading"><div><span className="mag-kicker">FIND YOUR NEXT INTEREST</span><h2>Explore by topic</h2></div><Link href="/categories">ALL CATEGORIES&nbsp; ↗</Link></div>
        <div className="mag-category-grid">
          {categories.slice(0, 4).map((category, index) => (
            <Link className={`mag-category-tile mag-category-${index + 1}`} href={`/category/${category.slug}`} key={category.slug}>
              <span>0{index + 1}</span><b>{category.title}</b><i>Explore stories&nbsp; →</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="mag-bottom-newsletter wrap">
        <div><span className="mag-kicker">A MORE INTERESTING INBOX</span><h2>Stay curious.<br/><em>Keep discovering.</em></h2><p>Thoughtful articles and fresh perspectives, delivered occasionally.</p></div>
        <NewsletterForm/>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"WebSite","name":siteConfig.name,"url":siteConfig.url,
        "description":"Useful articles, practical guides and fresh perspectives for curious readers.",
        "potentialAction":{"@type":"SearchAction","target":`${siteConfig.url}/search?q={search_term_string}`,"query-input":"required name=search_term_string"}
      }).replace(/</g, "\\u003c")}} />
    </>
  );
}
