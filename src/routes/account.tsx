import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Package, MapPin, User as UserIcon } from "lucide-react";
import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { useAccount } from "@/lib/account";
import { convex } from "@/lib/backend";
import { useCurrency } from "@/lib/currency";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account - Fawzaan.store" }] }),
  component: AccountPage,
});

function AccountPage() {
  if (!convex) return <LocalAccountPage />;
  return <BackendAccountPage />;
}

function BackendAccountPage() {
  const { account, signIn, signUp, signOut } = useAccount();
  const { signOut: convexSignOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const { format } = useCurrency();
  const profile = useQuery(api.users.currentProfile, isAuthenticated ? {} : "skip") as
    | Record<string, unknown>
    | null
    | undefined;
  const backendOrders = useQuery(api.orders.listMine, isAuthenticated ? {} : "skip") as
    | Array<Record<string, any>>
    | undefined;
  const backendAddresses = useQuery(api.addresses.listMine, isAuthenticated ? {} : "skip") as
    | Array<Record<string, any>>
    | undefined;
  const nav = useNavigate();

  if (!account && !isAuthenticated) return <AuthPanel signIn={signIn} signUp={signUp} />;

  const displayEmail = account?.email ?? String(profile?.email ?? "");
  const displayName =
    account?.firstName ||
    String(profile?.full_name ?? "").split(" ")[0] ||
    displayEmail.split("@")[0] ||
    "there";
  const displayFullName =
    [account?.firstName, account?.lastName].filter(Boolean).join(" ") ||
    String(profile?.full_name ?? "");
  const orders = backendOrders
    ? backendOrders.map((order) => ({
        id: String(order.id),
        date: String(order.created_at ?? new Date().toISOString()),
        status: String(order.status ?? "processing"),
        total: Number(order.total_inr ?? order.total ?? 0),
        items: Array.isArray(order.items)
          ? order.items.map((item: any) => ({
              name: String(item.product_name ?? "Item"),
              img: String(item.product_image_url ?? ""),
            }))
          : [],
      }))
    : (account?.orders ?? []);
  const addresses = backendAddresses
    ? backendAddresses.map((address) => ({
        id: String(address.id),
        name: String(address.full_name ?? ""),
        line1: String(address.address_line_1 ?? ""),
        line2: String(address.address_line_2 ?? ""),
        city: String(address.city ?? ""),
        state: String(address.state ?? ""),
        postal: String(address.postal_code ?? ""),
        country: String(address.country ?? ""),
        isDefault: Boolean(address.is_default),
      }))
    : (account?.addresses ?? []);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-gold-deep">Your account</p>
            <h1 className="mt-1 font-display text-4xl md:text-5xl">Hi, {displayName}.</h1>
            <p className="mt-1 text-sm text-ink/60">{displayEmail}</p>
          </div>
          <button
            onClick={() => {
              void convexSignOut().catch(() => undefined);
              signOut();
              toast("Signed out");
              nav({ to: "/" });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink/70 hover:text-ink"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-8">
            {/* Orders */}
            <section>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gold-deep" />
                <h2 className="font-display text-2xl">Orders</h2>
              </div>
              {orders.length === 0 ? (
                <p className="mt-4 text-sm text-ink/60 bg-cream p-6">No orders yet. When you place one it will show up here.</p>
              ) : (
                <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {orders.map((o) => (
                    <li key={o.id}>
                      <Link to="/order/$id" params={{ id: o.id }} className="flex items-center gap-4 py-4 hover:bg-cream px-2 -mx-2 transition">
                        <div className="flex -space-x-2">
                          {o.items.slice(0, 3).map((it, i) => (
                            <img key={i} src={it.img} alt="" className="h-10 w-10 object-cover bg-cream ring-2 ring-ivory" />
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">#{o.id}</p>
                          <p className="text-xs text-ink/55">{new Date(o.date).toLocaleDateString()}  /  {o.items.length} item{o.items.length === 1 ? "" : "s"}</p>
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{o.status}</span>
                        <span className="text-sm">{format(o.total)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Addresses */}
            <section>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-deep" />
                <h2 className="font-display text-2xl">Addresses</h2>
              </div>
              {addresses.length === 0 ? (
                <p className="mt-4 text-sm text-ink/60 bg-cream p-6">No saved addresses yet.</p>
              ) : (
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {addresses.map((a) => (
                    <li key={a.id} className="border border-ink/15 p-4 text-sm">
                      <p className="font-medium">{a.name}{a.isDefault && <span className="ml-2 text-[10px] uppercase tracking-widest text-gold-deep">Default</span>}</p>
                      <p className="mt-1 text-ink/70">{a.line1}{a.line2 && `, ${a.line2}`}</p>
                      <p className="text-ink/70">{a.city}{a.state && `, ${a.state}`} {a.postal}</p>
                      <p className="text-ink/70">{a.country}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Profile card */}
          <aside className="bg-cream p-6 h-fit">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-ink text-ivory flex items-center justify-center font-display text-xl">
                {(displayName || displayEmail || "A")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{displayFullName || displayName}</p>
                <p className="text-xs text-ink/60 truncate">{displayEmail}</p>
              </div>
            </div>
            <ul className="mt-5 text-sm space-y-2">
              <li><Link to="/wishlist" className="hover:underline">Wishlist</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact support</Link></li>
              <li><Link to="/returns" className="hover:underline">Returns policy</Link></li>
            </ul>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function LocalAccountPage() {
  const { account, signIn, signUp, signOut } = useAccount();
  const { format } = useCurrency();
  const nav = useNavigate();

  if (!account) return <LocalAuthPanel signIn={signIn} signUp={signUp} />;

  const displayName = account.firstName || account.email.split("@")[0] || "there";
  const displayFullName = [account.firstName, account.lastName].filter(Boolean).join(" ");
  const orders = account.orders;
  const addresses = account.addresses;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-gold-deep">Your account</p>
            <h1 className="mt-1 font-display text-4xl md:text-5xl">Hi, {displayName}.</h1>
            <p className="mt-1 text-sm text-ink/60">{account.email}</p>
          </div>
          <button
            onClick={() => {
              signOut();
              toast("Signed out");
              nav({ to: "/" });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink/70 hover:text-ink"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-8">
            <section>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gold-deep" />
                <h2 className="font-display text-2xl">Orders</h2>
              </div>
              {orders.length === 0 ? (
                <p className="mt-4 text-sm text-ink/60 bg-cream p-6">
                  No orders yet. When you place one it will show up here.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {orders.map((o) => (
                    <li key={o.id}>
                      <Link
                        to="/order/$id"
                        params={{ id: o.id }}
                        className="flex items-center gap-4 py-4 hover:bg-cream px-2 -mx-2 transition"
                      >
                        <div className="flex -space-x-2">
                          {o.items.slice(0, 3).map((it, i) => (
                            <img
                              key={i}
                              src={it.img}
                              alt=""
                              className="h-10 w-10 object-cover bg-cream ring-2 ring-ivory"
                            />
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">#{o.id}</p>
                          <p className="text-xs text-ink/55">
                            {new Date(o.date).toLocaleDateString()} / {o.items.length} item
                            {o.items.length === 1 ? "" : "s"}
                          </p>
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">
                          {o.status}
                        </span>
                        <span className="text-sm">{format(o.total)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-deep" />
                <h2 className="font-display text-2xl">Addresses</h2>
              </div>
              {addresses.length === 0 ? (
                <p className="mt-4 text-sm text-ink/60 bg-cream p-6">No saved addresses yet.</p>
              ) : (
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {addresses.map((a) => (
                    <li key={a.id} className="border border-ink/15 p-4 text-sm">
                      <p className="font-medium">
                        {a.name}
                        {a.isDefault && (
                          <span className="ml-2 text-[10px] uppercase tracking-widest text-gold-deep">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-ink/70">
                        {a.line1}
                        {a.line2 && `, ${a.line2}`}
                      </p>
                      <p className="text-ink/70">
                        {a.city}
                        {a.state && `, ${a.state}`} {a.postal}
                      </p>
                      <p className="text-ink/70">{a.country}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <aside className="bg-cream p-6 h-fit">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-ink text-ivory flex items-center justify-center font-display text-xl">
                {(displayName || account.email || "A")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{displayFullName || displayName}</p>
                <p className="text-xs text-ink/60 truncate">{account.email}</p>
              </div>
            </div>
            <ul className="mt-5 text-sm space-y-2">
              <li>
                <Link to="/wishlist" className="hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact support
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:underline">
                  Returns policy
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function AuthPanel({
  signIn, signUp,
}: {
  signIn: (email: string) => unknown;
  signUp: (email: string, first: string, last: string) => unknown;
}) {
  const { signIn: convexSignIn } = useAuthActions();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="mx-auto max-w-md px-4 py-14 md:py-20">
        <p className="eyebrow text-gold-deep text-center">Fawzaan.store</p>
        <h1 className="mt-2 font-display text-4xl text-center">{mode === "in" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-ink/60 text-center">
          {mode === "in" ? "Welcome back. Enter your email to continue." : "Save your details for faster checkout."}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) { toast.error("Enter a valid email"); return; }
            if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
            setSubmitting(true);
            void convexSignIn("password", {
              email: email.toLowerCase(),
              password,
              flow: mode === "in" ? "signIn" : "signUp",
            })
              .then(() => {
                if (mode === "in") signIn(email); else signUp(email, first, last);
                toast.success(mode === "in" ? "Welcome back" : "Account created");
                nav({ to: "/account" });
              })
              .catch((error) => {
                toast.error(error instanceof Error ? error.message : "Could not sign in");
              })
              .finally(() => setSubmitting(false));
          }}
          className="mt-8 space-y-3"
        >
          {mode === "up" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" value={first} onChange={setFirst} required />
              <Field label="Last name" value={last} onChange={setLast} />
            </div>
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />
          <button className="w-full bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition">
            {submitting ? "Please wait..." : mode === "in" ? "Continue" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink/60 text-center">
          {mode === "in" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="underline underline-offset-2">
            {mode === "in" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function LocalAuthPanel({
  signIn,
  signUp,
}: {
  signIn: (email: string) => unknown;
  signUp: (email: string, first: string, last: string) => unknown;
}) {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="mx-auto max-w-md px-4 py-14 md:py-20">
        <p className="eyebrow text-gold-deep text-center">Fawzaan.store</p>
        <h1 className="mt-2 font-display text-4xl text-center">
          {mode === "in" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-ink/60 text-center">
          {mode === "in" ? "Enter your email to continue." : "Save your details for faster checkout."}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) {
              toast.error("Enter a valid email");
              return;
            }
            if (mode === "in") signIn(email);
            else signUp(email, first, last);
            toast.success(mode === "in" ? "Welcome back" : "Account created");
            nav({ to: "/account" });
          }}
          className="mt-8 space-y-3"
        >
          {mode === "up" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" value={first} onChange={setFirst} required />
              <Field label="Last name" value={last} onChange={setLast} />
            </div>
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <button className="w-full bg-ink text-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-gold-deep transition">
            {mode === "in" ? "Continue" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink/60 text-center">
          {mode === "in" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="underline underline-offset-2">
            {mode === "in" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.18em] text-ink/60">
      {label}{required && <span className="text-red-600"> *</span>}
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="mt-1 w-full border border-ink/15 focus:border-ink outline-none px-3 py-3 bg-ivory text-sm text-ink font-sans-ui"
      />
    </label>
  );
}
