import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Truck } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { useAccount } from "@/lib/account";

export const Route = createFileRoute("/order/$id")({
  head: () => ({ meta: [{ title: "Order confirmed — Fawzaan.store" }] }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const { account } = useAccount();
  const order = account?.orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-ivory text-ink">
        <SiteHeader />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl">Order not found</h1>
          <Link to="/" className="mt-6 inline-block text-sm underline">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center">
          <CheckCircle2 className="h-14 w-14 mx-auto text-gold-deep" />
          <p className="mt-4 eyebrow text-gold-deep">Order confirmed</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Thank you, {order.address.name.split(" ")[0]}.</h1>
          <p className="mt-3 text-ink/60">Your order <span className="font-medium text-ink">#{order.id}</span> is on its way to being packed.</p>
          <p className="mt-1 text-sm text-ink/50">A receipt has been sent to your inbox.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6 bg-cream p-6 md:p-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">Shipping to</p>
            <p className="mt-2 text-sm leading-relaxed">
              {order.address.name}<br />
              {order.address.line1}{order.address.line2 && `, ${order.address.line2}`}<br />
              {order.address.city}{order.address.state && `, ${order.address.state}`} {order.address.postal}<br />
              {order.address.country}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">Status</p>
            <p className="mt-2 flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-gold-deep" /> {order.status}</p>
            <p className="mt-1 text-xs text-ink/55">Estimated delivery in 5-8 business days.</p>
          </div>
        </div>

        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {order.items.map((i, idx) => (
            <li key={idx} className="py-4 flex items-center gap-4">
              <img src={i.img} alt="" className="h-16 w-14 object-cover bg-cream" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{i.name}</p>
                {i.variant && <p className="text-[11px] text-ink/55 uppercase tracking-widest">{i.variant}</p>}
                <p className="text-xs text-ink/60 mt-0.5">Qty {i.qty}</p>
              </div>
              <p className="text-sm">${(i.price * i.qty).toFixed(2)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between text-lg font-display">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/account" className="inline-flex justify-center bg-ink text-ivory px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-gold-deep transition">
            View orders
          </Link>
          <Link to="/" className="inline-flex justify-center border border-ink/20 px-6 py-3 text-xs uppercase tracking-[0.22em]">
            Continue shopping
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
