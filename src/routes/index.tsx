import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Truck, ShieldCheck, Headphones, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import abaya from "@/assets/abaya.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NIHED FASHION — حجابات وملابس نسائية عصرية في الجزائر" },
      {
        name: "description",
        content:
          "اكتشفي حجابات وملابس نسائية محتشمة وإكسسوارات أنيقة مع التوصيل إلى جميع ولايات الجزائر.",
      },
      { property: "og:title", content: "NIHED FASHION — أناقتك... عنوانك" },
      {
        property: "og:description",
        content: "حجابات وملابس نسائية عصرية تجمع بين الأناقة والراحة.",
      },
    ],
  }),
  component: Home,
});

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        <div className="mx-auto mt-4 h-px w-16 bg-primary" />
      </div>
      {children}
    </section>
  );
}

const DemoNote = () => (
  <p className="mb-6 text-center text-xs text-muted-foreground">
    * بيانات تجريبية إلى حين إضافة المنتجات الحقيقية
  </p>
);

function Home() {
  const latest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <img
          src={hero}
          alt="عارضة ترتدي حجابًا ورديًا أنيقًا"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover object-[75%_center] opacity-40 md:opacity-100"
        />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4">
          <div className="max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-1000 md:mr-auto md:ml-0">
            <p className="font-brand mb-4 text-sm text-primary">NEW COLLECTION</p>
            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">أناقتك... عنوانك</h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              حجابات وملابس نسائية عصرية تجمع بين الأناقة والراحة
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-primary px-8 py-3 text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                تسوقي الآن
              </Link>
              <Link
                to="/shop"
                search={{ category: "new" }}
                className="rounded-full border border-foreground/30 bg-card/60 px-8 py-3 backdrop-blur transition hover:bg-card"
              >
                اكتشفي المجموعة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section title="تسوقي حسب القسم">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ category: c.id }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <span className="absolute inset-x-0 bottom-4 text-center font-bold text-background">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {[
          { i: BadgeCheck, t: "منتجات أصلية", d: "جودة مضمونة" },
          { i: Truck, t: "توصيل سريع", d: "إلى جميع ولايات الجزائر" },
          { i: ShieldCheck, t: "دفع آمن", d: "طرق دفع واضحة وموثوقة" },
          { i: Headphones, t: "خدمة الزبائن", d: "دعم ومساعدة في الاختيار" },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border bg-card p-6 text-center">
            <Icon className="mx-auto h-8 w-8 text-primary" strokeWidth={1.4} />
            <h3 className="mt-3 font-bold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <Section title="أحدث الإطلالات" subtitle="اكتشفي أجمل الموديلات الجديدة">
        <DemoNote />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {latest.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </Section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="grid overflow-hidden rounded-3xl bg-accent md:grid-cols-2">
          <div className="flex flex-col justify-center p-10 md:p-16">
            <h2 className="text-3xl font-bold md:text-4xl">جددي إطلالتك بلمسة من الأناقة</h2>
            <Link
              to="/shop"
              className="mt-8 w-fit rounded-full bg-primary px-8 py-3 text-primary-foreground"
            >
              اكتشفي المنتجات
            </Link>
          </div>
          <img
            src={abaya}
            alt="عباية عصرية"
            loading="lazy"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
      </section>

      <Section title="وصل حديثًا">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((p) => p.isNew)
            .map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
        </div>
      </Section>

      <Section title="الأكثر مبيعًا">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((p) => p.bestSeller)
            .map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
        </div>
      </Section>

      <Section title="آراء زبوناتنا" subtitle="أمثلة توضيحية — ليست آراء حقيقية موثّقة">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "الحجاب ناعم جدًا والألوان كما في الصور.",
            "التوصيل كان سريعًا والتغليف أنيق.",
            "العباية رائعة والقماش ممتاز.",
          ].map((t, i) => (
            <figure key={i} className="rounded-2xl border bg-card p-6">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4">«{t}»</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                زبونة (مثال توضيحي)
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
