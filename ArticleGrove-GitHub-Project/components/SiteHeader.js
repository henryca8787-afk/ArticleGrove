import Link from "next/link";
import { getCategories } from "@/lib/content";

export default async function SiteHeader() {
  const categories = await getCategories();
  return (
    <>
      <div className="mag-topbar">
        <div className="wrap mag-topbar-inner">
          <span>INDEPENDENT IDEAS FOR CURIOUS READERS</span>
          <div><Link href="/about">About us</Link><Link href="/contact">Contact</Link></div>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner wrap">
          <Link href="/" className="brand magazine-brand" aria-label="ArticleGrove home">
            <span className="brand-mark magazine-mark">AG</span>
            <span className="brand-word">Article<span>Grove</span><small>READ · LEARN · DISCOVER</small></span>
          </Link>
          <div className="mag-header-note">Ideas, stories &amp; perspectives<br/><b>Worth your time.</b></div>
          <div className="header-actions">
            <Link className="search-link" href="/search" aria-label="Search articles">⌕</Link>
            <Link className="header-cta" href="/articles">Explore articles <span>↗</span></Link>
          </div>
        </div>
      </header>
      <nav className="mag-nav" aria-label="Main navigation">
        <div className="wrap mag-nav-inner">
          <Link href="/" className="mag-home-link">HOME</Link>
          <Link href="/articles">LATEST</Link>
          {categories.slice(0, 6).map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.title.toUpperCase()}</Link>)}
          <Link href="/categories">ALL TOPICS</Link>
          <Link href="/about">ABOUT</Link>
        </div>
      </nav>
    </>
  );
}
