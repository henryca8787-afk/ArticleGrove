import Link from "next/link";
import { getArticles, getCategories } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const featured = articles.find((a) => a.featured) || articles[0];
  const latest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> IDEAS FOR CURIOUS MINDS</span>
          <h1>Read something<br /><em>worth your time.</em></h1>
          <p className="hero-lede">Clear thinking. Useful knowledge. Fresh perspectives. Discover practical articles that help you understand more and do better.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/articles">Explore articles <span>↗</span></Link>
            <Link className="text-link" href="/about">Our story <span>→</span></Link>
          </div>
          <div className="hero-proof"><span className="proof-avatars">A <b>G</b> R</span><span>Made for readers who like to keep learning.</span></div>
        </div>
        <div className="hero-art" aria-label="ArticleGrove editorial illustration">
          <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
          <div className="art-sun"></div><div className="art-book book-back"></div>
          <div className="art-book book-front"><span>THE<br/>OPEN<br/><i>MIND</i></span><small>VOL. 01 — IDEAS</small></div>
          <div className="art-leaf leaf-one"></div><div className="art-leaf leaf-two"></div>
          <span className="art-note note-top">Curiosity<br/>starts here.</span>
          <span className="art-note note-bottom">READ · LEARN · DISCOVER</span>
        </div>
      </section>

      <section className="category-strip wrap" aria-label="Browse topics">
        <span className="strip-label">EXPLORE TOPICS</span>
        <div className="category-pills">
          {categories.slice(0, 6).map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.title}</Link>)}
        </div>
        <Link className="all-topics" href="/categories">All topics ↗</Link>
      </section>

      {featured && <section className="featured-section wrap">
        <div className="section-heading"><div><span className="eyebrow">EDITOR'S PICK</span><h2>A good place to start.</h2></div><Link className="text-link" href="/articles">View all articles ↗</Link></div>
        <ArticleCard article={featured} featured />
      </section>}

      <section className="latest-section wrap">
        <div className="section-heading"><div><span className="eyebrow">FRESH FROM THE GROVE</span><h2>Latest articles</h2><p className="section-subtitle">Ideas and practical advice for wherever curiosity takes you.</p></div><Link className="text-link" href="/articles">Browse the library ↗</Link></div>
        <div className="article-grid">
          {latest.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>

      <section className="newsletter-band wrap">
        <div><span className="eyebrow eyebrow-light">A LITTLE MORE INSIGHT</span><h2>Good reads.<br/><em>Delivered occasionally.</em></h2><p>Get thoughtful articles and useful ideas in your inbox. No noise, just reading worth keeping.</p></div>
        <NewsletterForm />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"WebSite","name":siteConfig.name,"url":siteConfig.url,
        "description":"Useful articles, practical guides and fresh perspectives for curious readers.",
        "potentialAction":{"@type":"SearchAction","target":`${siteConfig.url}/search?q={search_term_string}`,"query-input":"required name=search_term_string"}
      }).replace(/</g, "\\u003c")}} />
    </>
  );
}
