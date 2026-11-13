import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="ArticleGrove home">
            <Image src="/logo-footer.svg" alt="ArticleGrove — Read, Learn, Discover" width={240} height={64} />
          </Link>
          <p>Ideas, stories and perspectives<br/>worth your time.</p>
        </div>
        <div className="footer-col"><b>Explore</b><Link href="/articles">Latest articles</Link><Link href="/categories">All topics</Link><Link href="/about">About ArticleGrove</Link></div>
        <div className="footer-col"><b>Information</b><Link href="/contact">Contact</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link></div>
        <div className="footer-note"><span className="eyebrow eyebrow-light">READ · LEARN · DISCOVER</span><p>Stay curious.<br/><em>Keep discovering.</em></p></div>
      </div>
      <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} ArticleGrove. All rights reserved.</span><span>Independent ideas for curious readers.</span></div>
    </footer>
  );
}
