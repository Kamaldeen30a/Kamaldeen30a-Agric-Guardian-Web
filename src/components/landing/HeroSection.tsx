import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const floatingCard1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const floatingCard2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Decorative Elements with Parallax - hidden on small screens for performance */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-1/4 left-10 w-48 md:w-72 h-48 md:h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-soft" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        className="absolute bottom-1/4 right-10 w-64 md:w-96 h-64 md:h-96 bg-emerald-100/40 rounded-full blur-3xl animate-pulse-soft animation-delay-200" 
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="max-w-2xl order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
              Enterprise Farm Management Platform
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 sm:mb-6"
            >
              The Command Center for{" "}
              <span className="text-gradient">Modern Agriculture.</span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-3 sm:mb-4"
            >
              Agri-Guardian Web gives large-scale farm owners a real-time, AI-powered view of their entire operation — from soil health and inventory to predictive crop intelligence.
            </motion.p>
            
            {/* Supporting text */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8"
            >
              Designed as the desktop control hub for mobile field scouting teams.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button variant="hero" size="xl" className="group w-full sm:w-auto" asChild>
                <a href="#final-cta">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" className="group w-full sm:w-auto" asChild>
                <a href="#features">
                  <Play className="w-5 h-5" />
                  Explore the Platform
                </a>
              </Button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200"
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-lg sm:text-2xl font-bold text-slate-900">50K+</p>
                <p className="text-xs sm:text-sm text-slate-500">Hectares</p>
              </motion.div>
              <div className="hidden sm:block w-px h-12 bg-slate-200" />
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-lg sm:text-2xl font-bold text-slate-900">500+</p>
                <p className="text-xs sm:text-sm text-slate-500">Farms</p>
              </motion.div>
              <div className="hidden sm:block w-px h-12 bg-slate-200" />
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-lg sm:text-2xl font-bold text-emerald-600">99.9%</p>
                <p className="text-xs sm:text-sm text-slate-500">Uptime</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <div className="relative order-1 lg:order-2 lg:pl-8">
            <motion.div 
              className="relative"
              style={{ y: heroImageY, scale: heroImageScale }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Main Dashboard Preview */}
              <motion.div 
                className="glass-card p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={heroDashboard}
                  alt="Agri-Guardian Web Dashboard Preview"
                  className="w-full rounded-xl sm:rounded-2xl"
                  loading="eager"
                />
              </motion.div>
              
              {/* Floating KPI Card - Hidden on mobile */}
              <motion.div 
                className="absolute -left-4 sm:-left-8 top-1/4 glass-card p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hidden sm:block"
                style={{ y: floatingCard1Y }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-100 flex items-center justify-center">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500">Yield Forecast</p>
                    <p className="text-lg sm:text-xl font-bold text-slate-900">+23%</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Status Card - Hidden on mobile */}
              <motion.div 
                className="absolute -right-2 sm:-right-4 bottom-1/4 glass-card p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hidden sm:block"
                style={{ y: floatingCard2Y }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-900">All Systems Healthy</p>
                    <p className="text-[10px] sm:text-xs text-slate-500">12 fields monitored</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
