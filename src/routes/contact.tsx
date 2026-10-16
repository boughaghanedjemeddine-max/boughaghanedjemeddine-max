import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا — NIHED FASHION" },
      {
        name: "description",
        content: "تواصلي مع فريق نهاد فاشن وتعرّفي على سياسة التوصيل والإرجاع.",
      },
      { property: "og:title", content: "اتصل بنا — NIHED FASHION" },
      { property: "og:description", content: "معلومات التواصل وسياسات المتجر." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">اتصل بنا</h1>
      <div className="mt-8 space-y-2 rounded-2xl border bg-card p-6">
        <p dir="ltr" className="text-right">
          +213 000 00 00 00
        </p>
        <p>contact@nihedfashion.dz</p>
        <p className="text-xs text-muted-foreground">
          معلومات تجريبية — ستُستبدل بمعلوماتكم الحقيقية
        </p>
      </div>
      <h2 className="mt-12 text-2xl font-bold">سياسة التوصيل والإرجاع</h2>
      <p className="mt-4 leading-loose text-muted-foreground">
        نوصل إلى جميع ولايات الجزائر الـ58. يختلف سعر ومدة التوصيل حسب الولاية ويظهر عند إتمام
        الطلب. يمكن طلب الإرجاع وفق الشروط التي سيحددها المتجر.
      </p>
    </div>
  ),
});
