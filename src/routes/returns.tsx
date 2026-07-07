import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Return & Refund Policy | Fawzaan.store" },
      { name: "description", content: "30-day returns. Clear refund timelines. Hassle-free process." },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <p className="eyebrow text-gold-deep mb-3">Customer Care</p>
        <h1 className="font-display text-4xl md:text-5xl mb-2">Return & Refund Policy</h1>
        <p className="text-sm text-ink/60 mb-10">Last updated: June 27, 2026</p>

        <div className="space-y-6 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">30-Day Return Window</h2>
            <p>
              We offer a 30-day return policy from the date your order is delivered. To be eligible,
              items must be unused, unwashed, and in their original packaging with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Non-Returnable Items</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Honey and edible products (for food safety reasons).</li>
              <li>Items marked "Final Sale".</li>
              <li>Gift cards.</li>
              <li>Custom or personalised items.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">How to Request a Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email <a href="mailto:returns@fawzaan.store" className="text-gold-deep underline">returns@fawzaan.store</a> with your order number and reason for return.</li>
              <li>We'll reply within 1–2 business days with a return authorisation and shipping label.</li>
              <li>Pack the item securely and drop it off at the designated carrier.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Refund Timelines</h2>
            <p>
              Once we receive and inspect your return (typically within 3 business days of arrival), we
              will notify you of approval. Approved refunds are processed to your original Razorpay
              payment method within <strong>5–7 business days</strong>. Depending on your bank, it may
              take an additional 3–5 days for the credit to appear on your statement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Exchanges</h2>
            <p>
              The fastest way to exchange an item is to return the original and place a new order.
              We'll process the refund as soon as the return is received.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Damaged or Defective Items</h2>
            <p>
              If your order arrives damaged or defective, please email us within 7 days of delivery
              with photos. We will replace the item or issue a full refund at no cost to you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Return Shipping Costs</h2>
            <p>
              Return shipping is free for defective or incorrect items. For change-of-mind returns,
              a flat return-shipping fee of $7 will be deducted from your refund.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Contact</h2>
            <p>
              Email <a href="mailto:returns@fawzaan.store" className="text-gold-deep underline">returns@fawzaan.store</a> for any return questions.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
