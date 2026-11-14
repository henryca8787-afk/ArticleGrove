"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className={`mobile-menu-toggle ${isOpen ? "is-open" : ""}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <nav id="mobile-primary-navigation" className="mobile-menu-panel" aria-label="Mobile navigation">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/articles" onClick={closeMenu}>Latest articles</Link>
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} onClick={closeMenu}>
                {category.title}
              </Link>
            ))}
            <Link href="/categories" onClick={closeMenu}>All topics</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
          </nav>
        </>
      )}
    </div>
  );
}
