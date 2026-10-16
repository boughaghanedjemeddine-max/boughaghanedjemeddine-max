import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, products, effectivePrice } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";

type Search = { category?: string | undefined; q?: string | undefined; wish?: boolean | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s["category"] === "string" ? s["category"] : undefined,
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    wish: s["wish"] === true || s["wish"] === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "المتجر — NIHED FASHION" },
      {
        name: "description",
        content:
          "تصفحي جميع الحجابات والملابس النسائية والإكسسوارات مع فلترة حسب السعر واللون والقسم.",
      },
      { property: "og:title", content: "المتجر — NIHED FASHION" },
      { property: "og:description", content: "تشكيلة الحجابات والملابس النسائية من نهاد فاشن." },
    ],
  }),
  component: Shop,
});

const PAGE = 8;

function Shop() {
  const { category, q, wish } = Route.useSearch();
  const { wishlist } = useCart();
  const [search, setSearch] = useState(q ?? "");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("newest");
  const [inStock, setInStock] = useState(false);
  const [color, setColor] = useState("");
  const [shown, setShown] = useState(PAGE);

  const allColors = Array.from(
    new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values(),
  );

  const list = useMemo(() => {
    let r = products.filter((p) => p.active);
    if (wish) r = r.filter((p) => wishlist.includes(p.id));
    if (category === "sale") r = r.filter((p) => p.salePrice);
    else if (category === "new") r = r.filter((p) => p.isNew);
    else if (category) r = r.filter((p) => p.category === category);
    if (search) r = r.filter((p) => p.name.includes(search.trim()));
    if (min) r = r.filter((p) => effectivePrice(p) >= +min);
    if (max) r = r.filter((p) => effectivePrice(p) <= +max);
    if (inStock) r = r.filter((p) => p.stock > 0);
    if (color) r = r.filter((p) => p.colors.some((c) => c.name === color));
    const s = [...r];
    if (sort === "newest") s.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "asc") s.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "desc") s.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    if (sort === "popular") s.sort((a, b) => b.popularity - a.popularity);
    return s;
  }, [category, search, min, max, sort, inStock, color, wish, wishlist]);

  const title = wish
    ? "المفضلة"
    : (categories.find((c) => c.id === category)?.name ?? "جميع المنتجات");
  const field =
    "w-full rounded-xl border bg-card px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-xs text-muted-foreground">* بيانات تجريبية</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6 rounded-2xl border bg-card p-5 h-fit">
          <div>
            <label className="mb-2 block text-sm font-bold">بحث</label>
            <input
              className={field}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحثي عن منتج..."
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-bold">الأقسام</p>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/shop"
                className={`rounded-full border px-3 py-1 text-xs ${!category ? "bg-primary text-primary-foreground" : ""}`}
              >
                الكل
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to="/shop"
                  search={{ category: c.id }}
                  className={`rounded-full border px-3 py-1 text-xs ${category === c.id ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold">السعر (دج)</p>
            <div className="flex gap-2">
              <input
                type="number"
                className={field}
                placeholder="من"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
              <input
                type="number"
                className={field}
                placeholder="إلى"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold">اللون</p>
            <div className="flex flex-wrap gap-2">
              {allColors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setColor(color === c.name ? "" : c.name)}
                  className={`h-7 w-7 rounded-full border-2 ${color === c.name ? "border-primary" : "border-transparent"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="accent-primary"
            />{" "}
            المتوفر فقط
          </label>
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{list.length} منتج</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border bg-card px-3 py-2 text-sm"
            >
              <option value="newest">الأحدث</option>
              <option value="asc">السعر: من الأقل</option>
              <option value="desc">السعر: من الأعلى</option>
              <option value="popular">الأكثر شعبية</option>
            </select>
          </div>
          {list.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">لا توجد منتجات مطابقة.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {list.slice(0, shown).map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
          {shown < list.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShown(shown + PAGE)}
                className="rounded-full border border-primary px-8 py-2 text-primary"
              >
                عرض المزيد
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
