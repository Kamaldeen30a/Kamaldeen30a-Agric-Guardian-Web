import { motion } from "framer-motion";
import { Brain, TrendingUp, Shield, MessageSquare, ScanEye } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItemVariants, ParallaxSection } from "@/components/animations";

const capabilities = [
  {
    icon: TrendingUp,
    title: "Yield Prediction",
    description: "Forecast crop performance with machine learning models trained on historical data.",
    accuracy: "94%",
  },
  {
    icon: ScanEye,
    title: "Cassava Leaf Detection",
    description: "ML-powered image analysis to identify CMD, CBSD, CGM, and healthy leaves instantly.",
    accuracy: "95%",
  },
  {
    icon: Shield,
    title: "Risk Identification",
    description: "Early detection of pest, disease, and environmental risks before they impact yields.",
    accuracy: "91%",
  },
  {
    icon: Brain,
    title: "Treatment Plans",
    description: "AI-generated intervention recommendations with cost-benefit analysis.",
    accuracy: "89%",
  },
  {
    icon: MessageSquare,
    title: "Expert Assistant",
    description: "Natural language Q&A for instant insights about your farm operations.",
    accuracy: "Live",
  },
];

const badges = [
  "95% Cassava Disease Detection",
  "94% Yield Prediction Accuracy",
  "AI-Generated Treatment Plans",
  "Live Expert Assistant",
];

export const AIIntelligence = () => {
  return (
    <section id="ai-intelligence" className="py-16 sm:py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900 to-slate-900" />
      <ParallaxSection speed={0.2}>
        <div className="absolute top-1/4 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </ParallaxSection>
      <ParallaxSection speed={0.3} direction="down">
        <div className="absolute bottom-1/4 right-0 w-48 sm:w-60 lg:w-72 h-48 sm:h-60 lg:h-72 bg-emerald-600/10 rounded-full blur-3xl" />
      </ParallaxSection>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Content */}
          <ScrollReveal x={-30} y={0}>
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-emerald-500/30">
              Powered by Advanced AI
            </span>
            
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
              AI-Powered Decision Support
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8">
              Our AI engine analyzes field data, weather patterns, and historical trends to provide actionable intelligence. Built on advanced models with secure, on-premise processing for maximum data privacy.
            </p>
            
            {/* Badges */}
            <motion.div 
              className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {badges.map((badge, index) => (
                <motion.span
                  key={badge}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </ScrollReveal>
          
          {/* Capabilities Grid */}
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-4" staggerDelay={0.12}>
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                variants={staggerItemVariants}
                whileHover={{ scale: 1.03, borderColor: "rgba(16, 185, 129, 0.5)" }}
                className="group relative p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300"
              >
                {/* Icon */}
                <motion.div 
                  className="w-9 sm:w-10 lg:w-12 h-9 sm:h-10 lg:h-12 rounded-lg sm:rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 sm:mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <cap.icon className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-emerald-400" />
                </motion.div>
                
                {/* Accuracy Badge */}
                <motion.div 
                  className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold">
                    {cap.accuracy}
                  </span>
                </motion.div>
                
                {/* Content */}
                <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default AIIntelligence;
