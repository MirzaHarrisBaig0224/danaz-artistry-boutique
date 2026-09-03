import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Gift, Sparkles, Instagram, MessageCircle, Music2, Mail } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductModal } from "@/components/site/ProductModal";
import { Testimonials } from "@/components/site/Testimonials";
import { ShopProvider, categories, featured, products, type Category, type Product } from "@/lib/shop";

import logo from "@/assets/danaz-logo.jpg.asset.json";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artistry by Danaz — Handmade Crochet Keychains & Jewelry" },
      {
        name: "description",
        content:
          "Handmade crochet keychains, bracelets, jewelry and cute charms — little things made with love by Artistry by Danaz.",
      },
      { property: "og:title", content: "Artistry by Danaz — Handmade Little Things" },
      {
        property: "og:description",
        content:
          "A tiny handmade boutique of crochet keychains, bracelets, jewelry and giftable charms made with love.",
      },
    ],
  }),
  component: Index,
});

const galleryItems = [
  { src: g1, label: "Yarn & beginnings", h: 1000 },
  { src: g4, label: "Crochet keychains", h: 1000 },
  { src: g3, label: "Bracelet stacks", h: 900 },
  { src: g2, label: "Pretty packaging", h: 700 },
  { src: g5, label: "Gift sets", h: 650 },
  { src: aboutImg, label: "Behind the scenes", h: 1408 },
];

function Doodle({ className, children }: { className: string; children: React.ReactNode }) {
  return <span className={`pointer-events-none absolute select-none ${className}`}>{children}</span>;
}

function Index() {
  return (
    <ShopProvider>
      <PageBody />
    </ShopProvider>
  );
}

