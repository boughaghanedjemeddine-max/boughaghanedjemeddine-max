import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { label: "الرئيسية", to: "/" as const },
  { label: "الحجابات", to: "/shop" as const, search: { category: "hijabs" } },
  { label: "الملابس النسائية", to: "/shop" as const, search: { category: "clothing" } },
  { label: "الإكسسوارات", to: "/shop" as const, search: { category: "accessories" } },
  { label: "التخفيضات", to: "/shop" as const, search: { category: "sale" } },
  { label: "من نحن", to: "/about" as const },
  { label: "اتصل بنا", to: "/contact" as const },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex flex-col items-center leading-none ${className}`}>
      <img src="/logo-nihed.svg" alt="NIHED Fashion logo" className="h-24 w-24 md:h-28 md:w-28" />
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-brand text-2xl font-semibold text-foreground md:text-3xl">NIHED</span>
        <span className="font-brand text-[10px] text-primary md:text-xs">FASHION</span>
      </div>
    </Link>
  );
}

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q } });
    setOpen(false);
  };

  return (
    <>
      <div className="bg-blush text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <p className="truncate">
            التوصيل متوفر إلى جميع ولايات الجزائر <span className="mx-2 opacity-60">•</span>{" "}
            <span className="hidden sm:inline">منتجات أصلية وجودة عالية</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="TikTok" className="text-[10px] font-bold">
              TT
            </a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="القائمة">
              <Menu className="h-5 w-5" />
            </button>
            <form
              onSubmit={submit}
              className="hidden w-full max-w-xs items-center gap-2 rounded-full border bg-card px-4 py-2 lg:flex"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحثي عن منتج..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </form>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-4">
            <button className="hidden sm:block" aria-label="حسابي">
              <User className="h-5 w-5" />
            </button>
            <Link
              to="/shop"
              search={{ wish: true }}
              aria-label="المفضلة"
              className="hidden sm:block"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/cart" aria-label="السلة" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        <nav className="hidden border-t lg:block">
          <ul className="mx-auto flex max-w-7xl justify-center gap-8 px-4 py-3 text-sm">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  search={n.search as never}
                  className="transition-colors hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/30 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="h-full w-72 bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="إغلاق">
                <X />
              </button>
            </div>
            <form
              onSubmit={submit}
              className="mb-6 flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <Search className="h-4 w-4" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحثي عن منتج..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </form>
            <ul className="space-y-4">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link to={n.to} search={n.search as never} onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
