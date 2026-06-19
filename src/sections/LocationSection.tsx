import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation } from 'lucide-react';

export function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-32 bg-muted/20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* KOTAK KONTAINER UTAMA */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl backdrop-blur-sm">
          
          {/* Grid Layout internal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Info Column (Kiri) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Teks FIND US */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent" />
                <span className="text-accent font-medium tracking-wider uppercase">Find Us</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight">
                Mampir ke <br className="hidden md:block" /> Tempat Kami
              </h2>

              <div className="space-y-8 mb-10">
                {/* Alamat Lengkap */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-2">Alamat Lengkap</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Jl. Kopi Harum No. 123, Kelurahan Seduh,<br />
                      Kecamatan Senja, Kota Kenangan, 12345
                    </p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-2">Jam Operasional</h3>
                    <div className="space-y-1 text-foreground/80">
                      <p className="flex justify-between gap-4 max-w-[250px]">
                        <span>Senin - Jumat:</span>
                        <span className="font-medium">08:00 - 22:00</span>
                      </p>
                      <p className="flex justify-between gap-4 max-w-[250px]">
                        <span>Sabtu - Minggu:</span>
                        <span className="font-medium">07:00 - 23:00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. TOMBOL DESKTOP: Hanya muncul di layar besar (lg:inline-flex), tersembunyi di mobile (hidden) */}
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="hidden lg:inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:gap-3"
              >
                <Navigation className="w-5 h-5" />
                <span>Open in Google Maps</span>
              </a>
            </motion.div>

            {/* Map Column (Kanan) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              {/* Bingkai Gmaps Embed */}
              <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md border border-border">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009765804!2d106.745672!3d-6.229728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Desana Coffee Location"
                ></iframe>
              </div>

              {/* 2. TOMBOL MOBILE: Hanya muncul di layar kecil hingga tablet (block lg:hidden) */}
              <div className="w-full block lg:hidden">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-sm active:scale-[0.99]"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}