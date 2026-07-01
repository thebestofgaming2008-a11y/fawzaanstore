import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  items: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  count: number;
};

const WishlistCtx = createContext<Ctx | null>(null);
const KEY = "fawzaan-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const value = useMemo<Ctx>(() => ({
    items,
    has: (s) => items.includes(s),
    toggle: (s) => setItems((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]),
    remove: (s) => setItems((prev) => prev.filter((x) => x !== s)),
    count: items.length,
  }), [items]);

  return <WishlistCtx.Provider value={value}>{children}</WishlistCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
