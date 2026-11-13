import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div className="footer-brand">
          <Link href="/" className="brand magazine-brand brand-invert" aria-label="ArticleGrove home">
            <span className="brand-mark magazine-mark">AG</span>
            <span className="brand-word">Article<span>Grove</span><small>READ · LEARN · DISCOVER</small></span>
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
