// Central product catalog for Fawzaan Store.
// All routes/components read from here. Adding a new product = add to `catalog`.

import shemaghFront from "@/assets/shemagh-red-front.jpg";
import shemaghSide from "@/assets/shemagh-red-side.jpg";
import shemaghWrap from "@/assets/shemagh-red-wrap.jpg";
import shemaghBack from "@/assets/shemagh-red-back.jpg";
import shemaghFlat from "@/assets/shemagh-red-flat.jpg";
import shemaghHead from "@/assets/shemagh-red-head.jpg";
import kufiFront from "@/assets/kufi-white-front.jpg";
import kufiSide from "@/assets/kufi-white-side.jpg";
import niqabRedFront from "@/assets/niqab-red-front.jpg";
import niqabRedSide from "@/assets/niqab-red-side.jpg";
import niqabBlackFront from "@/assets/niqab-black-front.jpg";
import heroGloves from "@/assets/hero-gloves.jpg";
import heroHoney from "@/assets/hero-honey.jpg";

export type Collection = "shemaghs" | "niqabs" | "kufis" | "gloves" | "honey";
export type Gender = "men" | "women" | "unisex";

export type Variant = { name: string; swatch?: string };

export type Product = {
  slug: string;
  name: string;
  collection: Collection;
  gender: Gender;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  images: string[];
  colors?: Variant[];
  sizes?: string[];
  short: string;
  description: string;
  features: string[];
  materials: string;
  care: string;
  tag?: "Bestseller" | "New" | "Limited";
};

