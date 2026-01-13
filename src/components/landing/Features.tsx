import { motion } from "framer-motion";
import { 
  BarChart3, 
  TestTube, 
  Map, 
  Bot, 
  Cloud, 
  Package, 
  Camera, 
  FileText,
  Leaf,
  ScanEye
} from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/animations";

const features = [
  {
    icon: BarChart3,
    title: "Executive Farm Dashboard",
    description: "Real-time KPIs, trends, and performance metrics across all your operations in one unified view.",
  },
  {
    icon: TestTube,
    title: "Soil Health Monitoring",
    description: "Track NPK levels, pH trends, and soil composition over time with historical analysis.",
  },
  {
    icon: Map,
    title: "Visual Field Mapping",
    description: "Interactive maps showing field health status, problem areas, and intervention zones.",
  },
  {
    icon: Bot,
    title: "AI Crop Intelligence",
    description: "Predictive analytics for yield forecasting, risk analysis, and treatment recommendations.",
  },
  {
    icon: ScanEye,
    title: "Cassava Disease Detection",
    description: "ML-powered leaf scanning to detect CMD, CBSD, and other diseases with 95%+ accuracy.",
  },
  {
    icon: Cloud,
    title: "Microclimate Insights",
    description: "Live weather data with spray window predictions and irrigation scheduling.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Track seeds, fertilizers, and chemicals with usage forecasts and reorder alerts.",
  },
  {
    icon: Camera,
    title: "Photo-Based Evidence",
    description: "Geo-tagged field photos for documentation, compliance, and historical records.",
  },
  {
    icon: FileText,
    title: "Seasonal Reporting",
    description: "Automated compliance reports, seasonal summaries, and export-ready documentation.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Enterprise Features
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Everything You Need to Run Your Farm
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Comprehensive tools designed for large-scale agricultural operations — from field scouting to executive reporting.
          </p>
        </ScrollReveal>
        
        {/* Features Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6" staggerDelay={0.08}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={staggerItemVariants}
              whileHover={{ 
                y: -8, 
                transition: { type: "spring", stiffness: 300 } 
              }}
              className="group relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Hover Gradient */}
              <motion.div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative">
                {/* Icon */}
                <motion.div 
                  className="w-10 sm:w-11 lg:w-12 h-10 sm:h-11 lg:h-12 rounded-lg sm:rounded-xl bg-emerald-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-emerald-500 group-hover:shadow-emerald transition-all"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-5 sm:w-5 lg:w-6 h-5 sm:h-5 lg:h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </motion.div>
                
                {/* Content */}
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Features;
