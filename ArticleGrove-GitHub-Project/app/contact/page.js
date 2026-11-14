export const metadata = {
  title: "Contact ArticleGrove",
  description: "Contact the ArticleGrove Editorial Team with questions, corrections, feedback or collaboration enquiries."
};

export default function ContactPage() {
  return (
    <div className="prose-page wrap">
      <span className="eyebrow">GET IN TOUCH</span>
      <h1>Contact the <em>editorial team.</em></h1>
      <p className="lead">
        Have a question about an article, spotted something that needs correcting,
        or want to share feedback? Contact the ArticleGrove Editorial Team by email.
      </p>
      <div className="contact-card">
        <span className="contact-icon" aria-hidden="true">✉</span>
        <div>
          <b>Editorial enquiries</b>
          <p>For general questions, corrections, feedback and collaboration enquiries:</p>
          <a href="mailto:henryca8787@gmail.com">henryca8787@gmail.com</a>
        </div>
      </div>
      <h2>When will I receive a reply?</h2>
      <p>We aim to respond within 3–5 business days. Response times may vary during busy periods.</p>
      <p><b>Publisher:</b> ArticleGrove Editorial Team<br/><b>Operating country:</b> Pakistan</p>
    </div>
  );
}
