import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, Search, Heart, User, ChevronDown, LogOut, Package } from "lucide-react";
import logo from "@/assets/fawzaan-logo.png.asset.json";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useAccount } from "@/lib/account";
import { useCurrency, CURRENCIES, type CurrencyCode } from "@/lib/currency";
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
  const [utilOpen, setUtilOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = variant === "dark";
  const { count, open: openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { account } = useAccount();
  const { currency, setCurrency, format } = useCurrency();
  const utilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!utilOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (utilRef.current && !utilRef.current.contains(e.target as Node)) setUtilOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [utilOpen]);

  const results = q.trim().length > 1
    ? catalog.filter((p) => (p.name + " " + p.short + " " + p.collection).toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-500 ${
          dark ? "bg-ink/85 border-white/10 text-ivory" : "text-ink"
        } ${
          dark
            ? ""
            : scrolled
              ? "bg-ivory/95 border-ink/10 shadow-soft"
              : "bg-ivory/70 border-transparent"
        }`}
      >
        {/* Animated gold hairline that grows as user scrolls */}
        {!dark && (
          <span
            aria-hidden
            className={`absolute left-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700 ${
              scrolled ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          />
        )}
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 transition-all duration-500 ${scrolled ? "py-2 md:py-2.5" : "py-3 md:py-4"}`}>
          <button aria-label="Menu" className="md:hidden p-2 -ml-2 hover:text-gold-deep transition" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" aria-label="Fawzaan Store — home" className="flex items-center group md:flex-1">
            <img
              src={logo.url}
              alt="Fawzaan Store"
              width={220}
              height={94}
              className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7 md:flex-1 md:justify-center">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative text-sm font-medium tracking-wide hover:text-gold-deep transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-gold-deep after:transition-all hover:after:w-full"
                activeProps={{ className: "text-gold-deep" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 md:flex-1 md:justify-end">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 hover:text-gold-deep transition">
              <Search className="h-5 w-5" />
            </button>

            {/* Currency + Account combined popover */}
            <div className="relative" ref={utilRef}>
              <button
                onClick={() => setUtilOpen((o) => !o)}
                aria-label="Currency and account"
                aria-expanded={utilOpen}
                className="flex items-center gap-1 p-2 hover:text-gold-deep transition text-xs font-semibold uppercase tracking-widest"
              >
                <span className="hidden sm:inline">{currency}</span>
                <User className="h-5 w-5 sm:hidden" />
                <ChevronDown className={`h-3 w-3 transition-transform ${utilOpen ? "rotate-180" : ""}`} />
              </button>

              {utilOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-ivory text-ink shadow-elegant border border-border rounded-sm overflow-hidden animate-scale-in origin-top-right">
                  {/* Currency selector */}
                  <div className="px-4 pt-4 pb-3 border-b border-border/60">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-2">Currency</p>
                    <div className="grid grid-cols-5 gap-1">
                      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCurrency(c)}
                          className={`py-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-sm transition ${
                            c === currency ? "bg-ink text-ivory" : "hover:bg-cream"
                          }`}
                          title={CURRENCIES[c].label}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[10px] text-ink/45">Sample · {format(1000)}</p>
                  </div>

                  {/* Account section */}
                  <div className="px-4 py-3">
                    {account ? (
                      <>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50">Signed in as</p>
                        <p className="mt-0.5 font-display text-lg leading-tight">{account.firstName || account.email}</p>
                        <p className="text-xs text-ink/55 truncate">{account.email}</p>
                        <div className="mt-3 grid gap-1">
                          <Link to="/account" onClick={() => setUtilOpen(false)} className="flex items-center gap-2 py-2 text-sm hover:text-gold-deep transition">
                            <User className="h-4 w-4" /> My account
                          </Link>
                          <Link to="/account" onClick={() => setUtilOpen(false)} className="flex items-center gap-2 py-2 text-sm hover:text-gold-deep transition">
                            <Package className="h-4 w-4" /> Orders
                          </Link>
                          <Link to="/wishlist" onClick={() => setUtilOpen(false)} className="flex items-center gap-2 py-2 text-sm hover:text-gold-deep transition">
                            <Heart className="h-4 w-4" /> Wishlist ({wishCount})
                          </Link>
                          <button
                            onClick={() => { signOut(); setUtilOpen(false); }}
                            className="flex items-center gap-2 py-2 text-sm text-ink/70 hover:text-ink transition"
                          >
                            <LogOut className="h-4 w-4" /> Sign out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-lg leading-tight">Welcome</p>
                        <p className="text-xs text-ink/60">Sign in for a faster checkout.</p>
                        <Link
                          to="/account"
                          onClick={() => setUtilOpen(false)}
                          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-ink text-ivory px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-gold-deep transition"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setUtilOpen(false)}
                          className="mt-2 w-full inline-flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-widest border-b border-ink/10 hover:text-gold-deep transition"
                        >
                          <Heart className="h-3.5 w-3.5" /> Wishlist ({wishCount})
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link to="/wishlist" aria-label={`Wishlist, ${wishCount} items`} className="relative p-2 hover:text-gold-deep transition hidden sm:inline-flex">
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
              className="relative inline-flex items-center gap-2 p-2 hover:text-gold-deep transition"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-ink text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — slides from LEFT, fully opaque */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-ivory text-ink shadow-elegant flex flex-col transform transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <span className="font-display text-xl">Menu</span>
            <button aria-label="Close" onClick={() => setOpen(false)} className="p-2 -mr-2 hover:bg-cream rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-2">
            {nav.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="py-4 text-lg font-display border-b border-border/40 flex items-center justify-between animate-fade-up"
              >
                {n.label}
                <span className="text-gold-deep">›</span>
              </Link>
            ))}
            <Link to="/gloves" onClick={() => setOpen(false)} className="py-4 text-lg font-display border-b border-border/40 flex items-center justify-between">
              Gloves <span className="text-gold-deep">›</span>
            </Link>
            <Link to="/kufis" onClick={() => setOpen(false)} className="py-4 text-lg font-display border-b border-border/40 flex items-center justify-between">
              Kufis <span className="text-gold-deep">›</span>
            </Link>

            <div className="pt-4 mt-4 border-t border-border/60 space-y-1">
              <Link to="/account" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm hover:text-gold-deep transition">
                <User className="h-4 w-4" /> {account ? `Hi, ${account.firstName || "friend"}` : "Sign in"}
              </Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm hover:text-gold-deep transition">
                <Heart className="h-4 w-4" /> Wishlist ({wishCount})
              </Link>
              <Link to="/faq" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm hover:text-gold-deep transition">
                FAQ
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-sm hover:text-gold-deep transition">
                Contact
              </Link>
            </div>
          </nav>
          <div className="px-5 py-4 border-t border-border bg-cream/60">
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-2">Currency</p>
            <div className="flex flex-wrap gap-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-sm transition ${
                    c === currency ? "bg-ink text-ivory" : "bg-ivory hover:bg-ink hover:text-ivory"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm animate-fade-in" role="dialog" aria-label="Search">
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
                          className="flex items-center gap-4 py-3 hover:bg-cream px-1 rounded-sm transition"
                        >
                          <img src={p.images[0]} alt="" className="h-14 w-12 object-cover bg-cream" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{p.name}</p>
                            <p className="text-xs text-ink/55 truncate">{p.short}</p>
                          </div>
                          <p className="text-sm">{format(p.price)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <div className="py-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-3">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {["Shemaghs", "Niqabs", "Kashmir Honey", "Kufis", "Gloves"].map((t) => (
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
