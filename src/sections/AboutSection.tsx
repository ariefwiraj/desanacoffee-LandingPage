import { motion } from 'framer-motion';
import { Coffee, Users, Clock } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
                alt="Barista brewing coffee" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary rounded-full -z-10 opacity-20 blur-2xl" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent rounded-full -z-10 opacity-20 blur-xl" />
            
            {/* Experience Badge */}
            <div className="absolute bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-xl shadow-xl max-w-[200px]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">5+</div>
                  <div className="text-sm text-foreground/70 font-medium">Years of Brewing</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-medium tracking-wider uppercase">Our Story</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              Lebih Dari Sekadar <br /> Secangkir Kopi
            </h2>
            
            <div className="space-y-6 text-foreground/80 text-lg">
              <p>
                Desana Coffee lahir dari passion kami terhadap biji kopi pilihan dan suasana ngobrol yang hangat. Kami percaya setiap cangkir memiliki ceritanya sendiri.
              </p>
              <p>
                Biji kopi kami di-roast dengan teliti untuk mengeluarkan profil rasa terbaiknya. Dipadukan dengan keahlian barista kami, setiap tegukan adalah sebuah pengalaman.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-2 text-primary font-serif text-xl font-semibold">
                  <Users className="w-5 h-5 text-accent" />
                  Community
                </div>
                <p className="text-foreground/70">Ruang nyaman untuk bertemu dan berkolaborasi.</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2 text-primary font-serif text-xl font-semibold">
                  <Clock className="w-5 h-5 text-accent" />
                  Quality Time
                </div>
                <p className="text-foreground/70">Ciptakan momen berharga bersama yang terkasih.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
