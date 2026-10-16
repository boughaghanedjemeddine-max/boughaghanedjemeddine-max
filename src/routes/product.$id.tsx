import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products, formatDZD, effectivePrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { id: p.id, name: p.name, description: p.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — NIHED FASHION` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — NIHED FASHION` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "منتج غير متوفر" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useLoaderData();
  const p = getProduct(id)!;
  const { add } = useCart();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);
  const [color, setColor] = useState(p.colors[0]?.name);
  const [size, setSize] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const out = p.stock === 0;
  const needSize = !!p.sizes && !size;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  const doAdd = () => {
    if (needSize) {
      toast.error("يرجى اختيار المقاس");
      return false;
    }
    add({ productId: p.id, color, size, qty });
    toast.success("تمت الإضافة إلى السلة");
    return true;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
            <img src={p.images[img]} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 flex gap-3">
            {p.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                className={`h-20 w-16 overflow-hidden rounded-xl border-2 ${img === i ? "border-primary" : "border-transparent"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">SKU: {p.sku} · بيانات تجريبية</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{p.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">{formatDZD(effectivePrice(p))}</span>
            {p.salePrice && (
              <span className="text-muted-foreground line-through">{formatDZD(p.price)}</span>
            )}
          </div>
          <p className="mt-6 leading-loose text-muted-foreground">{p.description}</p>
          <p className="mt-2 text-sm">
            <b>الخامة:</b> {p.material}
          </p>

          <div className="mt-8">
            <p className="mb-2 text-sm font-bold">اللون: {color}</p>
            <div className="flex gap-2">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  className={`h-9 w-9 rounded-full border-2 ${color === c.name ? "border-primary" : "border-border"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          {p.sizes && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-bold">المقاس</p>
              <div className="flex gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 min-w-10 rounded-xl border px-3 text-sm ${size === s ? "bg-primary text-primary-foreground" : "bg-card"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border">
              <button
                className="p-3"
                onClick={() => setQty(Math.min(p.stock, qty + 1))}
                aria-label="زيادة"
                disabled={qty >= p.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                className="p-3"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="إنقاص"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
            <span className={`text-sm ${out ? "text-destructive" : "text-success"}`}>
              {out ? "نفدت الكمية" : `متوفر (${p.stock} قطعة)`}
            </span>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              disabled={out}
              onClick={doAdd}
              className="flex-1 rounded-full border border-primary py-3 text-primary disabled:opacity-40"
            >
              أضيفي إلى السلة
            </button>
            <button
              disabled={out}
              onClick={() => doAdd() && navigate({ to: "/checkout" })}
              className="flex-1 rounded-full bg-primary py-3 text-primary-foreground disabled:opacity-40"
            >
              اشتري الآن
            </button>
          </div>

          <div className="mt-8 space-y-3 rounded-2xl bg-secondary p-5 text-sm">
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> التوصيل إلى 58 ولاية — يُحسب السعر حسب
              الولاية.
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-primary" /> إمكانية الإرجاع وفق سياسة المتجر.
            </p>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">منتجات مشابهة</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
