
import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "@/lib/site";

const GA_MEASUREMENT_ID = "G-JF0P1WN4C4";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ArticleGrove — Ideas, Guides & Stories Worth Reading",
    template: "%s | ArticleGrove"
  },
  description:
    "Explore practical guides, thoughtful insights and fresh perspectives on technology, business, lifestyle, money and more.",
  applicationName: "ArticleGrove",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ArticleGrove",
    title: "ArticleGrove — Ideas, Guides & Stories Worth Reading",
    description:
      "Useful articles, practical guides and fresh perspectives for curious readers.",
    url: siteConfig.url,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ArticleGrove"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArticleGrove — Ideas, Guides & Stories Worth Reading",
    description:
      "Useful articles, practical guides and fresh perspectives for curious readers.",
    images: ["/og-image.svg"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
