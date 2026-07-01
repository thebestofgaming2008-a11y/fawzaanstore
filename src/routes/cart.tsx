import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, Lock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { useCart, FREE_SHIP_THRESHOLD } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Fawzaan.store" }, { name: "description", content: "Review your cart." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : 6.9;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-10 md:py-14">
        <h1 className="font-display text-4xl md:text-5xl">Your cart</h1>
        <p className="mt-1 text-sm text-ink/60">{items.length} item{items.length === 1 ? "" : "s"}</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center py-20 border-y border-ink/10">
            <div className="mx-auto h-16 w-16 rounded-full bg-cream flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-gold-deep" />
            </div>
            <p className="mt-5 font-display text-3xl">Nothing in your cart yet.</p>
            <p className="mt-2 text-ink/60">A quiet start — pick something considered.</p>
            <Link to="/" className="mt-8 inline-flex items-center bg-ink text-ivory px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-gold-deep transition">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-10">
            <div>
              {/* Free ship progress */}
              <div className="mb-8">
                {remaining > 0 ? (
                  <p className="text-sm text-ink/70">Add <span className="font-semibold text-ink">${remaining.toFixed(2)}</span> more for free shipping.</p>
                ) : (
                  <p className="text-sm font-semibold text-gold-deep">✦ You've unlocked free shipping.</p>
                )}
                <div className="mt-2 h-1.5 rounded-full bg-cream overflow-hidden">
                  <div className="h-full bg-gradient-gold transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {items.map((i) => (
                  <li key={i.id} className="py-6 flex gap-4 md:gap-6">
                    <img src={i.img} alt={i.name} className="h-28 w-24 md:h-32 md:w-28 object-cover bg-cream shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-display text-xl">{i.name}</p>
                          {i.variant && <p className="text-xs text-ink/55 uppercase tracking-[0.18em] mt-1">{i.variant}</p>}
                          <p className="mt-2 text-sm text-ink/70">${i.price.toFixed(2)}</p>
                        </div>
                        <button aria-label="Remove" onClick={() => remove(i.id)} className="p-1 text-ink/45 hover:text-ink">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-ink/15">
                          <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease" className="p-2 hover:text-gold-deep"><Minus className="h-3.5 w-3.5" /></button>
                          <span className="w-8 text-center text-sm">{i.qty}</span>
                          <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase" className="p-2 hover:text-gold-deep"><Plus className="h-3.5 w-3.5" /></button>
                        </div>
                        <p className="font-medium">${(i.price * i.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link to="/" className="mt-6 inline-block text-sm underline underline-offset-4">← Continue shopping</Link>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 h-fit bg-cream p-6 md:p-8">
              <h2 className="font-display text-2xl">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink/70">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink/70">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
                <div className="flex justify-between text-xs text-ink/55"><dt>Taxes</dt><dd>Calculated at checkout</dd></div>
              </dl>
              <div className="mt-4 border-t border-ink/15 pt-4 flex items-baseline justify-between">
                <span className="text-sm uppercase tracking-[0.18em] text-ink/70">Total</span>
                <span className="font-display text-3xl">${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition"
              >
                <Lock className="h-4 w-4" /> Checkout · ${total.toFixed(2)}
              </Link>
              <p className="mt-3 text-[11px] text-ink/50 text-center">Secure encrypted payment · 30-day returns</p>
            </aside>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
