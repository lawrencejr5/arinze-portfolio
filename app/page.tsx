"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Sample cart items for the interactive simulator
interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  emoji: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState<
    "explore" | "cart" | "tracker" | "architecture"
  >("explore");

  // Interactive Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Cold Stone Signature Ice Cream",
      category: "Dessert & Tour",
      price: 4200,
      qty: 1,
      emoji: "🍨",
    },
    {
      id: "2",
      name: "Artisan Chocolate Shake",
      category: "Beverage",
      price: 2800,
      qty: 2,
      emoji: "🥤",
    },
    {
      id: "3",
      name: "Grilled Gourmet Shawarma",
      category: "Savory Snack",
      price: 3500,
      qty: 1,
      emoji: "🌯",
    },
  ]);

  // Interactive Tracker Stage State (0: Placed, 1: Kitchen, 2: Rider Delivery, 3: Completed)
  const [trackingStep, setTrackingStep] = useState<number>(2);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inquiry form state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const copyEmailToClipboard = (email = "arinze.udoye@gmail.com") => {
    navigator.clipboard.writeText(email);
    showToast(`Copied ${email} to clipboard!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const addItemToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, item];
    });
    showToast(`Added ${item.name} to Cart`);
  };

  const nextTrackingStep = () => {
    setTrackingStep((prev) => (prev + 1) % 4);
  };

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const deliveryFee = cartItems.length > 0 ? 1200 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  const handleInquirySubmit = (channel: "email" | "whatsapp") => {
    const text = `Hi Arinze, my name is ${inquiryName || "Recruiter"}. ${inquiryMessage || "I'd like to discuss an App Developer role with you."} (Email: ${inquiryEmail || "N/A"})`;
    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/2348000000000?text=${encodeURIComponent(text)}`,
        "_blank",
      );
    } else {
      window.location.href = `mailto:arinze.udoye@gmail.com?subject=App Developer Opportunity&body=${encodeURIComponent(text)}`;
    }
  };

  return (
    <div className={styles.page}>
      {/* --------------------------------------------------------------------
          NAVBAR
          -------------------------------------------------------------------- */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <a href="#" className={styles.logoGroup}>
            <div className={styles.logoBadge}>UA</div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Udoye Arinze</span>
              <span className={styles.logoRole}>App Developer</span>
            </div>
          </a>

          <ul className={styles.navLinks}>
            <li>
              <a href="#about" className={styles.navLink}>
                About
              </a>
            </li>
            <li>
              <a href="#flagship" className={styles.navLink}>
                Flagship Project
              </a>
            </li>
            <li>
              <a href="#architecture" className={styles.navLink}>
                Engineering
              </a>
            </li>
            <li>
              <a href="#skills" className={styles.navLink}>
                Tech Stack
              </a>
            </li>
            <li>
              <a href="#contact" className={styles.navLink}>
                Contact
              </a>
            </li>
          </ul>

          <div className={styles.navRight}>
            <div className={styles.statusPill}>
              <span className={`${styles.statusDot} animate-pulse-dot`} />
              <span>Available for Roles</span>
            </div>

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}>
            <a
              href="#about"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#flagship"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Flagship Project (Fareexplore)
            </a>
            <a
              href="#architecture"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Engineering Principles
            </a>
            <a
              href="#skills"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tech Stack
            </a>
            <a
              href="#contact"
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact & Hire
            </a>
          </div>
        )}
      </header>

      {/* --------------------------------------------------------------------
          HERO SECTION
          -------------------------------------------------------------------- */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTopPill}>
              <span className={styles.heroLocation}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Nigeria 🇳🇬
              </span>
              <span>· App Developer</span>
            </div>

            <h1 className={styles.heroTitle}>
              Hi, I am{" "}
              <span className={styles.heroTitleHighlight}>Udoye Arinze</span>
              <br />
              an app developer based in Nigeria.
            </h1>

            <p className={styles.heroBio}>
              I craft intuitive, responsive, and performance-driven mobile & web
              applications. Passionate about smooth touch ergonomics, clean
              component architecture, and building digital products that solve
              real problems.
            </p>

            <div className={styles.heroCtaGroup}>
              <a href="#flagship" className={styles.btnPrimary}>
                <span>Explore Flagship App</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a href="#contact" className={styles.btnSecondary}>
                <span>Get in Touch</span>
              </a>

              <button
                className={styles.btnCopyEmail}
                onClick={() => copyEmailToClipboard()}
                title="Copy email to clipboard"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                <span>Copy Email</span>
              </button>
            </div>

            {/* Socials Row: X, GitHub, WhatsApp, Email */}
            <div className={styles.socialsRow}>
              <span className={styles.socialsLabel}>Connect & Socials</span>
              <div className={styles.socialsList}>
                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                  aria-label="X (formerly Twitter)"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X / Twitter</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Michaelend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                  aria-label="GitHub Profile"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2348000000000?text=Hi%20Arinze%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                  aria-label="WhatsApp"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.204 8.204 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.02.79.81-2.94-.19-.3a8.214 8.214 0 01-1.25-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:arinze.udoye@gmail.com"
                  className={styles.socialItem}
                  aria-label="Direct Email"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Hero Media Column (Arinze's Portrait) */}
          <div className={styles.heroMediaWrapper}>
            <div className={styles.portraitContainer}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/arinze.jpeg"
                  alt="Udoye Arinze — App Developer"
                  width={460}
                  height={580}
                  priority
                  className={styles.portraitImage}
                />
              </div>

              {/* Floating Pill: Location & Role */}
              <div className={styles.floatingBadgeTop}>
                <span className={`${styles.statusDot} animate-pulse-dot`} />
                <div>
                  <div className={styles.badgeValue}>Open to Opportunities</div>
                  <div className={styles.badgeSubtext}>
                    Full-time · Contract · Remote
                  </div>
                </div>
              </div>

              {/* Floating Pill: Flagship Stack */}
              <div className={styles.floatingBadgeBottom}>
                <span className={styles.badgeValue}>
                  Mobile & App Architecture
                </span>
                <span className={styles.badgeSubtext}>
                  Modern JavaScript · Responsive UX
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          FEATURED FLAGSHIP PROJECT (FAREEXPLORE CASE STUDY)
          -------------------------------------------------------------------- */}
      <section id="flagship" className={styles.projectSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Flagship App Showcase</div>
          <h2 className={styles.sectionTitle}>Fareexplore (Fare Tour)</h2>
          <p className={styles.sectionSubtitle}>
            A mobile-first food tour and dining discovery application engineered
            with interactive catalogs, real-time cart computation, and an order
            delivery lifecycle engine.
          </p>
        </div>

        <div className={styles.caseStudyGrid}>
          {/* Left: Detailed Case Study Info */}
          <div className={styles.caseStudyDetails}>
            <div className={styles.appMetaRow}>
              <span className={styles.appName}>Fareexplore</span>
              <span className={styles.appTag}>Food & Dining App</span>
            </div>

            <p className={styles.caseStudyDescription}>
              Fareexplore was conceptualized and developed to address the
              challenge of navigating diverse local culinary spots and
              streamlining order delivery. Built from the ground up with a
              mobile-first philosophy, it emphasizes finger-friendly hit
              targets, intuitive status progression, and low latency on varied
              mobile network conditions.
            </p>

            <ul className={styles.featureList}>
              <li className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h4>Food & Tour Discovery Engine</h4>
                  <p>
                    Curated catalogs spanning artisan desserts, savory grills,
                    and cold beverages with instant category filtering.
                  </p>
                </div>
              </li>

              <li className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h4>Reactive Cart & Fee Calculation</h4>
                  <p>
                    Dynamic item quantity modification, automatic subtotal
                    updates, delivery tariff computation, and quick checkout
                    state.
                  </p>
                </div>
              </li>

              <li className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.featureContent}>
                  <h4>Live Order Lifecycle Tracker</h4>
                  <p>
                    Visual status indicators guiding the customer through order
                    placed, kitchen processing, rider transit, and final
                    delivery.
                  </p>
                </div>
              </li>
            </ul>

            <div>
              <span className={styles.socialsLabel}>Technologies Used</span>
              <div className={styles.stackPills}>
                <span className={styles.stackPill}>
                  HTML5 Semantic Structure
                </span>
                <span className={styles.stackPill}>Modular CSS3 & Flexbox</span>
                <span className={styles.stackPill}>
                  Vanilla JavaScript ES6+
                </span>
                <span className={styles.stackPill}>
                  Mobile-First Responsive Layout
                </span>
                <span className={styles.stackPill}>Bootstrap Components</span>
                <span className={styles.stackPill}>REST & Auth Patterns</span>
              </div>
            </div>

            <div className={styles.projectActions}>
              <a
                href="https://github.com/Michaelend/Fareexplore"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>View Repository on GitHub</span>
              </a>

              <a
                href="https://github.com/Michaelend/Fareexplore/tree/main/faretour"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                <span>Browse /faretour Codebase</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Interactive Smartphone Simulator */}
          <div className={styles.simulatorContainer}>
            {/* Screen Selector Tabs */}
            <div className={styles.screenSelectorTabs}>
              <button
                className={`${styles.screenTab} ${activeScreen === "explore" ? styles.screenTabActive : ""}`}
                onClick={() => setActiveScreen("explore")}
              >
                🍽️ Cuisines & Menu
              </button>
              <button
                className={`${styles.screenTab} ${activeScreen === "cart" ? styles.screenTabActive : ""}`}
                onClick={() => setActiveScreen("cart")}
              >
                🛒 Cart ({cartItems.reduce((sum, i) => sum + i.qty, 0)})
              </button>
              <button
                className={`${styles.screenTab} ${activeScreen === "tracker" ? styles.screenTabActive : ""}`}
                onClick={() => setActiveScreen("tracker")}
              >
                📍 Live Tracker
              </button>
              <button
                className={`${styles.screenTab} ${activeScreen === "architecture" ? styles.screenTabActive : ""}`}
                onClick={() => setActiveScreen("architecture")}
              >
                ⚡ Architecture
              </button>
            </div>

            {/* Hardware Mockup */}
            <div className={styles.phoneMockup}>
              {/* Dynamic Island */}
              <div className={styles.phoneNotch}>
                <div className={styles.phoneCameraLens} />
              </div>

              {/* Screen Container */}
              <div className={styles.phoneScreen}>
                {/* Status Bar */}
                <div className={styles.phoneStatusBar}>
                  <span>9:41</span>
                  <span>5G · 100%</span>
                </div>

                {/* In-app Top Nav */}
                <div className={styles.phoneHeader}>
                  <span className={styles.phoneHeaderTitle}>
                    {activeScreen === "explore" && "Fareexplore Discovery"}
                    {activeScreen === "cart" && "Your Dining Cart"}
                    {activeScreen === "tracker" && "Order Tracker #FT-8492"}
                    {activeScreen === "architecture" && "Engineering Structure"}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#71717a" }}>
                    Lagos 📍
                  </span>
                </div>

                {/* Screen 1: Explore & Cuisines */}
                {activeScreen === "explore" && (
                  <div className={styles.phoneScreenContent}>
                    <div className={styles.simBanner}>
                      <span className={styles.simBannerTag}>
                        Special Tour Deal
                      </span>
                      <h4 className={styles.simBannerTitle}>
                        Taste the Finest Street Cuisines & Desserts
                      </h4>
                      <span style={{ fontSize: "0.68rem", color: "#d4d4d8" }}>
                        Fast delivery within 25 mins
                      </span>
                    </div>

                    <div className={styles.simCategoryRow}>
                      <span
                        className={`${styles.simCategoryPill} ${styles.simCategoryPillActive}`}
                      >
                        All Items
                      </span>
                      <span className={styles.simCategoryPill}>Cold Stone</span>
                      <span className={styles.simCategoryPill}>Shakes</span>
                      <span className={styles.simCategoryPill}>Grills</span>
                    </div>

                    <div className={styles.simDishCard}>
                      <div className={styles.simDishThumb}>🍨</div>
                      <div className={styles.simDishInfo}>
                        <div className={styles.simDishName}>
                          Cold Stone Signature
                        </div>
                        <div className={styles.simDishPrice}>
                          ₦4,200 · Sweet Cream
                        </div>
                      </div>
                      <button
                        className={styles.simDishBtn}
                        onClick={() =>
                          addItemToCart({
                            id: "1",
                            name: "Cold Stone Signature Ice Cream",
                            category: "Dessert",
                            price: 4200,
                            qty: 1,
                            emoji: "🍨",
                          })
                        }
                        title="Add to cart"
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.simDishCard}>
                      <div className={styles.simDishThumb}>🥤</div>
                      <div className={styles.simDishInfo}>
                        <div className={styles.simDishName}>
                          Artisan Milkshake
                        </div>
                        <div className={styles.simDishPrice}>
                          ₦2,800 · Thick Chocolate
                        </div>
                      </div>
                      <button
                        className={styles.simDishBtn}
                        onClick={() =>
                          addItemToCart({
                            id: "2",
                            name: "Artisan Chocolate Shake",
                            category: "Beverage",
                            price: 2800,
                            qty: 1,
                            emoji: "🥤",
                          })
                        }
                        title="Add to cart"
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.simDishCard}>
                      <div className={styles.simDishThumb}>🌯</div>
                      <div className={styles.simDishInfo}>
                        <div className={styles.simDishName}>
                          Gourmet Shawarma
                        </div>
                        <div className={styles.simDishPrice}>
                          ₦3,500 · Extra Chicken
                        </div>
                      </div>
                      <button
                        className={styles.simDishBtn}
                        onClick={() =>
                          addItemToCart({
                            id: "3",
                            name: "Grilled Gourmet Shawarma",
                            category: "Savory",
                            price: 3500,
                            qty: 1,
                            emoji: "🌯",
                          })
                        }
                        title="Add to cart"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Screen 2: Interactive Cart */}
                {activeScreen === "cart" && (
                  <div className={styles.phoneScreenContent}>
                    {cartItems.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "2rem 1rem",
                          color: "#71717a",
                        }}
                      >
                        <div
                          style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                        >
                          🛒
                        </div>
                        <p style={{ fontWeight: 600 }}>Your cart is empty</p>
                        <button
                          style={{
                            marginTop: "1rem",
                            padding: "0.4rem 0.8rem",
                            background: "#09090b",
                            color: "#fff",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                          }}
                          onClick={() => setActiveScreen("explore")}
                        >
                          Browse Menu
                        </button>
                      </div>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id} className={styles.simCartItem}>
                            <div>
                              <div
                                style={{
                                  fontWeight: 700,
                                  fontSize: "0.8rem",
                                  color: "#111",
                                }}
                              >
                                {item.emoji} {item.name}
                              </div>
                              <div
                                style={{ fontSize: "0.7rem", color: "#71717a" }}
                              >
                                ₦{item.price.toLocaleString()} each
                              </div>
                            </div>
                            <div className={styles.simQtyControl}>
                              <button
                                className={styles.simQtyBtn}
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                -
                              </button>
                              <span
                                style={{ fontWeight: 700, fontSize: "0.75rem" }}
                              >
                                {item.qty}
                              </span>
                              <button
                                className={styles.simQtyBtn}
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className={styles.simCartSummary}>
                          <div className={styles.simSummaryRow}>
                            <span>Subtotal</span>
                            <span>₦{cartSubtotal.toLocaleString()}</span>
                          </div>
                          <div className={styles.simSummaryRow}>
                            <span>Delivery to Lagos</span>
                            <span>₦{deliveryFee.toLocaleString()}</span>
                          </div>
                          <div className={styles.simSummaryTotal}>
                            <span>Total</span>
                            <span>₦{cartTotal.toLocaleString()}</span>
                          </div>
                          <button
                            className={styles.simCheckoutBtn}
                            onClick={() => {
                              setActiveScreen("tracker");
                              showToast(
                                "Simulating Checkout & Order Placement",
                              );
                            }}
                          >
                            Proceed to Checkout →
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Screen 3: Live Order Tracker */}
                {activeScreen === "tracker" && (
                  <div className={styles.phoneScreenContent}>
                    <div
                      style={{
                        background: "#18181b",
                        color: "#fff",
                        padding: "0.75rem",
                        borderRadius: "10px",
                      }}
                    >
                      <div style={{ fontSize: "0.68rem", color: "#a1a1aa" }}>
                        ESTIMATED ARRIVAL
                      </div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800 }}>
                        18 - 24 Mins
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#10b981",
                          marginTop: "2px",
                        }}
                      >
                        ● Rider En Route (Lekki Phase 1)
                      </div>
                    </div>

                    <div className={styles.simTrackerProgress}>
                      <div className={styles.simStepItem}>
                        <div
                          className={`${styles.simStepMarker} ${
                            trackingStep >= 0
                              ? trackingStep > 0
                                ? styles.simStepMarkerDone
                                : styles.simStepMarkerActive
                              : ""
                          }`}
                        >
                          {trackingStep > 0 ? "✓" : "1"}
                        </div>
                        <div className={styles.simStepText}>
                          <h5>Order Received</h5>
                          <p>Order confirmed & dispatched to kitchen</p>
                        </div>
                      </div>

                      <div className={styles.simStepItem}>
                        <div
                          className={`${styles.simStepMarker} ${
                            trackingStep >= 1
                              ? trackingStep > 1
                                ? styles.simStepMarkerDone
                                : styles.simStepMarkerActive
                              : ""
                          }`}
                        >
                          {trackingStep > 1 ? "✓" : "2"}
                        </div>
                        <div className={styles.simStepText}>
                          <h5>Preparation in Progress</h5>
                          <p>Fresh ingredients assembled & packed</p>
                        </div>
                      </div>

                      <div className={styles.simStepItem}>
                        <div
                          className={`${styles.simStepMarker} ${
                            trackingStep >= 2
                              ? trackingStep > 2
                                ? styles.simStepMarkerDone
                                : styles.simStepMarkerActive
                              : ""
                          }`}
                        >
                          {trackingStep > 2 ? "✓" : "3"}
                        </div>
                        <div className={styles.simStepText}>
                          <h5>Out with Delivery Partner</h5>
                          <p>Rider heading towards your delivery dropoff</p>
                        </div>
                      </div>

                      <div className={styles.simStepItem}>
                        <div
                          className={`${styles.simStepMarker} ${
                            trackingStep >= 3 ? styles.simStepMarkerDone : ""
                          }`}
                        >
                          {trackingStep >= 3 ? "✓" : "4"}
                        </div>
                        <div className={styles.simStepText}>
                          <h5>Order Completed</h5>
                          <p>Package handed over safely</p>
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.simAdvanceBtn}
                      onClick={nextTrackingStep}
                    >
                      🔄 Advance Tracker Demo State (Step {trackingStep + 1}/4)
                    </button>
                  </div>
                )}

                {/* Screen 4: Architecture */}
                {activeScreen === "architecture" && (
                  <div className={styles.phoneScreenContent}>
                    <div className={styles.simArchCard}>
                      <h5>📱 Mobile-First Breakpoints</h5>
                      <p>
                        Viewports engineered from 320px up to widescreen,
                        ensuring zero horizontal scroll or clipped UI elements.
                      </p>
                    </div>

                    <div className={styles.simArchCard}>
                      <h5>🔄 Predictable State Flow</h5>
                      <p>
                        Centralized cart and status state transitions,
                        preventing duplicate orders or stale calculations.
                      </p>
                    </div>

                    <div className={styles.simArchCard}>
                      <h5>⚡ Asset Weight & Cold Boot</h5>
                      <p>
                        Carefully budgeted CSS payload and modular SVG icons for
                        fast rendering on mobile networks.
                      </p>
                    </div>

                    <div className={styles.simArchCard}>
                      <h5>👆 Touch Target Standards</h5>
                      <p>
                        44px minimum touch targets conforming to Apple Human
                        Interface and Android Material ergonomics.
                      </p>
                    </div>
                  </div>
                )}

                {/* Home indicator bar */}
                <div className={styles.phoneBottomBar}>
                  <div className={styles.phoneHomeIndicator} />
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Interactive Mobile Simulator · Click tabs to test views
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          APP DEVELOPER PHILOSOPHY / ENGINEERING SECTION
          -------------------------------------------------------------------- */}
      <section id="architecture" className={styles.philosophySection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Engineering Core</div>
          <h2 className={styles.sectionTitle}>
            How I Approach App Development
          </h2>
          <p className={styles.sectionSubtitle}>
            Whether crafting customer-facing mobile apps or robust frontend
            interfaces, these four principles guide every line of code I write.
          </p>
        </div>

        <div className={styles.philosophyGrid}>
          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>01 // ERGONOMICS</span>
            <h3 className={styles.pillarTitle}>Touch-First & Fluid Layouts</h3>
            <p className={styles.pillarText}>
              Interfaces must feel native to fingers, not just mouse pointers.
              Every button, input, and sheet is engineered with comfortable
              reachability, minimum 48px hit areas, and smooth visual feedback
              on tap.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>02 // ARCHITECTURE</span>
            <h3 className={styles.pillarTitle}>
              Component Modularity & Clean State
            </h3>
            <p className={styles.pillarText}>
              Clean separation of UI representation from state logic. Breaking
              complex screens into decoupled, reusable modules simplifies
              testing, refactoring, and team collaboration.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>03 // RESILIENCE</span>
            <h3 className={styles.pillarTitle}>
              Performance on Real Mobile Networks
            </h3>
            <p className={styles.pillarText}>
              Building in Nigeria gives me direct empathy for bandwidth
              constraints. I prioritize compact assets, fast initial paints, and
              graceful offline degradation over bloated dependencies.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>04 // POLISH</span>
            <h3 className={styles.pillarTitle}>Subtle Micro-Interactions</h3>
            <p className={styles.pillarText}>
              Great apps distinguish themselves through detail: tactile press
              states, crisp transitions, zero jank, and intentional motion that
              reassures the user at every step of their journey.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SKILLS & TECH STACK SECTION
          -------------------------------------------------------------------- */}
      <section id="skills" className={styles.skillsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Skills & Capabilities</div>
          <h2 className={styles.sectionTitle}>Technical Toolkit</h2>
          <p className={styles.sectionSubtitle}>
            The tools, frameworks, and core disciplines I leverage to transform
            wireframes into production-grade mobile and web applications.
          </p>
        </div>

        <div className={styles.skillsContainer}>
          <div className={styles.skillCategoryCard}>
            <div className={styles.skillCategoryHeader}>
              <div className={styles.skillIconBox}>📱</div>
              <h3 className={styles.skillCategoryTitle}>App & Web Core</h3>
            </div>
            <ul className={styles.skillList}>
              <li className={styles.skillItem}>JavaScript (ES6+)</li>
              <li className={styles.skillItem}>TypeScript</li>
              <li className={styles.skillItem}>React</li>
              <li className={styles.skillItem}>Next.js</li>
              <li className={styles.skillItem}>HTML5 Semantics</li>
              <li className={styles.skillItem}>Modern CSS3 / Modules</li>
              <li className={styles.skillItem}>Responsive Web Apps</li>
            </ul>
          </div>

          <div className={styles.skillCategoryCard}>
            <div className={styles.skillCategoryHeader}>
              <div className={styles.skillIconBox}>🎨</div>
              <h3 className={styles.skillCategoryTitle}>Mobile UX & Styling</h3>
            </div>
            <ul className={styles.skillList}>
              <li className={styles.skillItem}>Mobile-First Design</li>
              <li className={styles.skillItem}>Flexbox & CSS Grid</li>
              <li className={styles.skillItem}>Touch Target Optimization</li>
              <li className={styles.skillItem}>Micro-Interactions</li>
              <li className={styles.skillItem}>Bootstrap / Utility Systems</li>
              <li className={styles.skillItem}>Cross-Browser Testing</li>
              <li className={styles.skillItem}>Accessibility (a11y)</li>
            </ul>
          </div>

          <div className={styles.skillCategoryCard}>
            <div className={styles.skillCategoryHeader}>
              <div className={styles.skillIconBox}>⚙️</div>
              <h3 className={styles.skillCategoryTitle}>
                Architecture & Tooling
              </h3>
            </div>
            <ul className={styles.skillList}>
              <li className={styles.skillItem}>Git & GitHub Version Control</li>
              <li className={styles.skillItem}>State Flow & Cart Logic</li>
              <li className={styles.skillItem}>REST API Consumption</li>
              <li className={styles.skillItem}>JSON Data Modeling</li>
              <li className={styles.skillItem}>Chrome & Mobile DevTools</li>
              <li className={styles.skillItem}>Turbopack & Bundlers</li>
              <li className={styles.skillItem}>Clean Code Practices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          ABOUT ARINZE SECTION
          -------------------------------------------------------------------- */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutQuoteCard}>
            <span className={styles.quoteMark}>“</span>
            <p className={styles.quoteText}>
              Great apps aren’t just written; they are sculpted around the human
              using them. I want every screen to feel instantaneous, dependable,
              and delightfully clear.
            </p>
            <div className={styles.quoteAuthor}>
              <div className={styles.quoteAuthorThumb}>
                <Image
                  src="/arinze.jpeg"
                  alt="Udoye Arinze"
                  width={48}
                  height={48}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  Udoye Arinze
                </div>
                <div
                  style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}
                >
                  App Developer · Lagos, Nigeria
                </div>
              </div>
            </div>
          </div>

          <div className={styles.aboutTextGroup}>
            <div
              className={styles.sectionBadge}
              style={{ alignSelf: "flex-start" }}
            >
              About the Developer
            </div>
            <h2 className={styles.aboutHeading}>
              Engineering digital products with curiosity, grit, and precision.
            </h2>
            <p className={styles.aboutParagraph}>
              I am an app developer based in Nigeria, dedicated to building
              responsive interfaces and interactive mobile-first systems. I
              believe that an engineer’s strength lies not merely in how many
              repositories they have, but in the depth of thought, clean
              structure, and craft they bring to the problems they solve.
            </p>
            <p className={styles.aboutParagraph}>
              With my flagship project <strong>Fareexplore</strong>, I explored
              the intersection of local food discovery, transactional cart
              computation, and multi-stage order tracking. I am currently
              seeking an app developer role where I can collaborate with
              talented engineers, contribute high-quality code, and continue
              growing rapidly.
            </p>

            <div className={styles.aboutHighlights}>
              <div className={styles.aboutHighlightItem}>
                <span className={styles.aboutHighlightTitle}>
                  Quick Learner
                </span>
                <span className={styles.aboutHighlightSub}>
                  Rapid adoption of new frameworks and codebases
                </span>
              </div>
              <div className={styles.aboutHighlightItem}>
                <span className={styles.aboutHighlightTitle}>
                  High Ownership
                </span>
                <span className={styles.aboutHighlightSub}>
                  Taking features from idea to tested, polished UX
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          CONTACT & HIRE SECTION
          -------------------------------------------------------------------- */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.sectionBadge}>Get In Touch</div>
          <h2 className={styles.contactHeading}>
            Ready to bring an enthusiastic App Developer onto your team?
          </h2>
          <p className={styles.contactSubtitle}>
            Whether you have an open full-time app developer role, a contract
            project, or simply want to chat about tech, I would love to connect.
          </p>

          <div className={styles.contactCardsGrid}>
            {/* Email Card */}
            <div className={styles.contactCard}>
              <div className={styles.contactCardIcon}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className={styles.contactCardTitle}>Direct Email</span>
              <button
                className={styles.contactCardAction}
                onClick={() => copyEmailToClipboard()}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Copy arinze.udoye@gmail.com
              </button>
            </div>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/2348000000000?text=Hi%20Arinze%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity%21"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.contactCardIcon}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.204 8.204 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.02.79.81-2.94-.19-.3a8.214 8.214 0 01-1.25-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
                </svg>
              </div>
              <span className={styles.contactCardTitle}>WhatsApp Chat</span>
              <span className={styles.contactCardAction}>Direct Message ↗</span>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/Michaelend"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.contactCardIcon}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </div>
              <span className={styles.contactCardTitle}>GitHub</span>
              <span className={styles.contactCardAction}>@Michaelend ↗</span>
            </a>

            {/* X Card */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.contactCardIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className={styles.contactCardTitle}>X / Twitter</span>
              <span className={styles.contactCardAction}>
                Follow & Message ↗
              </span>
            </a>
          </div>

          {/* Quick Inquiry Message Box */}
          <div className={styles.inquiryBox}>
            <div className={styles.inquiryBoxHeader}>
              <span className={styles.inquiryTitle}>Send a Quick Message</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-tertiary)",
                }}
              >
                Fast Response ⚡
              </span>
            </div>

            <div className={styles.inquiryForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Your Name / Company</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan / Tech Corp"
                  className={styles.textInput}
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  Your Email or Contact
                </label>
                <input
                  type="email"
                  placeholder="e.g. alex@company.com"
                  className={styles.textInput}
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Message</label>
                <textarea
                  placeholder="We'd love to chat with you about an App Developer position..."
                  className={styles.textArea}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                />
              </div>

              <div className={styles.inquirySubmitGroup}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleInquirySubmit("email")}
                >
                  <span>Send via Email Client</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleInquirySubmit("whatsapp")}
                >
                  <span>Send via WhatsApp</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          FOOTER
          -------------------------------------------------------------------- */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerCopyright}>
              © 2026 Udoye Arinze. All rights reserved.
            </div>
            <div className={styles.footerMeta}>
              App Developer · Based in Nigeria 🇳🇬 · West Africa Time (UTC+1)
            </div>
          </div>

          <div className={styles.footerRight}>
            <button
              className={styles.backToTopBtn}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>Back to Top</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
