import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Truck } from "lucide-react";
import { useConvexAuth } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { useAccount } from "@/lib/account";
import { useCurrency } from "@/lib/currency";

export const Route = createFileRoute("/order/$id")({
  head: () => ({ meta: [{ title: "Order confirmed - Fawzaan.store" }] }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const { account } = useAccount();
  const { isAuthenticated } = useConvexAuth();
  const backendOrders = useQuery(api.orders.listMine, isAuthenticated ? {} : "skip") as
    | Array<Record<string, any>>
    | undefined;
  const { format } = useCurrency();
  const backendOrder = backendOrders?.find((candidate) => String(candidate.id) === id);
  const localOrder = account?.orders.find((o) => o.id === id);
  const order = backendOrder
    ? {
        id: String(backendOrder.id),
        number: String(backendOrder.order_number ?? backendOrder.id),
        paymentProvider: String(backendOrder.payment_provider ?? ""),
        paymentStatus: String(backendOrder.payment_status ?? ""),
        address: {
          name: String(backendOrder.shipping_address?.name ?? backendOrder.customer_name ?? "Customer"),
          line1: String(backendOrder.shipping_address?.address_line_1 ?? ""),
          line2: String(backendOrder.shipping_address?.address_line_2 ?? ""),
          city: String(backendOrder.shipping_address?.city ?? ""),
          state: String(backendOrder.shipping_address?.state ?? ""),
          postal: String(backendOrder.shipping_address?.postal_code ?? ""),
          country: String(backendOrder.shipping_address?.country ?? ""),
        },
        status: String(backendOrder.status ?? "processing"),
        total: Number(backendOrder.total_inr ?? backendOrder.total ?? 0),
        items: Array.isArray(backendOrder.items)
          ? backendOrder.items.map((item: any) => ({
              name: String(item.product_name ?? "Item"),
              variant: [item.selected_color, item.selected_size].filter(Boolean).join(" / "),
              qty: Number(item.quantity ?? 1),
              price: Number(item.unit_price ?? 0),
              img: String(item.product_image_url ?? ""),
            }))
          : [],
      }
    : localOrder;

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

  const status = String(order.status ?? "").toLowerCase();
  const paymentProvider =
    "paymentProvider" in order ? String(order.paymentProvider ?? "").toUpperCase() : "";
  const paymentStatus =
    "paymentStatus" in order ? String(order.paymentStatus ?? "").toLowerCase() : "";
  const isWhatsAppRequest =
    paymentProvider === "WHATSAPP" ||
    status === "whatsapp_pending" ||
    paymentStatus === "unconfirmed";
  const displayNumber = "number" in order && order.number ? String(order.number) : `#${order.id}`;
  const statusText = status.replace(/_/g, " ") || "processing";

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center">
          <CheckCircle2 className="h-14 w-14 mx-auto text-gold-deep" />
          <p className="mt-4 eyebrow text-gold-deep">
            {isWhatsAppRequest ? "Order request sent" : "Order confirmed"}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Thank you, {order.address.name.split(" ")[0]}.</h1>
          <p className="mt-3 text-ink/60">
            {isWhatsAppRequest ? (
              <>
                Your request <span className="font-medium text-ink">{displayNumber}</span> was saved.
                Send the WhatsApp message to confirm shipping and payment.
              </>
            ) : (
              <>
                Your order <span className="font-medium text-ink">{displayNumber}</span> is ready for fulfillment.
              </>
            )}
          </p>
          <p className="mt-1 text-sm text-ink/50">
            {isWhatsAppRequest
              ? "Do not pay until the store confirms your order in WhatsApp."
              : "Payment is verified and the store can start processing your order."}
          </p>
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
            <p className="mt-2 flex items-center gap-2 text-sm capitalize"><Truck className="h-4 w-4 text-gold-deep" /> {statusText}</p>
            <p className="mt-1 text-xs text-ink/55">
              {isWhatsAppRequest
                ? "Delivery timing is confirmed after the WhatsApp conversation."
                : "Estimated delivery is shown after fulfillment and tracking are added."}
            </p>
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
              <p className="text-sm">{format(i.price * i.qty)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between text-lg font-display">
          <span>Total</span>
          <span>{format(order.total)}</span>
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
