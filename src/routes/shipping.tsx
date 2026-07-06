import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Policy | Fawzaan.store" },
      { name: "description", content: "Delivery times, carriers, and shipping rates for Fawzaan Store orders worldwide." },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <p className="eyebrow text-gold-deep mb-3">Customer Care</p>
        <h1 className="font-display text-4xl md:text-5xl mb-2">Shipping Policy</h1>
        <p className="text-sm text-ink/60 mb-10">Last updated: June 27, 2026</p>

        <div className="space-y-6 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Processing Time</h2>
            <p>
              Orders are processed within <strong>1-2 business days</strong> (Monday-Friday, excluding
              public holidays). You will receive a confirmation email with tracking once your order ships.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Delivery Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-ink/10 mt-3">
                <thead className="bg-cream">
                  <tr>
                    <th className="px-4 py-3 font-medium">Region</th>
                    <th className="px-4 py-3 font-medium">Standard</th>
                    <th className="px-4 py-3 font-medium">Express</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  <tr><td className="px-4 py-3">India</td><td className="px-4 py-3">3-5 business days</td><td className="px-4 py-3">1-2 business days</td></tr>
                  <tr><td className="px-4 py-3">Middle East</td><td className="px-4 py-3">5-8 business days</td><td className="px-4 py-3">2-3 business days</td></tr>
                  <tr><td className="px-4 py-3">Europe / UK</td><td className="px-4 py-3">7-10 business days</td><td className="px-4 py-3">3-5 business days</td></tr>
                  <tr><td className="px-4 py-3">North America</td><td className="px-4 py-3">7-12 business days</td><td className="px-4 py-3">3-5 business days</td></tr>
                  <tr><td className="px-4 py-3">Rest of World</td><td className="px-4 py-3">10-15 business days</td><td className="px-4 py-3">5-7 business days</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Shipping Rates</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Free standard shipping</strong> on orders over $75 worldwide.</li>
              <li>Standard shipping flat rate: $7 (India) / $15 (international).</li>
              <li>Express shipping calculated at checkout based on destination and weight.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Carriers</h2>
            <p>
              We ship via DHL, FedEx, India Post, and Aramex depending on destination. You'll receive
              the carrier name and tracking link in your shipping confirmation email.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Customs, Duties & Taxes</h2>
            <p>
              International orders may be subject to import duties and taxes levied by your country.
              These are the responsibility of the recipient and are not included in our prices or
              shipping fees.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Lost or Delayed Packages</h2>
            <p>
              If your order hasn't arrived within the estimated window, please contact us at
              <a href="mailto:support@fawzaan.store" className="text-gold-deep underline"> support@fawzaan.store</a>.
              We'll open a trace with the carrier and either reship or refund as appropriate.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">Incorrect Addresses</h2>
            <p>
              Please double-check your shipping address at checkout. We are not responsible for
              packages lost due to incorrect addresses. Address changes after shipment may incur an
              additional fee.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
