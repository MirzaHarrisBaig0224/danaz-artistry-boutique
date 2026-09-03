import { useEffect, useState } from "react";
import { Heart, Minus, Plus, Sparkles, X } from "lucide-react";

import { formatPrice, useShop, type Product } from "@/lib/shop";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string>("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQty(1);
      setVariant(product.variants[0] ?? "Standard");
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;
  const liked = favorites.includes(product.id);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-cocoa/35 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <button className="absolute inset-0 cursor-default" aria-label="Close" onClick={onClose} />
      <div className="animate-pop relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-card shadow-lift sm:rounded-3xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 text-[11px] tracking-wide text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} /> Made by hand
            </span>
            <h3 className="font-display text-3xl leading-tight">{product.name}</h3>
            <p className="font-display text-2xl text-primary">{formatPrice(product.price)}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div>
              <p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">Colour</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${
                      variant === v
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground/70 hover:border-primary/40"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label="Favourite"
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-transform hover:scale-110"
              >
                <Heart
                  className={`h-4.5 w-4.5 ${liked ? "fill-primary text-primary" : "text-foreground/40"}`}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, qty, variant);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1400);
              }}
              className="relative rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              {added ? "Added with love ♡" : "Add to Cart"}
              {added && (
                <span className="animate-fly pointer-events-none absolute left-1/2 top-0 text-primary">♥</span>
              )}
            </button>

            <p className="rounded-2xl bg-muted/70 p-4 text-xs leading-relaxed text-muted-foreground">
              Every piece is made by hand, so tiny variations in stitches, beads and colour are part of the
              charm — yours will be one of a kind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
