import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/shemaghs", label: "Shemaghs" },
  { to: "/niqabs", label: "Niqabs" },
  { to: "/gloves", label: "Gloves" },
  { to: "/honey", label: "Honey" },
] as const;

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const dark = variant === "dark";
  const { count, open: openCart } = useCart();

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b ${
        dark
          ? "bg-ink/85 border-white/10 text-ivory"
          : "bg-ivory/85 border-border text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <button
          aria-label="Menu"
          className="md:hidden p-2 -ml-2"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex items-center gap-2 group md:flex-1">
          <img
            src={logo.url}
            alt="Fawzaan Store"
            width={36}
            height={36}
            className={`h-9 w-9 rounded-full ${dark ? "bg-ivory" : "bg-cream"} shadow-soft`}
          />
          <span className="font-display text-lg md:text-2xl tracking-wide leading-none">
            Fawzaan<span className="text-gold">.</span>store
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 md:flex-1 md:justify-center">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium tracking-wide hover:text-gold-deep transition-colors"
              activeProps={{ className: "text-gold-deep" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:flex-1 md:justify-end">
          <button aria-label="Search" className="hidden md:inline-flex p-2 hover:text-gold-deep">
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label={`Cart, ${count} items`}
            onClick={openCart}
            className="relative inline-flex items-center gap-2 p-2 hover:text-gold-deep"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-ink text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden border-t ${dark ? "border-white/10 bg-ink" : "border-border bg-ivory"}`}>
          <nav className="flex flex-col px-5 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3.5 text-base font-medium border-b border-border/40 last:border-0 flex items-center justify-between"
              >
                {n.label}
                <span className="text-gold-deep">›</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
