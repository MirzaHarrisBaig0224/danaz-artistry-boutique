import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Everything was even cuter in person! You can really tell how much love went into making it.",
    name: "Areeba",
    initial: "A",
  },
  {
    quote: "My bracelet is absolutely adorable and the packaging was so pretty!",
    name: "Hina",
    initial: "H",
  },
  {
    quote: "I ordered a keychain as a gift and ended up wanting one for myself too!",
    name: "Sana",
    initial: "S",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-2 shadow-soft">
        <div
          className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t) => (
            <figure key={t.name} className="w-full shrink-0 px-6 py-10 text-center sm:px-12">
              <div className="mb-4 flex justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-display text-2xl leading-relaxed text-foreground/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary/70 font-display text-lg text-secondary-foreground">
                  {t.initial}
                </span>
                <span className="font-script text-xl text-primary">— {t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setIndex(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index ? "w-7 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
