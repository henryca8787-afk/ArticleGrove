"use client";
import { useState } from "react";
export default function NewsletterForm(){
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  function submit(e){e.preventDefault();setMessage("Newsletter sign-up is not connected yet. Please check back soon.");}
  return <form className="newsletter-form" onSubmit={submit}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input"><input id="newsletter-email" type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/><button aria-label="Submit email">↗</button></div><small>{message || "No spam. Unsubscribe whenever you like."}</small></form>;
}
