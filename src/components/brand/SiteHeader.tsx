import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import logo from "@/assets/fawzaan-logo.png.asset.json";

const nav = [
  { to: "/shemaghs", label: "Shemaghs" },
  { to: "/niqabs", label: "Niqabs" },
  { to: "/gloves", label: "Gloves" },
  { to: "/honey", label: "Honey" },
] as const;

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const dark = variant === "dark";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        dark
          ? "bg-ink/80 border-white/10 text-ivory"
          : "bg-ivory/80 border-border text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo.url}
            alt="Fawzaan Store"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-ivory shadow-soft"
          />
          <span className="font-display text-xl md:text-2xl tracking-wide">
            Fawzaan <span className="text-gold">Store</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium tracking-wide hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Cart"
            className={`hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              dark ? "bg-gold text-ink hover:bg-gold-soft" : "bg-ink text-ivory hover:bg-ink/85"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Shop</span>
          </button>
          <button
            aria-label="Menu"
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden border-t ${dark ? "border-white/10 bg-ink" : "border-border bg-ivory"}`}>
          <nav className="flex flex-col px-5 py-4 gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium border-b border-border/40 last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
