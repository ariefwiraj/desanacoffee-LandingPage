import { MapPin } from 'lucide-react';
import { InstagramIcon as Instagram } from '@/components/InstagramIcon';
import { scrollToTarget } from '@/components/Navbar';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <a 
              href="#home" 
              onClick={(e) => scrollToTarget(e, 'home')}
              className="inline-block text-3xl font-serif font-bold text-white tracking-wide mb-6"
            >
              Desana<span className="text-accent">.</span>
            </a>
            <p className="text-white/70 max-w-sm mb-8 leading-relaxed">
              Lebih dari sekadar kedai kopi. Kami menyajikan pengalaman, kehangatan, dan momen tak terlupakan dalam setiap cangkir.
            </p>
            {/* <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-accent text-white hover:text-accent-foreground transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Menu', 'Gallery', 'Location'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => scrollToTarget(e, link.toLowerCase())}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white tracking-wide">Connect</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 text-accent" />
                <span>
                  Jl. Kopi Harum No. 123,<br />
                  Kota Kenangan, 12345
                </span>
              </li>
              <li className="flex gap-3 text-white/70">
                <Instagram className="w-5 h-5 flex-shrink-0 text-accent" />
                <a href="https://www.instagram.com/desanacoffee/" className="hover:text-accent transition-colors">
                  @desanacoffee
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Desana Coffee. All rights reserved.
          </p>
          {/* <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
