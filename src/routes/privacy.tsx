import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Fawzaan.store" },
      { name: "description", content: "How Fawzaan Store collects, uses, and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
        <p className="eyebrow text-gold-deep mb-3">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl mb-2">Privacy Policy</h1>
        <p className="text-sm text-ink/60 mb-10">Last updated: June 27, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-6 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">1. Introduction</h2>
            <p>
              Fawzaan Store ("we", "us", "our") respects your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you visit fawzaan.store or make
              a purchase from us. By using our website, you consent to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">2. Information We Collect</h2>
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal details</strong> - name, email address, shipping address, phone number.</li>
              <li><strong>Payment information</strong> - processed securely through Razorpay; we do not store full card numbers on our servers.</li>
              <li><strong>Order history</strong> - products purchased, dates, and amounts.</li>
              <li><strong>Technical data</strong> - IP address, browser type, device information, and cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and fulfil your orders.</li>
              <li>To send order confirmations, shipping updates, and customer service replies.</li>
              <li>To improve our website, products, and customer experience.</li>
              <li>To send marketing emails (only if you opt in - you may unsubscribe at any time).</li>
              <li>To detect fraud and comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell your personal data. We share information only with trusted service providers
              who help us run our business - payment processors (Razorpay), shipping carriers, and
              email service providers. These partners are contractually bound to protect your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">5. Data Security</h2>
            <p>
              We use industry-standard encryption (SSL/TLS) and secure servers to protect your data.
              While no method of transmission over the internet is 100% secure, we strive to use
              commercially acceptable means to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">6. Cookies</h2>
            <p>
              We use cookies to remember your cart, improve site performance, and analyse traffic. You
              can disable cookies in your browser settings, but some features of the site may not work
              as intended.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">7. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal data at any time by
              contacting us at <a href="mailto:support@fawzaan.store" className="text-gold-deep underline">support@fawzaan.store</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an
              updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-3">9. Contact</h2>
            <p>
              Questions about this policy? Email <a href="mailto:support@fawzaan.store" className="text-gold-deep underline">support@fawzaan.store</a>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
