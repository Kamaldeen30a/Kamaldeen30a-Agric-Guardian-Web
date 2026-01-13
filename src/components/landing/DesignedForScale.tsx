import { motion } from "framer-motion";
import { Globe, Layers, Wifi, Lock, Cloud } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItemVariants, ParallaxBackground } from "@/components/animations";

const scaleFeatures = [
  {
    icon: Globe,
    text: "Built for thousands of hectares",
  },
  {
    icon: Layers,
    text: "Multi-field, multi-season analysis",
  },
  {
    icon: Wifi,
    text: "Works online and offline",
  },
  {
    icon: Lock,
    text: "Secure, role-based data isolation",
  },
  {
    icon: Cloud,
    text: "Frontend-first, cloud-native architecture",
  },
];

export const DesignedForScale = () => {
  return (
    <section className="py-20 bg-emerald-50 relative overflow-hidden">
      {/* Decorative Elements with Parallax */}
      <ParallaxBackground 
        className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl"
        speed={0.4}
      />
      <ParallaxBackground 
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-100/50 rounded-full blur-3xl"
        speed={0.6}
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Designed for Scale
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enterprise infrastructure built to grow with your operation.
          </p>
        </ScrollReveal>
        
        <StaggerContainer className="flex flex-wrap justify-center gap-4 lg:gap-6" staggerDelay={0.1}>
          {scaleFeatures.map((feature, index) => (
            <motion.div
              key={feature.text}
              variants={staggerItemVariants}
              whileHover={{ 
                y: -4, 
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.2)"
              }}
              className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-md transition-all"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-5 h-5 text-emerald-600" />
              </motion.div>
              <span className="text-slate-700 font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default DesignedForScale;
