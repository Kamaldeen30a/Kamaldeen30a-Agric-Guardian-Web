import { motion } from "framer-motion";
import { Shield, Smartphone, BarChart3, Zap } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItemVariants, ParallaxBackground } from "@/components/animations";

const steps = [
  {
    number: "01",
    title: "Connect Your Farm",
    description: "Secure authentication ensures each farm operates in its own protected workspace with enterprise-grade data isolation.",
    icon: Shield,
  },
  {
    number: "02",
    title: "Scout Fields in the Real World",
    description: "Our mobile scouting app enables offline-first data capture with GPS, photos, and severity tagging directly in the field.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Analyze in the Command Center",
    description: "The desktop dashboard aggregates all field data — soil health trends, risks, inventory status, and live microclimate advisories.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Act with Confidence",
    description: "AI-suggested treatments, risk mitigation plans, and seasonal reports empower you to make data-driven decisions.",
    icon: Zap,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements with Parallax */}
      <ParallaxBackground 
        className="absolute top-0 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-emerald-100/50 rounded-full blur-3xl"
        speed={0.3}
      />
      <ParallaxBackground 
        className="absolute bottom-0 right-1/4 w-48 sm:w-60 lg:w-72 h-48 sm:h-60 lg:h-72 bg-emerald-50/60 rounded-full blur-3xl"
        speed={0.5}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Streamlined Workflow
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            How It Works
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            A seamless workflow from field to dashboard — designed for enterprise-scale operations.
          </p>
        </ScrollReveal>
        
        {/* Steps Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-8" staggerDelay={0.15}>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={staggerItemVariants}
              className="relative group"
            >
              {/* Connector Line - Hidden on mobile and tablet */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  style={{ originX: 0 }}
                />
              )}
              
              <motion.div 
                className="glass-card p-4 sm:p-5 lg:p-6 xl:p-8 h-full rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step Number */}
                <motion.span 
                  className="inline-block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-emerald-200 mb-3 sm:mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {step.number}
                </motion.span>
                
                {/* Icon */}
                <motion.div 
                  className="w-11 sm:w-12 lg:w-14 h-11 sm:h-12 lg:h-14 rounded-xl sm:rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-emerald-500 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-emerald-600 group-hover:text-white transition-colors" />
                </motion.div>
                
                {/* Content */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default HowItWorks;
