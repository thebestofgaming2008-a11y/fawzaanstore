import { Link } from "@tanstack/react-router";
import logo from "@/assets/fawzaan-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="Fawzaan Store" width={48} height={48} className="h-12 w-12 rounded-full bg-ivory" />
              <span className="font-display text-2xl">Fawzaan <span className="text-gold">Store</span></span>
            </div>
            <p className="mt-5 max-w-md text-sm text-ivory/70 leading-relaxed">
              Crafted essentials for the modern Muslim. Heritage textiles, modest accessories,
              and pure honey — sourced and stitched with intention.
            </p>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li><Link to="/shemaghs" className="hover:text-gold">Shemaghs</Link></li>
              <li><Link to="/niqabs" className="hover:text-gold">Niqabs</Link></li>
              <li><Link to="/gloves" className="hover:text-gold">Gloves</Link></li>
              <li><Link to="/honey" className="hover:text-gold">Honey</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li>Shipping & Returns</li>
              <li>Sizing Guide</li>
              <li>Care Instructions</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Fawzaan Store. All rights reserved.</p>
          <p>Free worldwide shipping over $75 · Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