function PageBody() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [active, setActive] = useState<Product | null>(null);

  const visible = filter === "All" ? products : products.filter((p) => p.categories.includes(filter));

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Nav />

      {/* HERO */}
      <section id="home" className="relative paper pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blush/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-60 h-80 w-80 rounded-full bg-olive-soft/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <Reveal className="relative">
            <Doodle className="float-slow -left-6 -top-6 text-2xl text-primary/50">✿</Doodle>
            <Doodle className="float-slower right-8 top-0 text-xl text-olive/50">✦</Doodle>
            <span className="font-script text-2xl text-primary">handmade with care</span>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] sm:text-6xl">
              Little Things,
              <br />
              Made With <span className="italic text-primary">Love.</span>
            </h1>
            <p className="mt-6 max-w-md text-balance-pretty leading-relaxed text-muted-foreground">
              Handmade pieces, tiny details and pretty little things made to add a little more joy to your
              everyday.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
              >
                Shop the Collection
              </a>
              <a
                href="#about"
                className="rounded-full border border-primary/30 px-7 py-3.5 text-sm text-primary transition-colors duration-300 hover:bg-primary/8"
              >
                Explore Our Story
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
              <span>Crochet</span>
              <span className="text-primary/60">♡</span>
              <span>Bracelets</span>
              <span className="text-primary/60">♡</span>
              <span>Jewelry</span>
              <span className="text-primary/60">♡</span>
              <span>Charms</span>
            </div>
          </Reveal>

          <Reveal delay={140} className="relative">
            <Doodle className="float-slow -left-4 bottom-10 z-10 text-3xl text-primary/60">♥</Doodle>
            <Doodle className="float-slower -right-2 -top-4 z-10 text-2xl text-gold">✧</Doodle>
            <div className="overflow-hidden rounded-[2.5rem] border border-border/70 shadow-lift">
              <img
                src={heroImg}
                alt="Handmade crochet keychains, bracelets and jewelry on cream linen"
                width={1408}
                height={1104}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-border/70 bg-card/95 px-5 py-3 shadow-soft backdrop-blur">
              <p className="font-script text-xl text-primary">made by hand, in small batches</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <span className="font-script text-2xl text-primary">a little edit</span>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">Made For You</h2>
            <p className="mx-auto mt-4 max-w-lg text-balance-pretty text-muted-foreground">
              Cute little pieces for yourself, your best friend, or someone special.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ProductCard product={p} onOpen={setActive} showBlurb />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="paper bg-ivory/60 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <span className="font-script text-2xl text-primary">the whole collection</span>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">Find Your Little Favorite</h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-5 py-2 text-xs tracking-wide transition-all duration-300 ${filter === c
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card/70 text-foreground/70 hover:border-primary/40 hover:text-primary"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p, i) => (
              <div
                key={p.id}
                className="animate-pop"
                style={{ animationDelay: `${i * 55}ms`, animationFillMode: "backwards" }}
              >
                <ProductCard product={p} onOpen={setActive} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
          <Reveal className="relative">
            <Doodle className="float-slow -right-3 -top-4 z-10 text-2xl text-primary/50">✿</Doodle>
            <div className="overflow-hidden rounded-[2.5rem] border border-border/70 shadow-lift">
              <img
                src={aboutImg}
                alt="Hands crocheting a small pink flower on a cosy craft table"
                loading="lazy"
                width={1200}
                height={1408}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="font-script text-2xl text-primary">our little story</span>
            <h2 className="mt-1 font-display text-4xl leading-tight sm:text-5xl">
              Made By Hand, Made With Heart.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Artistry by Danaz is all about turning little ideas into things you can actually hold, wear and
              love. Every piece is handmade with care, creativity and attention to the little details that make
              it special.
            </p>
            <p className="mt-8 font-display text-xl tracking-wide text-primary">
              Handmade • Thoughtful • One of a Kind
            </p>
            <img
              src={logo.url}
              alt="ND monogram of Artistry by Danaz"
              loading="lazy"
              width={72}
              height={72}
              className="mt-8 h-18 w-18 rounded-full object-cover ring-1 ring-border"
            />
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-ivory/60 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="text-center">
            <h2 className="font-display text-4xl sm:text-5xl">Why Handmade?</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Made With Love",
                copy: "Every piece is created by hand with care and attention.",
              },
              {
                icon: Sparkles,
                title: "Uniquely Yours",
                copy: "Small variations make every handmade piece beautifully unique.",
              },
              {
                icon: Gift,
                title: "Perfect For Gifting",
                copy: "Cute little treasures made for birthdays, besties, celebrations and just-because moments.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 110}>
                <div className="h-full rounded-3xl border border-border/70 bg-card p-8 text-center shadow-soft transition-transform duration-500 hover:-translate-y-1">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary/50">
                    <f.icon className="h-6 w-6 text-secondary-foreground" strokeWidth={1.2} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <span className="font-script text-2xl text-primary">peek inside</span>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">A Little Look Into Our World</h2>
          </Reveal>

          <div className="mt-14 columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
            {galleryItems.map((item, i) => (
              <Reveal key={item.label} delay={(i % 3) * 90}>
                <figure className="group relative overflow-hidden rounded-3xl border border-border/70 shadow-soft">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-108"
                  />
                  <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cocoa/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                    <Heart className="h-6 w-6 fill-cream text-cream" strokeWidth={1} />
                    <span className="font-script text-2xl text-cream">{item.label}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-ivory/60 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="font-display text-4xl sm:text-5xl">Loved By You</h2>
          </Reveal>
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative paper overflow-hidden bg-blush/35 py-28">
        <Doodle className="float-slow left-10 top-12 text-3xl text-primary/40">♥</Doodle>
        <Doodle className="float-slower right-14 top-20 text-2xl text-olive/40">✿</Doodle>
        <Doodle className="float-slow bottom-12 left-1/4 text-2xl text-gold">✦</Doodle>
        <Doodle className="float-slower bottom-16 right-1/4 text-3xl text-primary/30">✧</Doodle>
        <Reveal className="relative mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Find Something That Feels Like You.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-balance-pretty text-muted-foreground">
            From tiny crochet friends to everyday jewelry, there’s always something special waiting for you.
          </p>
          <a
            href="#shop"
            className="mt-9 inline-flex rounded-full bg-primary px-9 py-3.5 text-sm text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
          >
            Shop Now
          </a>
        </Reveal>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="border-t border-border/70 bg-card/70 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo.url}
                alt="Artistry by Danaz logo"
                loading="lazy"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
              />
              <span className="font-display text-xl">Artistry by Danaz</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Handmade little things, made with lots of love.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Home", href: "#home" },
                { label: "Shop", href: "#shop" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg">Say hello</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Custom orders and gift sets — just send a little message.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Music2, label: "TikTok" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: Mail, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#contact"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          © 2026 Artistry by Danaz. All rights reserved.
        </p>
      </footer>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </div>
  );
}
