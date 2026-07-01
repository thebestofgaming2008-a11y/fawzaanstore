// Frontend-only mock account. Persisted to localStorage.
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Account = {
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  orders: Order[];
};

export type Address = {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
};

export type OrderItem = { name: string; variant?: string; qty: number; price: number; img: string };
export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  items: OrderItem[];
  total: number;
  address: Address;
};

type Ctx = {
  account: Account | null;
  signIn: (email: string) => Account;
  signUp: (email: string, firstName: string, lastName: string) => Account;
  signOut: () => void;
  update: (patch: Partial<Account>) => void;
  addAddress: (a: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  addOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
};

const AccCtx = createContext<Ctx | null>(null);
const KEY = "fawzaan-account";

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setAccount(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    try {
      if (account) localStorage.setItem(KEY, JSON.stringify(account));
      else localStorage.removeItem(KEY);
    } catch {}
  }, [account]);

  const value = useMemo<Ctx>(() => ({
    account,
    signIn: (email) => {
      const a: Account = account && account.email === email ? account : {
        email, firstName: email.split("@")[0], lastName: "",
        addresses: [], orders: [],
      };
      setAccount(a);
      return a;
    },
    signUp: (email, firstName, lastName) => {
      const a: Account = { email, firstName, lastName, addresses: [], orders: [] };
      setAccount(a);
      return a;
    },
    signOut: () => setAccount(null),
    update: (patch) => setAccount((prev) => prev ? { ...prev, ...patch } : prev),
    addAddress: (a) => setAccount((prev) => prev ? {
      ...prev,
      addresses: [...prev.addresses.map((x) => a.isDefault ? { ...x, isDefault: false } : x), { ...a, id: crypto.randomUUID() }],
    } : prev),
    removeAddress: (id) => setAccount((prev) => prev ? { ...prev, addresses: prev.addresses.filter((a) => a.id !== id) } : prev),
    addOrder: (o) => {
      const order: Order = { ...o, id: "FZ-" + Math.random().toString(36).slice(2, 8).toUpperCase(), date: new Date().toISOString(), status: "Processing" };
      setAccount((prev) => prev ? { ...prev, orders: [order, ...prev.orders] } : prev);
      return order;
    },
  }), [account]);

  return <AccCtx.Provider value={value}>{children}</AccCtx.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccCtx);
  if (!ctx) throw new Error("useAccount must be used inside AccountProvider");
  return ctx;
}
