import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, Search, Heart, User, ChevronDown, LogOut, Package } from "lucide-react";
import logoMark from "@/assets/fawzaan-logo-mark.png";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useAccount } from "@/lib/account";
import { useCurrency, CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { catalog } from "@/lib/products";

const primaryNav = [
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/about", label: "Heritage" },
] as const;

const collectionNav = [
  { to: "/shemaghs", label: "Shemaghs" },
  { to: "/niqabs", label: "Niqabs" },
  { to: "/kufis", label: "Kufis" },
  { to: "/gloves", label: "Gloves" },
  { to: "/honey", label: "Honey" },
] as const;

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = variant === "dark";
  const { count, open: openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { account, signOut } = useAccount();
  const { currency, setCurrency, format } = useCurrency();
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!accountOpen) return;
    const onDoc = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [accountOpen]);

  const results =
    q.trim().length > 1
      ? catalog
          .filter((p) =>
            `${p.name} ${p.short} ${p.collection}`.toLowerCase().includes(q.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${
          dark
            ? "border-white/10 bg-ink/86 text-ivory"
            : scrolled
              ? "border-ink/10 bg-ivory/96 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              : "border-transparent bg-ivory/84 text-ink"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 md:px-8 md:py-4">
          <div className="flex items-center">
            <button
              aria-label="Menu"
              className="p-2 -ml-2 transition hover:text-gold-deep md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <nav className="hidden items-center gap-8 md:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[12px] font-semibold uppercase tracking-[0.22em] text-current/72 transition hover:text-gold-deep"
                  activeProps={{ className: "text-gold-deep" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" aria-label="Fawzaan Store - home" className="group flex items-center justify-center gap-2">
            <img
              src={logoMark}
              alt="Fawzaan Store"
              width={112}
              height={112}
              className={`h-8 w-8 rounded-full object-contain ring-1 ring-gold/20 transition duration-300 group-hover:ring-gold/60 md:h-10 md:w-10 ${
                dark ? "brightness-0 invert" : ""
              }`}
            />
            <span className="font-display text-[24px] leading-none tracking-[0.02em] md:text-[30px]">
              Fawzaan<span className="text-gold">.</span>store
            </span>
          </Link>

          <div className="flex items-center justify-end gap-1">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="p-2 transition hover:text-gold-deep"
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((value) => !value)}
                aria-label="Account and currency"
                aria-expanded={accountOpen}
                className="hidden items-center gap-1 p-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:text-gold-deep sm:flex"
              >
                <User className="h-5 w-5 md:hidden" />
                <span className="hidden md:inline">{currency}</span>
                <ChevronDown className={`h-3 w-3 transition ${accountOpen ? "rotate-180" : ""}`} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 border border-ink/10 bg-ivory text-ink shadow-elegant animate-scale-in">
                  <div className="border-b border-ink/10 p-4">
                    {account ? (
                      <>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45">Account</p>
                        <p className="mt-1 truncate font-display text-xl">{account.firstName || account.email}</p>
                        <p className="truncate text-xs text-ink/55">{account.email}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-xl">Account</p>
                        <p className="mt-1 text-xs text-ink/55">Sign in for wishlist and saved addresses.</p>
                      </>
                    )}
                  </div>

                  <div className="grid p-2 text-sm">
                    <Link to="/account" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-cream">
                      <User className="h-4 w-4" /> Account
                    </Link>
                    <Link to="/account" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-cream">
                      <Package className="h-4 w-4" /> Orders
                    </Link>
                    <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-cream">
                      <Heart className="h-4 w-4" /> Wishlist ({wishCount})
                    </Link>
                    {account && (
                      <button
                        onClick={() => {
                          signOut();
                          setAccountOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 text-left text-ink/70 transition hover:bg-cream hover:text-ink"
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    )}
                  </div>

                  <div className="border-t border-ink/10 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45">Currency</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                        <button
                          key={code}
                          onClick={() => setCurrency(code)}
                          title={CURRENCIES[code].label}
                          className={`px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition ${
                            code === currency ? "bg-ink text-ivory" : "bg-cream text-ink/65 hover:text-ink"
                          }`}
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[10px] text-ink/45">Preview: {format(1000)}</p>
                  </div>
                </div>
              )}
            </div>

            <button
              aria-label={`Cart, ${count} items`}
              onClick={openCart}
              className="relative p-2 transition hover:text-gold-deep"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-ink/[0.06] md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-9 px-8 py-2.5">
            {collectionNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-current/56 transition hover:text-gold-deep"
                activeProps={{ className: "text-gold-deep" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
        <aside
          className={`absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-ivory text-ink shadow-elegant transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <img src={logoMark} alt="Fawzaan Store" className="h-9 w-9 rounded-full object-contain ring-1 ring-gold/20" />
              <span className="font-display text-2xl leading-none">Fawzaan<span className="text-gold">.</span>store</span>
            </Link>
            <button aria-label="Close" onClick={() => setOpen(false)} className="p-2 -mr-2 transition hover:text-gold-deep">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/45">Shop</p>
            <div className="mt-3 grid gap-1">
              {[...primaryNav.slice(0, 2), ...collectionNav].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ink/10 py-3 font-display text-2xl transition hover:text-gold-deep"
                >
                  {item.label}
                  <span className="font-sans text-sm text-ink/35">Explore</span>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-ink/45">Account</p>
            <div className="mt-3 grid gap-1 text-sm">
              <Link to="/account" onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5 transition hover:text-gold-deep">
                <User className="h-4 w-4" /> {account ? `Hi, ${account.firstName || "friend"}` : "Sign in"}
              </Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5 transition hover:text-gold-deep">
                <Heart className="h-4 w-4" /> Wishlist ({wishCount})
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className="py-2.5 transition hover:text-gold-deep">
                Heritage
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="py-2.5 transition hover:text-gold-deep">
                Contact
              </Link>
            </div>
          </nav>

          <div className="border-t border-ink/10 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/45">Currency</p>
            <div className="mt-2 flex gap-1 overflow-x-auto scrollbar-hide">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={`shrink-0 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                    code === currency ? "bg-ink text-ivory" : "bg-cream text-ink/65"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-ink/45 backdrop-blur-sm animate-fade-in" role="dialog" aria-label="Search">
          <button className="absolute inset-0" aria-label="Close" onClick={() => setSearchOpen(false)} />
          <div className="relative bg-ivory shadow-elegant animate-fade-up">
            <div className="mx-auto max-w-3xl px-4 py-5 md:px-8">
              <div className="flex items-center gap-3 border-b border-ink/12 pb-3">
                <Search className="h-5 w-5 text-ink/45" />
                <input
                  autoFocus
                  value={q}
                  onChange={(event) => setQ(event.target.value)}
                  placeholder="Search the store"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-ink/35"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close" className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {q.trim().length > 1 ? (
                results.length === 0 ? (
                  <p className="py-10 text-center text-sm text-ink/60">No matches for "{q}".</p>
                ) : (
                  <ul className="grid gap-2 py-4">
                    {results.map((product) => (
                      <li key={product.slug}>
                        <Link
                          to="/product/$slug"
                          params={{ slug: product.slug }}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-2 transition hover:bg-cream"
                        >
                          <img src={product.images[0]} alt="" className="h-16 w-12 object-cover bg-cream" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{product.name}</p>
                            <p className="truncate text-xs text-ink/55">{product.short}</p>
                          </div>
                          <span className="text-sm font-semibold">{format(product.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <div className="flex flex-wrap gap-2 py-5">
                  {collectionNav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSearchOpen(false)}
                      className="border border-ink/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:border-ink hover:bg-ink hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
