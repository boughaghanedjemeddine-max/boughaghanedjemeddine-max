import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Header";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="mt-24">
      <section className="bg-secondary">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">كوني أول من يكتشف جديدنا</h2>
          <p className="mt-2 text-muted-foreground">اشتركي لتصلك أحدث المجموعات والعروض</p>
          {done ? (
            <p className="mt-6 text-success">شكرًا لك! سنبقيك على اطلاع.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (/\S+@\S+\.\S+/.test(email)) setDone(true);
              }}
              className="mx-auto mt-6 flex max-w-md gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="flex-1 rounded-full border bg-card px-5 py-3 text-sm outline-none focus:border-primary"
              />
              <button className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90">
                اشتراك
              </button>
            </form>
          )}
        </div>
      </section>
      <div className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
          <div className="[&_span]:text-background">
            <div className="inline-block">
              <Logo />
            </div>
            <p className="mt-4 text-sm opacity-70">
              حجابات وملابس نسائية عصرية تجمع بين الأناقة والراحة، من الجزائر وإليها.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/">الرئيسية</Link>
              </li>
              <li>
                <Link to="/shop">المتجر</Link>
              </li>
              <li>
                <Link to="/about">من نحن</Link>
              </li>
              <li>
                <Link to="/contact">اتصل بنا</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">الأقسام</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/shop" search={{ category: "hijabs" }}>
                  الحجابات
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ category: "clothing" }}>
                  الملابس النسائية
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ category: "accessories" }}>
                  الإكسسوارات
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ category: "sale" }}>
                  التخفيضات
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">تواصلي معنا</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li dir="ltr" className="text-right">
                +213 000 00 00 00 (تجريبي)
              </li>
              <li>hello@nihed.store</li>
              <li>
                <Link to="/contact">سياسة التوصيل والإرجاع</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="border-t border-background/10 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} NIHED STORE. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