export const catalog: Product[] = [
  {
    slug: "classic-red-shemagh",
    name: "Classic Red Shemagh",
    collection: "shemaghs",
    gender: "men",
    price: 39,
    compareAt: 56,
    rating: 4.9,
    reviews: 1240,
    images: [shemaghFront, shemaghSide, shemaghWrap, shemaghBack, shemaghFlat, shemaghHead],
    colors: [
      { name: "Red / White", swatch: "#c2330c" },
      { name: "Black / White", swatch: "#000000" },
      { name: "Ivory", swatch: "#faf6ea" },
    ],
    sizes: ["Standard 130×130"],
    short: "Hand-loomed keffiyeh with heritage red pattern.",
    description:
      "Hand-loomed in 100% long-staple cotton with a tight herringbone weave and knotted tassels. A generous 130×130 cm cut wraps without slipping — the shemagh, honest as ever.",
    features: [
      "100% combed cotton, mid-weight",
      "Hand-knotted fringe tassels",
      "130 × 130 cm — wraps without slipping",
      "Colour-fast dye, machine washable cold",
    ],
    materials: "100% long-staple cotton.",
    care: "Machine wash cold, hang dry. Iron on low.",
    tag: "Bestseller",
  },
  {
    slug: "onyx-shemagh",
    name: "Onyx Shemagh",
    collection: "shemaghs",
    gender: "men",
    price: 42,
    rating: 4.8,
    reviews: 412,
    images: [shemaghSide, shemaghFront, shemaghFlat],
    colors: [
      { name: "Ink Black", swatch: "#000000" },
      { name: "Charcoal", swatch: "#2a2a2a" },
    ],
    sizes: ["Standard 130×130"],
    short: "Deep black weave — the everyday classic.",
    description: "Our darkest black shemagh — deeper than usual dye lots, with the same hand-loomed weave and hand-knotted fringe.",
    features: ["Deep-vat black dye", "Hand-knotted fringe", "130 × 130 cm", "Machine washable cold"],
    materials: "100% long-staple cotton.",
    care: "Machine wash cold, hang dry.",
    tag: "New",
  },
  {
    slug: "desert-sand-shemagh",
    name: "Desert Sand Shemagh",
    collection: "shemaghs",
    gender: "men",
    price: 39,
    rating: 4.9,
    reviews: 322,
    images: [shemaghWrap, shemaghHead, shemaghBack],
    colors: [{ name: "Sand", swatch: "#d8c9a3" }, { name: "Camel", swatch: "#b18e5c" }],
    sizes: ["Standard 130×130"],
    short: "Warm sand tones, the classic desert wrap.",
    description: "Traditional cross-woven pattern in warm sand tones. Breathable in summer, warm at night.",
    features: ["Breathable weave", "Hand-knotted fringe", "130 × 130 cm"],
    materials: "100% long-staple cotton.",
    care: "Machine wash cold, hang dry.",
  },
  {
    slug: "premium-niqab-black",
    name: "Premium Niqab — Onyx",
    collection: "niqabs",
    gender: "women",
    price: 34,
    compareAt: 44,
    rating: 4.9,
    reviews: 986,
    images: [niqabBlackFront],
    colors: [
      { name: "Onyx Black", swatch: "#000000" },
      { name: "Ink", swatch: "#111111" },
    ],
    sizes: ["One Size", "Long"],
    short: "Featherlight chiffon with a secure two-strap fit.",
    description:
      "Two-layer chiffon niqab with a soft nose-piece and adjustable ties. Breathable, opaque, and drapes without static.",
    features: ["Two-layer breathable chiffon", "Adjustable double-tie fit", "Soft nose-bridge", "Wrinkle-resistant"],
    materials: "Premium chiffon.",
    care: "Hand wash cold, hang dry.",
    tag: "Bestseller",
  },
  {
    slug: "premium-niqab-red",
    name: "Premium Niqab — Rouge",
    collection: "niqabs",
    gender: "women",
    price: 34,
    rating: 4.8,
    reviews: 214,
    images: [niqabRedFront, niqabRedSide],
    colors: [
      { name: "Rouge", swatch: "#a22222" },
      { name: "Wine", swatch: "#6b1b1b" },
    ],
    sizes: ["One Size", "Long"],
    short: "A quiet colour statement in premium chiffon.",
    description: "Same premium chiffon build as our onyx, in a rich rouge dye. Layered, breathable, and drapes softly.",
    features: ["Two-layer chiffon", "Adjustable ties", "Colour-fast"],
    materials: "Premium chiffon.",
    care: "Hand wash cold, hang dry.",
    tag: "New",
  },
  {
    slug: "white-kufi",
    name: "White Woven Kufi",
    collection: "kufis",
    gender: "men",
    price: 18,
    rating: 4.7,
    reviews: 148,
    images: [kufiFront, kufiSide],
    colors: [{ name: "Ivory White", swatch: "#f5f2ea" }],
    sizes: ["S", "M", "L"],
    short: "Breathable openwork kufi for daily wear.",
    description: "Openwork cotton kufi, hand-finished. Sits softly and holds shape all day.",
    features: ["Breathable openwork", "Cotton blend", "Holds shape"],
    materials: "Cotton blend.",
    care: "Hand wash cold, air dry flat.",
  },
  {
    slug: "leather-gloves",
    name: "Heritage Leather Gloves",
    collection: "gloves",
    gender: "unisex",
    price: 62,
    compareAt: 78,
    rating: 4.8,
    reviews: 96,
    images: [heroGloves],
    colors: [{ name: "Cognac", swatch: "#7a4a24" }, { name: "Black", swatch: "#000000" }],
    sizes: ["S", "M", "L", "XL"],
    short: "Full-grain leather, silk-lined.",
    description: "Full-grain leather gloves with a silk lining. Cut to move, warm without bulk.",
    features: ["Full-grain leather", "Silk lining", "Hand-stitched seams"],
    materials: "Full-grain leather, silk lining.",
    care: "Wipe with a soft dry cloth.",
  },
  {
    slug: "raw-sidr-honey-250",
    name: "Raw Sidr Honey · 250g",
    collection: "honey",
    gender: "unisex",
    price: 28,
    rating: 4.9,
    reviews: 621,
    images: [heroHoney],
    sizes: ["250g", "500g"],
    short: "Single-origin, unheated Sidr honey.",
    description: "Cold-extracted Sidr honey from a single highland origin. Never heated, never filtered.",
    features: ["Single-origin", "Cold-extracted", "Unfiltered"],
    materials: "Raw Sidr honey.",
    care: "Store cool and dry.",
    tag: "Limited",
  },
  {
    slug: "raw-acacia-honey-250",
    name: "Raw Acacia Honey · 250g",
    collection: "honey",
    gender: "unisex",
    price: 22,
    rating: 4.8,
    reviews: 187,
    images: [heroHoney],
    sizes: ["250g", "500g"],
    short: "Delicate, slow to crystallise.",
    description: "Light, floral acacia honey. Slow to crystallise, gentle on the palate.",
    features: ["Single-origin", "Cold-extracted"],
    materials: "Raw Acacia honey.",
    care: "Store cool and dry.",
  },
];

export function getProduct(slug: string) {
  return catalog.find((p) => p.slug === slug);
}
export function byCollection(c: Collection) {
  return catalog.filter((p) => p.collection === c);
}
export function byGender(g: Gender) {
  return catalog.filter((p) => p.gender === g || p.gender === "unisex");
}
export function related(slug: string, n = 4) {
  const p = getProduct(slug);
  if (!p) return [];
  return catalog.filter((x) => x.slug !== slug && x.collection === p.collection).slice(0, n);
}
