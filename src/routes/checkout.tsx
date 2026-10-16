import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatDZD } from "@/lib/products";
import { wilayas, FREE_DELIVERY_THRESHOLD } from "@/lib/wilayas";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب — NIHED FASHION" },
      { name: "description", content: "أدخلي معلومات التوصيل لإتمام طلبك." },
      { property: "og:title", content: "إتمام الطلب — NIHED FASHION" },
      { property: "og:description", content: "صفحة إتمام الطلب." },
    ],
  }),
  component: Checkout,
});

const PHONE = /^0[567]\d{8}$/;

function Checkout() {
  const { items, subtotal } = useCart();
  const [f, setF] = useState({
    name: "",
    phone: "",
    wilaya: "",
    commune: "",
    address: "",
    notes: "",
    delivery: "home",
    payment: "cod",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const w = wilayas.find((x) => String(x.code) === f.wilaya);
  const fee = !w
    ? 0
    : subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : f.delivery === "home"
        ? w.homeFee
        : w.deskFee;
  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<"name" | "phone" | "wilaya" | "commune" | "address", string>> = {};
    if (!f.name.trim()) er.name = "الاسم مطلوب";
    if (!PHONE.test(f.phone.replace(/\s/g, "")))
      er.phone = "رقم هاتف جزائري غير صالح (مثال: 0550123456)";
    if (!f.wilaya) er.wilaya = "اختاري الولاية";
    if (!f.commune.trim()) er.commune = "البلدية مطلوبة";
    if (!f.address.trim()) er.address = "العنوان مطلوب";
    setErrors(er);
    if (Object.keys(er).length) return;
    setSubmitError("لم يتم تفعيل نظام حفظ الطلبات بعد. لم يُرسل طلبك — يرجى المحاولة لاحقًا.");
  };

  if (items.length === 0)
    return (
      <div className="py-24 text-center">
        <p>سلتك فارغة.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-primary-foreground"
        >
          متابعة التسوق
        </Link>
      </div>
    );

  const input =
    "w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:border-primary";
  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[1fr_320px]"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">إتمام الطلب</h1>
        <div>
          <input
            className={input}
            placeholder="الاسم واللقب"
            value={f.name}
            onChange={set("name")}
          />
          <Err k="name" />
        </div>
        <div>
          <input
            className={input}
            placeholder="رقم الهاتف"
            inputMode="tel"
            dir="ltr"
            style={{ textAlign: "right" }}
            value={f.phone}
            onChange={set("phone")}
          />
          <Err k="phone" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <select className={input} value={f.wilaya} onChange={set("wilaya")}>
              <option value="">الولاية</option>
              {wilayas.map((x) => (
                <option key={x.code} value={x.code}>
                  {x.code} - {x.name}
                </option>
              ))}
            </select>
            <Err k="wilaya" />
          </div>
          <div>
            <input
              className={input}
              placeholder="البلدية"
              value={f.commune}
              onChange={set("commune")}
            />
            <Err k="commune" />
          </div>
        </div>
        <div>
          <input
            className={input}
            placeholder="العنوان بالتفصيل"
            value={f.address}
            onChange={set("address")}
          />
          <Err k="address" />
        </div>
        <textarea
          className={input}
          rows={3}
          placeholder="ملاحظات إضافية"
          value={f.notes}
          onChange={set("notes")}
        />
        <fieldset className="rounded-2xl border bg-card p-4">
          <legend className="px-2 text-sm font-bold">طريقة التوصيل</legend>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              className="accent-primary"
              checked={f.delivery === "home"}
              onChange={() => setF({ ...f, delivery: "home" })}
            />{" "}
            إلى المنزل {w && `(${formatDZD(w.homeFee)})`}
          </label>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="radio"
              className="accent-primary"
              checked={f.delivery === "desk"}
              onChange={() => setF({ ...f, delivery: "desk" })}
            />{" "}
            نقطة الاستلام {w && `(${formatDZD(w.deskFee)})`}
          </label>
        </fieldset>
        <fieldset className="rounded-2xl border bg-card p-4">
          <legend className="px-2 text-sm font-bold">طريقة الدفع</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" className="accent-primary" checked readOnly /> الدفع عند الاستلام
          </label>
        </fieldset>
      </div>
      <aside className="h-fit space-y-3 rounded-2xl border bg-card p-6 text-sm">
        <div className="flex justify-between">
          <span>المجموع الفرعي</span>
          <span>{formatDZD(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>التوصيل</span>
          <span>{w ? (fee === 0 ? "مجاني" : formatDZD(fee)) : "—"}</span>
        </div>
        {w && <p className="text-xs text-muted-foreground">المدة التقديرية: {w.days}</p>}
        <div className="flex justify-between border-t pt-3 text-base font-bold">
          <span>الإجمالي</span>
          <span className="text-primary">{formatDZD(subtotal + fee)}</span>
        </div>
        <button className="w-full rounded-full bg-primary py-3 text-primary-foreground">
          تأكيد الطلب
        </button>
        {submitError && (
          <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive">
            {submitError}
          </p>
        )}
      </aside>
    </form>
  );
}
