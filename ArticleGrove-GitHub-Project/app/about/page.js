export const metadata = {
  title: "About ArticleGrove",
  description: "Learn about ArticleGrove, its editorial focus, publishing approach and publisher information.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <div className="prose-page wrap">
      <span className="eyebrow">ABOUT THE PUBLICATION</span>
      <h1>A place for <em>curiosity.</em></h1>
      <p className="lead">
        ArticleGrove is an independent digital publication focused on clear,
        useful explanations of subjects that shape everyday life.
      </p>

      <h2>What we cover</h2>
      <p>
        Our five editorial sections are Technology &amp; AI, Business &amp;
        Finance, Money &amp; Finance, Health &amp; Fitness, and Environment
        &amp; Climate. We publish explainers, research-led articles and
        practical guides for readers who want to understand a subject rather
        than simply skim a headline.
      </p>

      <h2>Our publishing approach</h2>
      <p>
        ArticleGrove aims to explain complex topics in accessible language,
        provide context for statistics and link readers to relevant research,
        official information and original reporting. Time-sensitive claims
        should be presented with their publication date and checked against
        reliable sources. Where evidence is limited or uncertain, that
        limitation should be stated.
      </p>
      <p>
        AI-assisted tools may be used to help organise research, develop
        outlines, draft or edit material. They are not treated as authoritative
        sources. The publisher reviews articles and their supporting sources
        before publication. ArticleGrove does not imply that an article has
        been reviewed by a medical, legal, financial or other specialist
        unless that review is specifically identified.
      </p>

      <h2>Publisher information</h2>
      <p>
        ArticleGrove is independently operated by the ArticleGrove Editorial
        Team in Pakistan. The publication is digital and its coverage is
        intended for an international readership.
      </p>
      <p>
        Read our <a href="/editorial-standards">Editorial Standards</a> for
        details about sourcing, AI assistance, corrections and the use of
        illustrative images.
      </p>
      <p>
        Questions, corrections and suggestions are welcome through our
        <a href="/contact"> contact page</a>.
      </p>
      <p><b>Editorial contact:</b> <a href="mailto:henryca8787@gmail.com">henryca8787@gmail.com</a></p>
    </div>
  );
}
