import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, effectivePrice } from "./products";

export type CartItem = {
  productId: string;
  color?: string | undefined;
  size?: string | undefined;
  qty: number;
};
type Ctx = {
  items: CartItem[];
  wishlist: string[];
  add: (i: CartItem) => void;
  update: (idx: number, qty: number) => void;
  remove: (idx: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("nf-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("nf-wish") || "[]"));
    } catch (error) {
      console.warn("Failed to parse saved cart or wishlist data.", error);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem("nf-cart", JSON.stringify(items));
  }, [items, loaded]);
  useEffect(() => {
    if (loaded) localStorage.setItem("nf-wish", JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  const stockOf = (id: string) => getProduct(id)?.stock ?? 0;
  const add = (i: CartItem) =>
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.productId === i.productId && p.color === i.color && p.size === i.size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx]!, qty: Math.min(stockOf(i.productId), next[idx]!.qty + i.qty) };
        return next;
      }
      return [...prev, { ...i, qty: Math.min(stockOf(i.productId), i.qty) }];
    });
  const update = (idx: number, qty: number) =>
    setItems((prev) =>
      prev.map((p, i) =>
        i === idx ? { ...p, qty: Math.max(1, Math.min(stockOf(p.productId), qty)) } : p,
      ),
    );
  const remove = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const toggleWish = (id: string) =>
    setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => {
    const p = getProduct(i.productId);
    return s + (p ? effectivePrice(p) * i.qty : 0);
  }, 0);

  return (
    <CartCtx.Provider
      value={{
        items,
        wishlist,
        add,
        update,
        remove,
        clear: () => setItems([]),
        toggleWish,
        count,
        subtotal,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
