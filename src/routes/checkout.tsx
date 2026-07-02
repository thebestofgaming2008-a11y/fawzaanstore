import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ShieldCheck, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { useCart, FREE_SHIP_THRESHOLD } from "@/lib/cart";
import { useAccount } from "@/lib/account";
import { useCurrency } from "@/lib/currency";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Fawzaan.store" }, { name: "description", content: "Secure checkout." }] }),
  component: CheckoutPage,
});

type Step = 1 | 2 | 3;

function CheckoutPage() {
  const nav = useNavigate();
  const { items, subtotal, clear } = useCart();
  const { account, signIn, addOrder, addAddress } = useAccount();
  const { format } = useCurrency();

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState(account?.email ?? "");
  const [first, setFirst] = useState(account?.firstName ?? "");
  const [last, setLast] = useState(account?.lastName ?? "");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("India");
  const [phone, setPhone] = useState("");
  const [ship, setShip] = useState<"standard" | "express">("standard");
  const [pay, setPay] = useState<"card" | "cod" | "upi">("card");
  const [processing, setProcessing] = useState(false);

  const shipCost = subtotal >= FREE_SHIP_THRESHOLD ? 0 : ship === "express" ? 350 : 150; // INR
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + shipCost + tax).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <SiteHeader />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-4xl">Your cart is empty</h1>
          <p className="mt-2 text-ink/60">Add something before you check out.</p>
          <Link to="/" className="mt-6 inline-flex items-center bg-ink text-ivory px-6 py-3 text-xs uppercase tracking-[0.22em]">
            Browse the store
          </Link>
        </div>
      </div>
    );
  }

  const canContinue1 = email.includes("@") && first && last && addr1 && city && postal && phone;

  const placeOrder = async () => {
    if (!canContinue1) { setStep(1); toast.error("Complete your details."); return; }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (!account) signIn(email);
    const address = {
      name: `${first} ${last}`.trim(), line1: addr1, line2: addr2, city, state, postal, country, phone, isDefault: true,
    };
    addAddress(address);
    const order = addOrder({
      items: items.map((i) => ({ name: i.name, variant: i.variant, qty: i.qty, price: i.price, img: i.img })),
      total,
      address: { ...address, id: "" },
    });
    clear();
    nav({ to: "/order/$id", params: { id: order.id } });
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-6 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl">Checkout</h1>
          <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-ink/60">
            <Lock className="h-3 w-3" /> Secure
          </div>
        </div>

        {/* Steps indicator */}
        <ol className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
          {(["Details", "Shipping", "Payment"] as const).map((label, i) => {
            const s = (i + 1) as Step;
            const active = step === s;
            const done = step > s;
            return (
              <li key={label} className="flex items-center gap-2">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${done ? "bg-gold-deep text-ivory" : active ? "bg-ink text-ivory" : "bg-cream text-ink/40"}`}>
                  {s}
                </span>
                <span className={active || done ? "text-ink" : "text-ink/40"}>{label}</span>
                {i < 2 && <ChevronRight className="h-3 w-3 text-ink/30" />}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid lg:grid-cols-[1fr_400px] gap-10">
          <div>
            {/* Step 1: contact + address */}
            <section className={step === 1 ? "" : "opacity-60 pointer-events-none"}>
              <h2 className="font-display text-2xl">Contact & delivery</h2>
              <div className="mt-4 grid gap-3">
                <Input label="Email" value={email} onChange={setEmail} type="email" required autoComplete="email" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="First name" value={first} onChange={setFirst} autoComplete="given-name" required />
                  <Input label="Last name" value={last} onChange={setLast} autoComplete="family-name" required />
                </div>
                <Input label="Address" value={addr1} onChange={setAddr1} autoComplete="address-line1" required />
                <Input label="Apartment, suite (optional)" value={addr2} onChange={setAddr2} autoComplete="address-line2" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="City" value={city} onChange={setCity} autoComplete="address-level2" required />
                  <Input label="State / Region" value={state} onChange={setState} autoComplete="address-level1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Postal code" value={postal} onChange={setPostal} autoComplete="postal-code" required />
                  <label className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Country
                    <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full border border-ink/15 px-3 py-2.5 bg-ivory text-sm">
                      {["India", "United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Canada", "Australia", "Germany", "France"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <Input label="Phone" value={phone} onChange={setPhone} type="tel" autoComplete="tel" required />
              </div>
              {step === 1 && (
                <button
                  onClick={() => canContinue1 ? setStep(2) : toast.error("Complete required fields")}
                  className="mt-6 w-full inline-flex items-center justify-center bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition"
                >
                  Continue to shipping
                </button>
              )}
            </section>

            {/* Step 2: shipping */}
            {step >= 2 && (
              <section className={`mt-10 ${step === 2 ? "" : "opacity-60 pointer-events-none"}`}>
                <h2 className="font-display text-2xl">Shipping method</h2>
                <div className="mt-4 space-y-2">
                  {[
                    { key: "standard", label: "Standard (5-8 days)", cost: subtotal >= FREE_SHIP_THRESHOLD ? "Free" : "$6.90" },
                    { key: "express", label: "Express (2-3 days)", cost: "$14.00" },
                  ].map((o) => (
                    <label key={o.key} className={`flex items-center justify-between border p-4 cursor-pointer transition ${ship === o.key ? "border-ink" : "border-ink/15 hover:border-ink/40"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="ship" value={o.key} checked={ship === o.key} onChange={() => setShip(o.key as "standard" | "express")} className="accent-ink" />
                        <span className="text-sm">{o.label}</span>
                      </div>
                      <span className="text-sm">{o.cost}</span>
                    </label>
                  ))}
                </div>
                {step === 2 && (
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 text-xs uppercase tracking-[0.22em] border border-ink/20">Back</button>
                    <button onClick={() => setStep(3)} className="flex-1 bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition">
                      Continue to payment
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Step 3: payment */}
            {step >= 3 && (
              <section className="mt-10">
                <h2 className="font-display text-2xl">Payment</h2>
                <p className="mt-1 text-xs text-ink/55 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-gold-deep" /> All transactions are encrypted.</p>
                <div className="mt-4 space-y-2">
                  {[
                    { key: "card", label: "Credit / debit card" },
                    { key: "upi", label: "UPI" },
                    { key: "cod", label: "Cash on delivery" },
                  ].map((o) => (
                    <label key={o.key} className={`flex items-center gap-3 border p-4 cursor-pointer transition ${pay === o.key ? "border-ink" : "border-ink/15 hover:border-ink/40"}`}>
                      <input type="radio" name="pay" value={o.key} checked={pay === o.key} onChange={() => setPay(o.key as typeof pay)} className="accent-ink" />
                      <span className="text-sm">{o.label}</span>
                    </label>
                  ))}
                </div>
                {pay === "card" && (
                  <div className="mt-4 grid gap-3 border border-ink/10 p-4 bg-cream">
                    <Input label="Card number" value="" onChange={() => {}} placeholder="1234 1234 1234 1234" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Expiry" value="" onChange={() => {}} placeholder="MM/YY" />
                      <Input label="CVC" value="" onChange={() => {}} placeholder="123" />
                    </div>
                    <Input label="Name on card" value="" onChange={() => {}} />
                    <p className="text-[11px] text-ink/50">Demo checkout — no real charge. Payment will be wired up separately.</p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(2)} disabled={processing} className="px-6 py-4 text-xs uppercase tracking-[0.22em] border border-ink/20">Back</button>
                  <button
                    onClick={placeOrder}
                    disabled={processing}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition disabled:opacity-60"
                  >
                    {processing ? "Placing order…" : <><Lock className="h-4 w-4" /> Place order · {format(total)}</>}
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 h-fit bg-cream p-6">
            <h2 className="font-display text-xl">Order summary</h2>
            <ul className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 text-sm">
                  <div className="relative shrink-0">
                    <img src={i.img} alt="" className="h-14 w-12 object-cover bg-ivory" />
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-ink text-ivory text-[10px] flex items-center justify-center px-1">{i.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{i.name}</p>
                    {i.variant && <p className="text-[11px] text-ink/55 uppercase tracking-widest">{i.variant}</p>}
                  </div>
                  <p className="shrink-0">${(i.price * i.qty).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 text-sm border-t border-ink/15 pt-4">
              <div className="flex justify-between"><dt className="text-ink/70">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/70">Shipping</dt><dd>{shipCost === 0 ? "Free" : `$${shipCost.toFixed(2)}`}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/70">Tax (5%)</dt><dd>${tax.toFixed(2)}</dd></div>
            </dl>
            <div className="mt-4 border-t border-ink/15 pt-4 flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.18em] text-ink/70">Total</span>
              <span className="font-display text-2xl">${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", placeholder, required, autoComplete,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
  placeholder?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.18em] text-ink/60">
      {label}{required && <span className="text-red-600"> *</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1 w-full border border-ink/15 focus:border-ink outline-none px-3 py-2.5 bg-ivory text-sm text-ink font-sans-ui transition"
      />
    </label>
  );
}
