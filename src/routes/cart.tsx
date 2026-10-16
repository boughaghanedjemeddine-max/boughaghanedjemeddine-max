import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct, formatDZD, effectivePrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة التسوق — NIHED FASHION" },
      { name: "description", content: "راجعي منتجات سلتك قبل إتمام الطلب." },
      { property: "og:title", content: "سلة التسوق — NIHED FASHION" },
      { property: "og:description", content: "سلة التسوق في متجر نهاد فاشن." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, update, remove, subtotal } = useCart();
  if (items.length === 0)
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-primary" strokeWidth={1.2} />
        <h1 className="mt-6 text-2xl font-bold">سلتك فارغة</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-primary-foreground"
        >
          متابعة التسوق
        </Link>
      </div>
    );
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">سلة التسوق</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <ul className="space-y-4">
          {items.map((it, i) => {
            const p = getProduct(it.productId);
            if (!p) return null;
            return (
              <li key={i} className="flex gap-4 rounded-2xl border bg-card p-4">
                <img src={p.images[0]} alt={p.name} className="h-28 w-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {[it.color, it.size].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-1 font-bold text-primary">{formatDZD(effectivePrice(p))}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-full border">
                      <button
                        className="p-2"
                        onClick={() => update(i, it.qty + 1)}
                        aria-label="زيادة"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{it.qty}</span>
                      <button
                        className="p-2"
                        onClick={() => update(i, it.qty - 1)}
                        aria-label="إنقاص"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </div>
                    <button onClick={() => remove(i)} aria-label="حذف" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <aside className="h-fit rounded-2xl border bg-card p-6">
          <div className="flex justify-between">
            <span>المجموع الفرعي</span>
            <b>{formatDZD(subtotal)}</b>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            يُحسب سعر التوصيل حسب الولاية في الخطوة التالية.
          </p>
          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-primary py-3 text-center text-primary-foreground"
          >
            إتمام الطلب
          </Link>
        </aside>
      </div>
    </div>
  );
}
