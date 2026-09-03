import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

import logo from "@/assets/danaz-logo.jpg.asset.json";
import { useShop } from "@/lib/shop";

const links = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, bump } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="Artistry by Danaz ND monogram"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
          />
          <span className="hidden text-lg leading-tight font-display tracking-wide sm:block">
            Artistry <span className="font-script text-primary">by</span> Danaz
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm tracking-wide md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-foreground/75 transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#shop"
            className="relative hidden rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Shop Now
          </a>
          <a
            href="#shop"
            aria-label="Cart"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70"
          >
            <ShoppingBag className="h-4.5 w-4.5 text-foreground/80" strokeWidth={1.5} />
            {count > 0 && (
              <span
                key={bump}
                className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-primary-foreground"
              >
                {count}
              </span>
            )}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 md:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {links.map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-display text-xl text-foreground/85"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
