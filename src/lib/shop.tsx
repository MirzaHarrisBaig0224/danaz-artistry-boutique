import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import keychain from "@/assets/p-keychain.jpg";
import bracelet from "@/assets/p-bracelet.jpg";
import jewelry from "@/assets/p-jewelry.jpg";
import charms from "@/assets/p-charms.jpg";
import cherry from "@/assets/p-cherry.jpg";
import gift from "@/assets/p-gift.jpg";
import bunny from "@/assets/p-bunny.jpg";
import necklace from "@/assets/p-necklace.jpg";

export type Category = "Crochet" | "Keychains" | "Bracelets" | "Jewelry" | "Charms" | "Gifts";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  blurb: string;
  description: string;
  categories: Category[];
  variants: string[];
  availability: string;
};

export const products: Product[] = [
  {
    id: "crochet-daisy",
    name: "Crochet Daisy Keychain",
    price: 850,
    image: keychain,
    blurb: "Tiny handmade companions made to brighten your keys, bags and everyday adventures.",
    description:
      "A little crocheted daisy worked in soft cotton yarn, finished with a sturdy keyring so it can travel everywhere with you.",
    categories: ["Crochet", "Keychains"],
    variants: ["Blush", "Olive", "Ivory"],
    availability: "In stock",
  },
  {
    id: "beaded-heart",
    name: "Beaded Heart Bracelet",
    price: 1200,
    image: bracelet,
    blurb: "Delicate, playful and easy-to-wear pieces made to add a little personality to your look.",
    description:
      "Hand-strung pastel beads with a brushed gold heart in the centre — light enough to wear every day, pretty enough to stack.",
    categories: ["Bracelets"],
    variants: ["Rose + Olive", "All Blush", "Cream"],
    availability: "In stock",
  },
  {
    id: "pressed-flower-earrings",
    name: "Pressed Flower Earrings",
    price: 1450,
    image: jewelry,
    blurb: "Unique pieces designed with love for those little moments when you want to feel extra special.",
    description:
      "Real dried blossoms set in a clear resin drop on gold-plated hooks. No two pairs bloom quite the same way.",
    categories: ["Jewelry"],
    variants: ["Wildflower", "Daisy", "Lavender"],
    availability: "Only 4 left",
  },
  {
    id: "clay-charms",
    name: "Tiny Clay Charm Set",
    price: 700,
    image: charms,
    blurb: "Small details that make your favorite things feel even more like you.",
    description:
      "A trio of hand-sculpted clay charms — a sleepy bear, a little heart and a star — ready to clip onto bags, zips and phone straps.",
    categories: ["Charms"],
    variants: ["Pastel", "Neutral"],
    availability: "In stock",
  },
  {
    id: "cherry-keychain",
    name: "Crochet Cherry Charm",
    price: 900,
    image: cherry,
    blurb: "A sweet little pair of cherries, crocheted stitch by stitch.",
    description:
      "Plump crocheted cherries with olive leaves, stuffed by hand and finished with a silver clasp.",
    categories: ["Crochet", "Keychains", "Charms"],
    variants: ["Dusty Rose", "Red"],
    availability: "In stock",
  },
  {
    id: "bunny-bag-charm",
    name: "Little Bunny Bag Charm",
    price: 1100,
    image: bunny,
    blurb: "A tiny friend tucked into a cosy crocheted pouch.",
    description:
      "A soft ivory bunny peeking out of an olive green crochet basket — our most-gifted little character.",
    categories: ["Crochet", "Charms"],
    variants: ["Olive", "Blush"],
    availability: "Made to order",
  },
  {
    id: "daisy-necklace",
    name: "Pearl Daisy Necklace",
    price: 1650,
    image: necklace,
    blurb: "A dainty everyday necklace with the tiniest flower.",
    description:
      "Freshwater-style pearls on a fine gold chain with a small mother-of-pearl daisy pendant.",
    categories: ["Jewelry"],
    variants: ['16"', '18"'],
    availability: "In stock",
  },
  {
    id: "little-gift-box",
    name: "Little Gift Box",
    price: 2400,
    image: gift,
    blurb: "A ready-to-give bundle wrapped with ribbon and dried flowers.",
    description:
      "Choose any bracelet plus a crochet charm, nestled in tissue with a handwritten note. Wrapped and ready to gift.",
    categories: ["Gifts"],
    variants: ["Blush Wrap", "Olive Wrap"],
    availability: "In stock",
  },
];

export const featured = ["crochet-daisy", "beaded-heart", "pressed-flower-earrings", "clay-charms"]
  .map((id) => products.find((p) => p.id === id)!)
  .filter(Boolean);

export const categories: ("All" | Category)[] = [
  "All",
  "Crochet",
  "Keychains",
  "Bracelets",
  "Jewelry",
  "Charms",
  "Gifts",
];

export const formatPrice = (value: number) => `Rs ${value.toLocaleString("en-PK")}`;

type CartLine = { product: Product; qty: number; variant: string };

type ShopContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  bump: number;
  favorites: string[];
  addToCart: (product: Product, qty?: number, variant?: string) => void;
  toggleFavorite: (id: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bump, setBump] = useState(0);

  const addToCart = useCallback((product: Product, qty = 1, variant = product.variants[0]) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.product.id === product.id && l.variant === variant);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, qty, variant }];
    });
    setBump((b) => b + 1);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  const value = useMemo(
    () => ({
      lines,
      favorites,
      bump,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      addToCart,
      toggleFavorite,
    }),
    [lines, favorites, bump, addToCart, toggleFavorite],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
