import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/fawzaan-logo-mark.png";
import { useCurrency } from "@/lib/currency";
import { FREE_SHIP_THRESHOLD } from "@/lib/shipping";

export function SiteFooter() {
  const { format } = useCurrency();

  return (
    <footer className="border-t border-ink/10 bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img
              src={logoMark}
              alt="Fawzaan Store"
              width={280}
              height={120}
              className="h-16 w-auto object-contain md:h-20"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70">
              Crafted essentials for the modern Muslim. Heritage textiles, modest accessories, and
              pure honey - sourced and stitched with intention.
            </p>
          </div>
          <div>
            <h4 className="eyebrow mb-4 text-gold-deep">Shop</h4>
            <ul className="space-y-2 text-sm text-ink/75">
              <li>
                <Link to="/shemaghs" className="transition hover:text-gold-deep">
                  Shemaghs
                </Link>
              </li>
              <li>
                <Link to="/niqabs" className="transition hover:text-gold-deep">
                  Niqabs
                </Link>
              </li>
              <li>
                <Link to="/kufis" className="transition hover:text-gold-deep">
                  Kufis
                </Link>
              </li>
              <li>
                <Link to="/gloves" className="transition hover:text-gold-deep">
                  Gloves
                </Link>
              </li>
              <li>
                <Link to="/honey" className="transition hover:text-gold-deep">
                  Honey
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4 text-gold-deep">Support</h4>
            <ul className="space-y-2 text-sm text-ink/75">
              <li>
                <Link to="/faq" className="transition hover:text-gold-deep">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="transition hover:text-gold-deep">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="transition hover:text-gold-deep">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-gold-deep">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-gold-deep">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/60">
          <Link to="/privacy" className="transition hover:text-gold-deep">
            Privacy Policy
          </Link>
          <Link to="/terms" className="transition hover:text-gold-deep">
            Terms & Conditions
          </Link>
          <Link to="/returns" className="transition hover:text-gold-deep">
            Return & Refund Policy
          </Link>
          <Link to="/shipping" className="transition hover:text-gold-deep">
            Shipping Policy
          </Link>
          <Link to="/contact" className="transition hover:text-gold-deep">
            Contact
          </Link>
          <Link to="/about" className="transition hover:text-gold-deep">
            About
          </Link>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Fawzaan Store. All rights reserved.</p>
          <p>Free worldwide shipping over {format(FREE_SHIP_THRESHOLD)} - Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
