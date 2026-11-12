import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { getArticle, getArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return {};
  const canonical = `/article/${article.slug}`;
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: { canonical },
    openGraph: { type: "article", title: article.title, description: article.excerpt, url: canonical, images: article.image ? [{url: article.image}] : [] },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: article.image ? [article.image] : [] }
  };
}
const portableComponents = {
  types: { image: ({value}) => value?.asset?.url ? <figure className="article-inline-image"><img src={value.asset.url} alt={value.alt || ""}/>{value.caption && <figcaption>{value.caption}</figcaption>}</figure> : null },
  block: { h2: ({children}) => <h2>{children}</h2>, h3: ({children}) => <h3>{children}</h3>, blockquote: ({children}) => <blockquote>{children}</blockquote> }
};
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();
  const url = `${siteConfig.url}/article/${article.slug}`;
  const date = article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined;
  return <article className="article-page wrap">
    <div className="article-topline"><Link href="/articles">← All articles</Link><span>{article.category?.title || "ArticleGrove"}</span></div>
    <header className="article-header"><span className="eyebrow">{article.category?.title || "FEATURED READING"}</span><h1>{article.title}</h1><p className="article-deck">{article.excerpt}</p>
      <div className="article-byline"><span className="author-avatar">AG</span><span><b>{article.author || "ArticleGrove Editorial"}</b><small>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}) : "ArticleGrove"}</small></span><span className="read-time">{article.readingTime || "5 min read"}</span></div>
    </header>
    {article.image && <div className="article-cover"><img src={article.image} alt={article.imageAlt || article.title}/></div>}
    <div className="article-content"><div className="article-body">{article.body ? <PortableText value={article.body} components={portableComponents}/> : <p>{article.content || ""}</p>}</div>
      <aside className="article-aside"><span className="eyebrow">KEEP EXPLORING</span><p>Curiosity is a good habit. Find another useful idea in the ArticleGrove library.</p><Link className="button button-outline" href="/articles">More articles ↗</Link></aside>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
      "@context":"https://schema.org","@type":"Article","headline":article.title,"description":article.excerpt,
      "mainEntityOfPage":url,"url":url,"datePublished":date,"author":{"@type":"Organization","name":article.author || "ArticleGrove Editorial"},
      "publisher":{"@type":"Organization","name":"ArticleGrove","logo":{"@type":"ImageObject","url":`${siteConfig.url}/logo.svg`}},
      ...(article.image ? {"image":[article.image]} : {})
    }).replace(/</g, "\\u003c")}} />
  </article>;
}
