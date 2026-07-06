import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { FREE_SHIP_THRESHOLD } from "@/lib/shipping";

export type CartItem = {
  id: string;
  productId?: string;
  slug?: string;
  name: string;
  variant?: string;
  price: number; // INR base price
  img: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fawzaan-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      return;
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("fawzaan-cart", JSON.stringify(items));
    } catch {
      return;
    }
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items,
      isOpen,
      count,
      subtotal,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (item) => {
        setItems((prev) => {
          const existing = prev.find((p) => p.id === item.id);
          if (existing)
            return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + (item.qty ?? 1) } : p));
          return [...prev, { ...item, qty: item.qty ?? 1 }];
        });
        setIsOpen(true);
      },
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))),
      clear: () => setItems([]),
    };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
