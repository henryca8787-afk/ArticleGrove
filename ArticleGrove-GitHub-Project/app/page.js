import Link from "next/link";
import { getArticles, getCategories } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

function dateLabel(value) {
  return new Date(value || Date.now()).toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" });
}

function SmallStory({ article }) {
  return <article className="small-story">
    <Link href={`/article/${article.slug}`} className="small-story-image">
      {article.image ? <img src={article.image} alt={article.imageAlt || article.title} loading="lazy"/> : <span>AG</span>}
    </Link>
    <div><span className="story-category">{article.category?.title || "Latest"}</span>
      <h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3>
      <small>{dateLabel(article.publishedAt)} · {article.readingTime || "5 min read"}</small>
    </div>
  </article>;
}

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const lead = articles.slice(0, 3);
  const latest = articles.slice(3, 9);
  const editors = articles.slice(9, 13);
  const popular = articles.slice(0, 5);
  const ticker = articles[0];

  return <>
    <div className="site-ad wrap"><span>ADVERTISEMENT</span><div>728 × 90</div></div>
    {ticker && <div className="breaking-strip"><div className="wrap breaking-inner"><b>BREAKING NEWS</b><Link href={`/article/${ticker.slug}`}>{ticker.title}</Link><span>● &nbsp;LATEST</span></div></div>}

    <div className="wrap home-layout">
      <main className="home-main">
        <section className="feature-stack" aria-label="Featured stories">
          {lead.map((article) => <ArticleCard key={article.slug} article={article} featured/>)}
          {!articles.length && <div className="empty-state"><h2>Stories are coming soon.</h2><p>Publish your first article in ArticleGrove Studio and it will appear here.</p></div>}
        </section>

        {latest.length > 0 && <section className="news-section">
          <div className="section-bar"><h2>Latest News</h2><Link href="/articles">VIEW ALL&nbsp; →</Link></div>
          <div className="compact-news-list">{latest.map((article)=><SmallStory key={article.slug} article={article}/>)}</div>
        </section>}

        {editors.length > 0 && <section className="news-section">
          <div className="section-bar"><h2>Editor's Pick</h2><Link href="/articles">VIEW ALL&nbsp; →</Link></div>
          <div className="editor-grid">{editors.map((article)=><ArticleCard key={article.slug} article={article}/>)}</div>
        </section>}
      </main>

      <aside className="home-sidebar">
        <section className="sidebar-section"><div className="section-bar"><h2>Latest News</h2></div>
          {articles.slice(0,4).map((article)=><SmallStory key={article.slug} article={article}/>)}
        </section>
        <section className="sidebar-section"><div className="section-bar"><h2>Popular Posts</h2></div>
          {popular.map((article,index)=><div className="popular-row" key={article.slug}><b>{String(index+1).padStart(2,"0")}</b><div><span className="story-category">{article.category?.title || "Article"}</span><h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3><small>{dateLabel(article.publishedAt)}</small></div></div>)}
        </section>
        <section className="sidebar-newsletter"><h2>Get the latest stories</h2><p>Fresh reads and useful ideas, delivered to your inbox.</p><NewsletterForm/></section>
        <div className="sidebar-ad"><span>ADVERTISEMENT</span><b>Advertisement space</b></div>
        <section className="sidebar-section topic-sidebar"><div className="section-bar"><h2>Categories</h2><Link href="/categories">ALL</Link></div>
          {categories.map((category)=><Link className="topic-link" key={category.slug} href={`/category/${category.slug}`}>{category.title}<span>→</span></Link>)}
        </section>
      </aside>
    </div>

    <div className="wrap bottom-topics"><div className="section-bar"><h2>Explore Topics</h2><Link href="/categories">ALL CATEGORIES&nbsp; →</Link></div>
      <div className="topic-chips">{categories.map((category)=><Link key={category.slug} href={`/category/${category.slug}`}>{category.title}</Link>)}</div>
    </div>

    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
      "@context":"https://schema.org","@type":"WebSite","name":siteConfig.name,"url":siteConfig.url,
      "description":"Useful articles, practical guides and fresh perspectives for curious readers.",
      "potentialAction":{"@type":"SearchAction","target":`${siteConfig.url}/search?q={search_term_string}`,"query-input":"required name=search_term_string"}
    }).replace(/</g,"\\u003c")}}/>
  </>;
}
