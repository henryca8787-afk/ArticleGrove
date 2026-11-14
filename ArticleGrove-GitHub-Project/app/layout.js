import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ArticleGrove — Ideas, Guides & Stories Worth Reading",
    template: "%s | ArticleGrove"
  },
  description: "Explore practical guides, thoughtful insights and fresh perspectives on technology, business, lifestyle, money and more.",
  applicationName: "ArticleGrove",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ArticleGrove",
    title: "ArticleGrove — Ideas, Guides & Stories Worth Reading",
    description: "Useful articles, practical guides and fresh perspectives for curious readers.",
    url: siteConfig.url,
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "ArticleGrove" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArticleGrove — Ideas, Guides & Stories Worth Reading",
    description: "Useful articles, practical guides and fresh perspectives for curious readers.",
    images: ["/og-image.svg"]
  },
  robots: { index: true, follow: true }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='12258345',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

