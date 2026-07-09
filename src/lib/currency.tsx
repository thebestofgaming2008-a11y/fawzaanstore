import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Base prices in products.ts are in INR (₹).
export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

type Rate = { symbol: string; rate: number; label: string };
export const CURRENCIES: Record<CurrencyCode, Rate> = {
  INR: { symbol: "₹", rate: 1, label: "Indian Rupee" },
  USD: { symbol: "$", rate: 0.012, label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.011, label: "Euro" },
  GBP: { symbol: "£", rate: 0.0095, label: "Pound Sterling" },
  AED: { symbol: "د.إ", rate: 0.044, label: "UAE Dirham" },
};

type Ctx = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (inr: number) => string;
  symbol: string;
};

const CurrencyCtx = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fawzaan-currency") as CurrencyCode | null;
      if (raw && CURRENCIES[raw]) setCurrency(raw);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("fawzaan-currency", currency); } catch {}
  }, [currency]);

  const value = useMemo<Ctx>(() => {
    const { symbol, rate } = CURRENCIES[currency];
    const format = (inr: number) => {
      const v = inr * rate;
      const digits = currency === "INR" ? 0 : 2;
      return `${symbol}${v.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
    };
    return { currency, setCurrency, format, symbol };
  }, [currency]);

  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
