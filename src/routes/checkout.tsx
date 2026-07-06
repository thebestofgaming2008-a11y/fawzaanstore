import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { useConvexAuth } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { useCart } from "@/lib/cart";
import { useAccount } from "@/lib/account";
import { useCurrency } from "@/lib/currency";
import {
  createBackendWhatsAppOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/services/orderService";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout - Fawzaan.store" },
      { name: "description", content: "Secure checkout." },
    ],
  }),
  component: CheckoutPage,
});

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckoutInstance;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function loadRazorpayScript() {
  if (typeof window === "undefined") return Promise.reject(new Error("Checkout is unavailable."));
  if (window.Razorpay) return Promise.resolve();
  razorpayScriptPromise ??= new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not load Razorpay.")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay."));
    document.head.appendChild(script);
  });
  return razorpayScriptPromise;
}

type CountryOption = {
  code: string;
  name: string;
};

const COUNTRY_OPTIONS: CountryOption[] = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "BE", name: "Belgium" },
  { code: "BH", name: "Bahrain" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "IN", name: "India" },
  { code: "IT", name: "Italy" },
  { code: "KW", name: "Kuwait" },
  { code: "MY", name: "Malaysia" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "QA", name: "Qatar" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
  { code: "US", name: "United States" },
  { code: "ZA", name: "South Africa" },
];

function flagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}

function cleanCountryQuery(value: string) {
  return value.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
}

function countryByName(name: string) {
  return COUNTRY_OPTIONS.find((country) => country.name.toLowerCase() === name.toLowerCase());
}

function countryByCode(code?: string | null) {
  if (!code) return null;
  return COUNTRY_OPTIONS.find((country) => country.code === code.toUpperCase()) ?? null;
}

