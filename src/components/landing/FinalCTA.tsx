import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn } from "lucide-react";
import { ScrollReveal } from "@/components/animations";

export const FinalCTA = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Background Effects with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800/20 via-transparent to-transparent"
        style={{ y: backgroundY }}
      />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      {/* Animated Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
        style={{ scale: glowScale }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <ScrollReveal>
            <motion.h2 
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              See Your Entire Farm{" "}
              <motion.span 
                className="text-emerald-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Clearly.
              </motion.span>
            </motion.h2>
          </ScrollReveal>
          
          {/* Subtext */}
          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
              Move from reactive farming to predictive, data-driven decisions. Start your journey to smarter agriculture today.
            </p>
          </ScrollReveal>
          
          {/* CTAs */}
          <ScrollReveal delay={0.3}>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/signup">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="group bg-emerald-500 hover:bg-emerald-400 shadow-emerald"
                  >
                    Start Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/login">
                  <Button 
                    variant="heroOutline" 
                    size="xl" 
                    className="border-slate-500 text-white hover:bg-white/10 hover:border-white/50"
                  >
                    <LogIn className="w-5 h-5" />
                    Login to Command Center
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </ScrollReveal>
          
          {/* Trust Note */}
          <ScrollReveal delay={0.4}>
            <motion.p 
              className="mt-8 text-sm text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              No credit card required • 14-day free trial • Enterprise support available
            </motion.p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
