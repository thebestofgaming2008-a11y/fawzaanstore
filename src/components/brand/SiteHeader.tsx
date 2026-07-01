import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Search, Heart, User } from "lucide-react";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useAccount } from "@/lib/account";
import { catalog } from "@/lib/products";

const nav = [
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/shemaghs", label: "Shemaghs" },
  { to: "/niqabs", label: "Niqabs" },
  { to: "/honey", label: "Honey" },
] as const;

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const dark = variant === "dark";
  const { count, open: openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { account } = useAccount();

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, searchOpen]);

  const results = q.trim().length > 1
    ? catalog.filter((p) => (p.name + " " + p.short + " " + p.collection).toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          dark ? "bg-ink/85 border-white/10 text-ivory" : "bg-ivory/85 border-border text-ink"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <button aria-label="Menu" className="md:hidden p-2 -ml-2" onClick={() => setOpen((o) => !o)}>
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

          <div className="flex items-center gap-0.5 md:flex-1 md:justify-end">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 hover:text-gold-deep">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/account" aria-label="Account" className="hidden sm:inline-flex p-2 hover:text-gold-deep">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" aria-label={`Wishlist, ${wishCount} items`} className="relative p-2 hover:text-gold-deep">
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-ink text-ivory text-[10px] font-bold flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>
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

        {/* Mobile drawer */}
        {open && (
          <div className={`md:hidden fixed inset-0 top-[57px] z-50 ${dark ? "bg-ink" : "bg-ivory"} animate-fade-up`}>
            <nav className="flex flex-col px-5 py-2">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-4 text-lg font-display border-b border-border/40 last:border-0 flex items-center justify-between"
                >
                  {n.label}
                  <span className="text-gold-deep">›</span>
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border/60 space-y-1">
                <Link to="/account" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm">
                  <User className="h-4 w-4" /> {account ? `Hi, ${account.firstName}` : "Sign in"}
                </Link>
                <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm">
                  <Heart className="h-4 w-4" /> Wishlist ({wishCount})
                </Link>
                <Link to="/faq" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm">
                  FAQ
                </Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm">
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm" role="dialog" aria-label="Search">
          <button className="absolute inset-0" aria-label="Close" onClick={() => setSearchOpen(false)} />
          <div className="relative bg-ivory shadow-elegant animate-fade-up">
            <div className="mx-auto max-w-3xl px-4 md:px-8 py-5">
              <div className="flex items-center gap-3 border-b border-ink/15 pb-3">
                <Search className="h-5 w-5 text-ink/60" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search shemaghs, niqabs, honey…"
                  className="flex-1 bg-transparent outline-none text-base placeholder:text-ink/40"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close" className="p-1"><X className="h-5 w-5" /></button>
              </div>
              {q.trim().length > 1 ? (
                results.length === 0 ? (
                  <p className="py-10 text-center text-ink/60 text-sm">No matches for “{q}”.</p>
                ) : (
                  <ul className="py-3 divide-y divide-ink/5">
                    {results.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/product/$slug"
                          params={{ slug: p.slug }}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 py-3 hover:bg-cream px-1 rounded-sm"
                        >
                          <img src={p.images[0]} alt="" className="h-14 w-12 object-cover bg-cream" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{p.name}</p>
                            <p className="text-xs text-ink/55 truncate">{p.short}</p>
                          </div>
                          <p className="text-sm">${p.price}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <div className="py-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-3">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {["Shemaghs", "Niqabs", "Sidr Honey", "Kufis", "Gloves"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setQ(t)}
                        className="text-xs px-3 py-1.5 rounded-full border border-ink/15 hover:border-ink hover:bg-ink hover:text-ivory transition"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
