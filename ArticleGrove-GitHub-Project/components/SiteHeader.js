import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import { getCategories } from "@/lib/content";

export default async function SiteHeader() {
  const categories = await getCategories();
  const links = categories.slice(0, 7);

  return (
    <>
      <div className="utility-bar">
        <div className="wrap utility-inner">
          <span>Independent publishing for curious readers</span>
        </div>
      </div>
      <header className="masthead">
        <div className="wrap masthead-inner">
          <Link href="/" className="masthead-logo" aria-label="ArticleGrove home">
            <Image src="/logo.svg" alt="ArticleGrove — Read, Learn, Discover" width={240} height={64} priority />
          </Link>
          <div className="masthead-description">Thoughtful reads on the subjects<br/>that shape everyday life.</div>
          <Link href="/search" className="masthead-search" aria-label="Search ArticleGrove"><span aria-hidden="true">⌕</span><small>SEARCH</small></Link>
          <MobileMenu categories={links} />
        </div>
      </header>
      <nav className="category-nav" aria-label="Main navigation">
        <div className="wrap category-nav-inner">
          <Link href="/" className="nav-home">HOME</Link>
          <Link href="/articles">LATEST</Link>
          {links.map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.title.toUpperCase()}</Link>)}
          <Link href="/categories">ALL TOPICS</Link>
        </div>
      </nav>
    </>
  );
}
