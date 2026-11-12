import Link from "next/link";
export default function NotFound(){return <div className="not-found wrap"><span className="eyebrow">404 — PAGE NOT FOUND</span><h1>This page took<br/><em>a different path.</em></h1><p>The page may have moved or the link may be out of date.</p><Link className="button button-dark" href="/">Return home ↗</Link></div>}
