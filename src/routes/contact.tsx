import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Fawzaan.store" },
      { name: "description", content: "Get in touch with the Fawzaan Store team — email, phone, and business address." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 md:px-8 py-16 md:py-24">
        <p className="eyebrow text-gold-deep mb-3">Get in touch</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p className="text-ink/70 max-w-2xl mb-12">
          We're here to help with orders, products, sizing, or wholesale enquiries. Our team aims to
          respond within one business day.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-gold-deep" />
              </div>
              <div>
                <h3 className="font-display text-xl">Email</h3>
                <p className="text-sm text-ink/70">General: <a href="mailto:support@fawzaan.store" className="text-gold-deep underline">support@fawzaan.store</a></p>
                <p className="text-sm text-ink/70">Returns: <a href="mailto:returns@fawzaan.store" className="text-gold-deep underline">returns@fawzaan.store</a></p>
                <p className="text-sm text-ink/70">Wholesale: <a href="mailto:wholesale@fawzaan.store" className="text-gold-deep underline">wholesale@fawzaan.store</a></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-gold-deep" />
              </div>
              <div>
                <h3 className="font-display text-xl">Phone & WhatsApp</h3>
                <p className="text-sm text-ink/70">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-gold-deep" />
              </div>
              <div>
                <h3 className="font-display text-xl">Registered Address</h3>
                <p className="text-sm text-ink/70">Fawzaan Trading Co.<br />221, Heritage Lane, Bengaluru,<br />Karnataka 560001, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-gold-deep" />
              </div>
              <div>
                <h3 className="font-display text-xl">Hours</h3>
                <p className="text-sm text-ink/70">Mon – Sat: 10:00 – 19:00 IST<br />Sun: Closed</p>
              </div>
            </div>
          </div>

          <form className="bg-cream p-8 rounded-md space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h2 className="font-display text-2xl mb-2">Send us a message</h2>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Name</label>
              <input type="text" required className="w-full px-3 py-2.5 border border-ink/15 bg-ivory rounded text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" required className="w-full px-3 py-2.5 border border-ink/15 bg-ivory rounded text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Subject</label>
              <input type="text" className="w-full px-3 py-2.5 border border-ink/15 bg-ivory rounded text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Message</label>
              <textarea rows={5} required className="w-full px-3 py-2.5 border border-ink/15 bg-ivory rounded text-sm focus:outline-none focus:border-gold" />
            </div>
            <button type="submit" className="w-full bg-ink text-ivory py-3 text-sm font-medium tracking-wider uppercase hover:bg-gold-deep transition-colors">
              Send message
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
