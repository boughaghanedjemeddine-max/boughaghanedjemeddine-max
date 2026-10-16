// بيانات تجريبية — استبدليها بالمخزون الحقيقي لاحقًا
import hijab from "@/assets/hijab.jpg";
import abaya from "@/assets/abaya.jpg";
import bag from "@/assets/bag.jpg";
import hero from "@/assets/hero.jpg";

export type CategoryId = "hijabs" | "clothing" | "accessories" | "sale" | "new";

export const categories: { id: CategoryId; name: string; image: string }[] = [
  { id: "hijabs", name: "الحجابات", image: hijab },
  { id: "clothing", name: "الملابس النسائية", image: abaya },
  { id: "accessories", name: "الإكسسوارات", image: bag },
  { id: "sale", name: "التخفيضات", image: hero },
  { id: "new", name: "مجموعات جديدة", image: abaya },
];

export type Color = { name: string; hex: string };

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  material: string;
  category: Exclude<CategoryId, "sale" | "new">;
  price: number;
  salePrice?: number;
  images: string[];
  colors: Color[];
  sizes?: string[];
  stock: number;
  popularity: number;
  createdAt: string;
  isNew?: boolean;
  bestSeller?: boolean;
  active: boolean;
};

const rose = { name: "وردي غامق", hex: "#b98a83" };
const beige = { name: "بيج", hex: "#d8c3a8" };
const blush = { name: "وردي فاتح", hex: "#f1d4d2" };
const brown = { name: "بني", hex: "#7a5a48" };
const ivory = { name: "عاجي", hex: "#f3ece0" };

export const products: Product[] = [
  {
    id: "chiffon-luxe",
    sku: "NF-H-001",
    name: "حجاب شيفون فاخر",
    description: "حجاب شيفون خفيف وانسيابي بلمسة فاخرة، مثالي للمناسبات والاستعمال اليومي.",
    material: "شيفون عالي الجودة",
    category: "hijabs",
    price: 2500,
    salePrice: 1990,
    images: [hijab, hero],
    colors: [rose, beige, blush],
    stock: 24,
    popularity: 95,
    createdAt: "2026-10-01",
    isNew: true,
    bestSeller: true,
    active: true,
  },
  {
    id: "crepe-soft",
    sku: "NF-H-002",
    name: "حجاب كريب ناعم",
    description: "حجاب كريب ناعم لا ينزلق، يمنحك إطلالة مرتبة طوال اليوم.",
    material: "كريب",
    category: "hijabs",
    price: 1800,
    images: [hijab],
    colors: [beige, brown, ivory],
    stock: 40,
    popularity: 88,
    createdAt: "2026-09-20",
    bestSeller: true,
    active: true,
  },
  {
    id: "khimar-elegant",
    sku: "NF-H-003",
    name: "خمار أنيق",
    description: "خمار طويل بقصة أنيقة يوفر تغطية كاملة وراحة.",
    material: "جيرسي ناعم",
    category: "hijabs",
    price: 3200,
    images: [hero, hijab],
    colors: [rose, brown],
    stock: 3,
    popularity: 70,
    createdAt: "2026-10-08",
    isNew: true,
    active: true,
  },
  {
    id: "modest-set",
    sku: "NF-C-001",
    name: "طقم نسائي محتشم",
    description: "طقم من قطعتين بقصة واسعة مريحة وأنيقة.",
    material: "قطن ممزوج بالكتان",
    category: "clothing",
    price: 7500,
    salePrice: 6400,
    images: [abaya, hero],
    colors: [beige, ivory],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    popularity: 80,
    createdAt: "2026-10-05",
    isNew: true,
    active: true,
  },
  {
    id: "modern-abaya",
    sku: "NF-C-002",
    name: "عباية عصرية",
    description: "عباية عصرية بتطريز ناعم على الأكمام، مناسبة للمناسبات.",
    material: "نيدا",
    category: "clothing",
    price: 9800,
    images: [abaya],
    colors: [beige, brown],
    sizes: ["M", "L", "XL"],
    stock: 8,
    popularity: 92,
    createdAt: "2026-09-28",
    bestSeller: true,
    active: true,
  },
  {
    id: "elegant-bag",
    sku: "NF-A-001",
    name: "حقيبة نسائية أنيقة",
    description: "حقيبة يد بتصميم كلاسيكي وإكسسوارات ذهبية.",
    material: "جلد صناعي فاخر",
    category: "accessories",
    price: 5200,
    images: [bag],
    colors: [rose, beige],
    stock: 0,
    popularity: 75,
    createdAt: "2026-09-15",
    active: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
export const formatDZD = (n: number) => `${n.toLocaleString("en-US")} دج`;
