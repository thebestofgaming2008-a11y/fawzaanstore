import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "SAR"
  | "CAD"
  | "AUD"
  | "SGD"
  | "MYR"
  | "QAR"
  | "KWD"
  | "ZAR";

type CurrencyMeta = { symbol: string; label: string };
export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  INR: { symbol: "\u20b9", label: "Indian Rupee" },
  USD: { symbol: "$", label: "US Dollar" },
  EUR: { symbol: "\u20ac", label: "Euro" },
  GBP: { symbol: "\u00a3", label: "Pound Sterling" },
  AED: { symbol: "\u062f.\u0625", label: "UAE Dirham" },
  SAR: { symbol: "\ufdfc", label: "Saudi Riyal" },
  CAD: { symbol: "$", label: "Canadian Dollar" },
  AUD: { symbol: "$", label: "Australian Dollar" },
  SGD: { symbol: "$", label: "Singapore Dollar" },
  MYR: { symbol: "RM", label: "Malaysian Ringgit" },
  QAR: { symbol: "\ufdfc", label: "Qatari Riyal" },
  KWD: { symbol: "\u062f.\u0643", label: "Kuwaiti Dinar" },
  ZAR: { symbol: "R", label: "South African Rand" },
};
type RateSource = "fallback" | "exchangerate-api.com";
type RatesResponse = {
  rates?: Record<string, number>;
  source?: RateSource;
  fetchedAt?: string;
  error?: string | null;
};
type GeoResponse = { country?: string; currency?: string };

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  format: (amountInr: number | null | undefined) => string;
  symbol: string;
  detectedCountry: string | null;
  rateSource: RateSource;
  rateError: string | null;
};

const CurrencyCtx = createContext<CurrencyContextValue | null>(null);
const STORAGE_KEY = "fawzaan-currency";
const MANUAL_KEY = "fawzaan-currency-manual";
const COUNTRY_KEY = "fawzaan-country";

function supportedCurrency(value: unknown): CurrencyCode {
  const next = String(value ?? "").trim().toUpperCase();
  return next in CURRENCIES ? (next as CurrencyCode) : "INR";
}

function readStoredCurrency() {
  if (typeof window === "undefined") return "INR";
  return supportedCurrency(window.localStorage.getItem(STORAGE_KEY));
}

function hasManualCurrency() {
  return typeof window !== "undefined" && window.localStorage.getItem(MANUAL_KEY) === "1";
}

function cleanRates(payload: RatesResponse | null | undefined) {
  if (payload?.source !== "exchangerate-api.com") return { INR: 1 };
  const source = payload.rates ?? {};
  return Object.keys(CURRENCIES).reduce<Record<string, number>>(
    (acc, code) => {
      const rate = Number(source[code]);
      if (Number.isFinite(rate) && rate > 0) acc[code] = rate;
      return acc;
    },
    { INR: 1 },
  );
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(readStoredCurrency);
  const [rates, setRates] = useState<Record<string, number>>({ INR: 1 });
  const [detectedCountry, setDetectedCountry] = useState<string | null>(() =>
    typeof window === "undefined" ? null : window.localStorage.getItem(COUNTRY_KEY),
  );
  const [rateSource, setRateSource] = useState<RateSource>("fallback");
  const [rateError, setRateError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rates", { headers: { accept: "application/json" }, cache: "no-store" })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`Rates lookup failed (${res.status})`)),
      )
      .then((data: RatesResponse) => {
        if (cancelled) return;
        setRates(cleanRates(data));
        setRateSource(data.source === "exchangerate-api.com" ? "exchangerate-api.com" : "fallback");
        setRateError(
          data.source === "exchangerate-api.com"
            ? null
            : data.error || "Live exchange rates are unavailable.",
        );
      })
      .catch((error) => {
        if (cancelled) return;
        setRates({ INR: 1 });
        setRateSource("fallback");
        setRateError(error instanceof Error ? error.message : "Could not load live exchange rates.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (hasManualCurrency()) return;
    let cancelled = false;
    fetch("/api/geo", { headers: { accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Geo lookup failed"))))
      .then((data: GeoResponse) => {
        if (cancelled) return;
        const nextCurrency = supportedCurrency(data.currency);
        const nextCountry = String(data.country ?? "").trim().toUpperCase() || null;
        setCurrencyState(nextCurrency);
        setDetectedCountry(nextCountry);
        window.localStorage.setItem(STORAGE_KEY, nextCurrency);
        if (nextCountry) window.localStorage.setItem(COUNTRY_KEY, nextCountry);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    const clean = supportedCurrency(next);
    setCurrencyState(clean);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, clean);
      window.localStorage.setItem(MANUAL_KEY, "1");
    }
  }, []);

  const format = useCallback(
    (amountInr: number | null | undefined) => {
      const amount = Number(amountInr);
      if (!Number.isFinite(amount)) return "\u20b90";
      const rate = rates[currency];
      if (!Number.isFinite(rate) || rate <= 0) {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(amount);
      }
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "INR" ? 0 : 2,
      }).format(amount * rate);
    },
    [currency, rates],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      format,
      symbol: CURRENCIES[currency].symbol,
      detectedCountry,
      rateSource,
      rateError,
    }),
    [currency, detectedCountry, format, rateError, rateSource, setCurrency],
  );

  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