function CheckoutPage() {
  const nav = useNavigate();
  const { items, subtotal, clear } = useCart();
  const { account, signIn, addOrder, addAddress } = useAccount();
  const { isAuthenticated } = useConvexAuth();
  const saveBackendAddress = useMutation(api.addresses.create);
  const backendAddresses = useQuery(api.addresses.listMine, isAuthenticated ? {} : "skip") as
    | Array<Record<string, unknown>>
    | undefined;
  const { format, detectedCountry } = useCurrency();

  const [email, setEmail] = useState(account?.email ?? "");
  const [first, setFirst] = useState(account?.firstName ?? "");
  const [last, setLast] = useState(account?.lastName ?? "");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("India");
  const [countryQuery, setCountryQuery] = useState(`${flagEmoji("IN")} India`);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (countryTouched) return;
    const detected = countryByCode(detectedCountry);
    if (!detected) return;
    setCountry(detected.name);
    setCountryQuery(`${flagEmoji(detected.code)} ${detected.name}`);
  }, [countryTouched, detectedCountry]);

  const savedAddresses = useMemo(() => {
    const localAddresses = account?.addresses ?? [];
    const backend = backendAddresses ?? [];
    return [
      ...backend.map((address) => ({
        id: String(address.id ?? address._id ?? ""),
        name: String(address.full_name ?? ""),
        line1: String(address.address_line_1 ?? ""),
        line2: String(address.address_line_2 ?? ""),
        city: String(address.city ?? ""),
        state: String(address.state ?? ""),
        postal: String(address.postal_code ?? ""),
        country: String(address.country ?? ""),
        phone: String(address.phone ?? ""),
        isDefault: Boolean(address.is_default),
      })),
      ...localAddresses,
    ].filter((address, index, addresses) => {
      const key = `${address.line1}|${address.city}|${address.postal}|${address.country}`;
      return (
        addresses.findIndex(
          (candidate) =>
            `${candidate.line1}|${candidate.city}|${candidate.postal}|${candidate.country}` === key,
        ) === index
      );
    });
  }, [account?.addresses, backendAddresses]);

  const filteredCountries = useMemo(() => {
    const query = cleanCountryQuery(countryQuery).toLowerCase();
    if (!query) return COUNTRY_OPTIONS.slice(0, 8);
    return COUNTRY_OPTIONS.filter(
      (option) =>
        option.name.toLowerCase().includes(query) || option.code.toLowerCase().includes(query),
    ).slice(0, 8);
  }, [countryQuery]);

  const selectCountry = (option: CountryOption) => {
    setCountry(option.name);
    setCountryQuery(`${flagEmoji(option.code)} ${option.name}`);
    setCountryTouched(true);
    setCountryMenuOpen(false);
  };

  const applySavedAddress = (id: string) => {
    const selected = savedAddresses.find((address) => address.id === id);
    if (!selected) return;
    const [firstName = "", ...lastName] = selected.name.split(" ");
    setFirst(firstName);
    setLast(lastName.join(" "));
    setAddr1(selected.line1);
    setAddr2(selected.line2);
    setCity(selected.city);
    setState(selected.state);
    setPostal(selected.postal);
    setCountry(selected.country || "India");
    const selectedCountry = countryByName(selected.country || "India");
    setCountryQuery(
      selectedCountry ? `${flagEmoji(selectedCountry.code)} ${selectedCountry.name}` : selected.country,
    );
    setPhone(selected.phone || phone);
    setCountryTouched(true);
  };

  const isIndia = country.trim().toLowerCase() === "india";
  const paymentMethod = isIndia ? "razorpay" : "whatsapp";
  const total = subtotal;
  const hasCompleteShippingDetails = [
    first,
    last,
    addr1,
    city,
    state,
    postal,
  ].every((value) => value.trim().length > 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <SiteHeader />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-ink/60">Add something before you check out.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center bg-ink px-6 py-3 text-sm font-semibold text-ivory"
          >
            Browse the store
          </Link>
        </div>
      </div>
    );
  }

  const canContinue1 =
    isValidEmail(email) &&
    hasCompleteShippingDetails &&
    isValidPhone(phone);

  const placeOrder = async () => {
    if (!canContinue1) {
      toast.error("Complete your shipping details with a valid email and phone number.");
      return;
    }
    setProcessing(true);
    if (!account) signIn(email);
    const address = {
      name: `${first} ${last}`.trim(),
      line1: addr1.trim(),
      line2: addr2.trim(),
      city: city.trim(),
      state: state.trim(),
      postal: postal.trim(),
      country,
      phone: phone.trim(),
      isDefault: true,
    };
    const customer = {
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      name: address.name,
      address_line_1: address.line1,
      address_line_2: address.line2 || undefined,
      city: address.city,
      state: address.state,
      postal_code: address.postal,
      country: country.trim(),
    };

    const saveAddressForCustomer = async () => {
      addAddress(address);
      if (!isAuthenticated) return;
      try {
        await saveBackendAddress({
          payload: {
            type: "shipping",
            is_default: true,
            full_name: address.name,
            phone: address.phone,
            address_line_1: address.line1,
            address_line_2: address.line2 || null,
            city: address.city,
            state: address.state,
            postal_code: address.postal,
            country: address.country,
          },
        });
      } catch (error) {
        console.warn("Could not save customer address", error);
      }
    };

    const finishLocalOrder = async (backendOrder?: unknown) => {
      await saveAddressForCustomer();
      const backend =
        backendOrder && typeof backendOrder === "object"
          ? (backendOrder as Record<string, unknown>)
          : null;
      const order = addOrder({
        id: typeof backend?.id === "string" ? backend.id : undefined,
        date: typeof backend?.created_at === "string" ? backend.created_at : undefined,
        status: typeof backend?.status === "string" ? backend.status : undefined,
        items: items.map((i) => ({
          name: i.name,
          variant: i.variant,
          qty: i.qty,
          price: i.price,
          img: i.img,
        })),
        total: Number(backend?.total ?? total),
        address: { ...address, id: "" },
      });
      clear();
      nav({ to: "/order/$id", params: { id: order.id } });
    };

    let whatsappWindow: Window | null = null;
    try {
      if (paymentMethod === "whatsapp") {
        if (typeof window !== "undefined") {
          whatsappWindow = window.open("about:blank", "_blank");
        }
        const whatsappOrder = await createBackendWhatsAppOrder({ cart: items, customer, total });
        if (whatsappWindow) {
          whatsappWindow.opener = null;
          whatsappWindow.location.href = whatsappOrder.whatsappUrl;
        } else if (typeof window !== "undefined") {
          window.location.href = whatsappOrder.whatsappUrl;
        }
        await saveAddressForCustomer();
        clear();
        toast.success("WhatsApp opened with your order details.");
        nav({ to: "/" });
        return;
      }

      await loadRazorpayScript();
      const Razorpay = window.Razorpay;
      if (!Razorpay) throw new Error("Razorpay checkout did not load.");

      const checkoutOrder = await createRazorpayOrder({
        cart: items,
        customer,
        subtotal,
        shipping: 0,
        total,
      });

      let verifiedOrder: unknown = null;
      await new Promise<void>((resolve, reject) => {
        const razorpay = new Razorpay({
          key: checkoutOrder.key_id,
          amount: checkoutOrder.amount,
          currency: checkoutOrder.currency,
          name: "Fawzaan Store",
          description: "Store order",
          order_id: checkoutOrder.order_id,
          prefill: {
            name: customer.name,
            email: customer.email,
            contact: customer.phone,
          },
          notes: {
            city: customer.city,
            postal_code: customer.postal_code,
          },
          theme: { color: "#1a1a1a" },
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled.")),
          },
          handler: async (response: RazorpaySuccessResponse) => {
            try {
              verifiedOrder = await verifyRazorpayPayment({
                payload: checkoutOrder.payload,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });
              resolve();
            } catch (error) {
              reject(error);
            }
          },
        });
        razorpay.on("payment.failed", (response) => {
          const error = response as { error?: { description?: string } };
          reject(new Error(error.error?.description ?? "Payment failed."));
        });
        razorpay.open();
      });

      toast.success("Payment verified");
      await finishLocalOrder(verifiedOrder);
    } catch (error) {
      whatsappWindow?.close();
      console.error("Checkout failed", error);
      toast.error(error instanceof Error ? error.message : "Checkout failed.");
      setProcessing(false);
    }
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

        <div className="mt-8 grid lg:grid-cols-[1fr_400px] gap-10">
          <div>
            <section>
              <h2 className="font-display text-2xl">Shipping information</h2>
              <div className="mt-4 grid gap-3">
                {savedAddresses.length > 0 && (
                  <label className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Saved address
                    <select
                      defaultValue=""
                      onChange={(event) => applySavedAddress(event.target.value)}
                      className="mt-1 w-full border border-ink/15 px-3 py-2.5 bg-ivory text-sm"
                    >
                      <option value="">Choose a saved address</option>
                      {savedAddresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.name || "Saved address"} - {address.city}, {address.country}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <Input
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  required
                  autoComplete="email"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="First name"
                    value={first}
                    onChange={setFirst}
                    autoComplete="given-name"
                    required
                  />
                  <Input
                    label="Last name"
                    value={last}
                    onChange={setLast}
                    autoComplete="family-name"
                    required
                  />
                </div>
                <Input
                  label="Address"
                  value={addr1}
                  onChange={setAddr1}
                  autoComplete="address-line1"
                  required
                />
                <Input
                  label="Apartment, suite (optional)"
                  value={addr2}
                  onChange={setAddr2}
                  autoComplete="address-line2"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="City"
                    value={city}
                    onChange={setCity}
                    autoComplete="address-level2"
                    required
                  />
                  <Input
                    label="State / Region"
                    value={state}
                    onChange={setState}
                    autoComplete="address-level1"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Postal code"
                    value={postal}
                    onChange={setPostal}
                    autoComplete="postal-code"
                    required
                  />
                  <label className="relative text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Country
                    <input
                      value={countryQuery}
                      onChange={(event) => {
                        const nextCountry = cleanCountryQuery(event.target.value);
                        setCountryQuery(event.target.value);
                        setCountry(nextCountry);
                        setCountryTouched(true);
                        setCountryMenuOpen(true);
                      }}
                      onFocus={() => setCountryMenuOpen(true)}
                      onBlur={() => window.setTimeout(() => setCountryMenuOpen(false), 120)}
                      autoComplete="country-name"
                      className="mt-1 w-full border border-ink/15 px-3 py-2.5 bg-ivory text-sm text-ink normal-case tracking-normal"
                      placeholder="Search country"
                    />
                    {countryMenuOpen && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto border border-ink/15 bg-ivory shadow-lg">
                        {filteredCountries.map((option) => (
                          <button
                            key={option.code}
                            type="button"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              selectCountry(option);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm normal-case tracking-normal hover:bg-cream"
                          >
                            <span aria-hidden="true">{flagEmoji(option.code)}</span>
                            <span>{option.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </label>
                </div>
                <Input
                  label="Phone"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <button
                onClick={placeOrder}
                disabled={processing}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition disabled:opacity-60"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    <Lock className="h-4 w-4" />{" "}
                    {paymentMethod === "razorpay" ? "Pay with Razorpay" : "Order on WhatsApp"} -{" "}
                    {format(total)}
                  </>
                )}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-ink/55">
                {paymentMethod === "razorpay"
                  ? "India orders are paid securely through Razorpay."
                  : "International orders open WhatsApp with your order details so shipping and payment can be confirmed."}
              </p>
            </section>
          </div>
          {/* Summary */}
          <aside className="lg:sticky lg:top-24 h-fit bg-cream p-6">
            <h2 className="font-display text-xl">Order summary</h2>
            <ul className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 text-sm">
                  <div className="relative shrink-0">
                    <img src={i.img} alt="" className="h-14 w-12 object-cover bg-ivory" />
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-ink text-ivory text-[10px] flex items-center justify-center px-1">
                      {i.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{i.name}</p>
                    {i.variant && (
                      <p className="text-[11px] text-ink/55 uppercase tracking-widest">
                        {i.variant}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0">{format(i.price * i.qty)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 text-sm border-t border-ink/15 pt-4">
              <div className="flex justify-between">
                <dt className="text-ink/70">Subtotal</dt>
                <dd>{format(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Shipping</dt>
                <dd>{isIndia ? "Included" : "Confirmed on WhatsApp"}</dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-ink/15 pt-4 flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.18em] text-ink/70">Total</span>
              <span className="font-display text-2xl">{format(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.18em] text-ink/60">
      {label}
      {required && <span className="text-red-600"> *</span>}
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
