import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { type Product, formatDZD, effectivePrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ p }: { p: Product }) {
  const { add, toggleWish, wishlist } = useCart();
  const discount = p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;
  const out = p.stock === 0;
  const wished = wishlist.includes(p.id);
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link to="/product/$id" params={{ id: p.id }}>
          <img
            src={p.images[0]}
            alt={p.name}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => toggleWish(p.id)}
          aria-label="أضيفي للمفضلة"
          className="absolute top-3 left-3 rounded-full bg-card/90 p-2"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
        <Link
          to="/product/$id"
          params={{ id: p.id }}
          className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full bg-card/95 py-2 text-xs opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" /> عرض سريع
        </Link>
      </div>
      <div className="space-y-2 p-4">
        <Link to="/product/$id" params={{ id: p.id }}>
          <h3 className="font-semibold">{p.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">{formatDZD(effectivePrice(p))}</span>
          {p.salePrice && (
            <span className="text-sm text-muted-foreground line-through">{formatDZD(p.price)}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {p.colors.map((c) => (
              <span
                key={c.hex}
                title={c.name}
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <span
            className={`text-xs ${out ? "text-destructive" : p.stock < 5 ? "text-primary" : "text-success"}`}
          >
            {out ? "نفدت الكمية" : p.stock < 5 ? `بقي ${p.stock} فقط` : "متوفر"}
          </span>
        </div>
        <button
          disabled={out || !!p.sizes}
          onClick={() => {
            add({ productId: p.id, color: p.colors[0]?.name, qty: 1 });
            toast.success("تمت الإضافة إلى السلة");
          }}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-primary py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <ShoppingBag className="h-4 w-4" /> {p.sizes ? "اختاري المقاس" : "أضيفي إلى السلة"}
        </button>
      </div>
    </article>
  );
}
