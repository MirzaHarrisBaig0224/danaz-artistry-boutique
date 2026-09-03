import { Heart } from "lucide-react";

import { formatPrice, useShop, type Product } from "@/lib/shop";

export function ProductCard({
  product,
  onOpen,
  showBlurb = false,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  showBlurb?: boolean;
}) {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const liked = favorites.includes(product.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <button
        onClick={() => onOpen(product)}
        className="relative block aspect-square w-full overflow-hidden"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-108"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[11px] tracking-wide text-foreground/70 backdrop-blur">
          Made by hand
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-snug">{product.name}</h3>
          <button
            onClick={() => toggleFavorite(product.id)}
            aria-label="Add to favourites"
            className="mt-1 shrink-0 transition-transform duration-300 hover:scale-115"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${liked ? "fill-primary text-primary" : "text-foreground/35"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {showBlurb && <p className="text-sm leading-relaxed text-muted-foreground">{product.blurb}</p>}

        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <p className="font-display text-lg text-primary">{formatPrice(product.price)}</p>
            <p className="text-[11px] tracking-wide text-muted-foreground">{product.availability}</p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="rounded-full border border-primary/35 px-4 py-2 text-xs tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
