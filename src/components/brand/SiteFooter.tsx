import { Link } from "@tanstack/react-router";
import logo from "@/assets/fawzaan-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-cream text-ink border-t border-ink/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logo.url} alt="Fawzaan Store" width={280} height={120} className="h-16 md:h-20 w-auto object-contain" />

            <p className="mt-5 max-w-md text-sm text-ink/70 leading-relaxed">
              Crafted essentials for the modern Muslim. Heritage textiles, modest accessories,
              and pure honey — sourced and stitched with intention.
            </p>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-ink/75">
              <li><Link to="/shemaghs" className="hover:text-gold-deep">Shemaghs</Link></li>
              <li><Link to="/niqabs" className="hover:text-gold-deep">Niqabs</Link></li>
              <li><Link to="/kufis" className="hover:text-gold-deep">Kufis</Link></li>
              <li><Link to="/gloves" className="hover:text-gold-deep">Gloves</Link></li>
              <li><Link to="/honey" className="hover:text-gold-deep">Honey</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-ink/75">
              <li><Link to="/faq" className="hover:text-gold-deep">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-gold-deep">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-gold-deep">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-gold-deep">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-gold-deep">About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/60">
          <Link to="/privacy" className="hover:text-gold-deep">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gold-deep">Terms & Conditions</Link>
          <Link to="/returns" className="hover:text-gold-deep">Return & Refund Policy</Link>
          <Link to="/shipping" className="hover:text-gold-deep">Shipping Policy</Link>
          <Link to="/contact" className="hover:text-gold-deep">Contact</Link>
          <Link to="/about" className="hover:text-gold-deep">About</Link>
        </div>
        <div className="mt-12 pt-6 border-t border-ink/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-ink/50">
          <p>© {new Date().getFullYear()} Fawzaan Store. All rights reserved.</p>
          <p>Free worldwide shipping over $75 · Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
