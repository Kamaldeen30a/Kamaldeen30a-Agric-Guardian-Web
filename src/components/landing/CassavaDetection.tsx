import { motion } from "framer-motion";
import { ScanEye, CheckCircle, AlertTriangle, Upload, Zap } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/animations";

import cassavaHealthy from "@/assets/cassava-healthy.png";
import cassavaCMD from "@/assets/cassava-cmd.png";
import cassavaCBSD from "@/assets/cassava-cbsd.png";
import cassavaCGM from "@/assets/cassava-cgm.png";

const diseaseTypes = [
  {
    name: "Healthy Leaf",
    image: cassavaHealthy,
    status: "healthy",
    description: "Vibrant green color, no visible spots or discoloration",
    confidence: "98%",
  },
  {
    name: "Cassava Mosaic Disease",
    image: cassavaCMD,
    status: "disease",
    description: "Yellow-green mosaic patterns with distorted leaf shape",
    confidence: "95%",
  },
  {
    name: "Brown Streak Disease",
    image: cassavaCBSD,
    status: "disease",
    description: "Yellow patches with brown necrotic lesions on leaves",
    confidence: "94%",
  },
  {
    name: "Green Mite Damage",
    image: cassavaCGM,
    status: "pest",
    description: "Yellowing and stippling from mite infestation",
    confidence: "92%",
  },
];

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Simply snap a photo of your cassava leaves using your phone",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get disease diagnosis in seconds with confidence scores",
  },
  {
    icon: CheckCircle,
    title: "Treatment Advice",
    description: "Receive actionable recommendations for disease management",
  },
];

export const CassavaDetection = () => {
  return (
    <section id="cassava-detection" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-emerald-500/30"
          >
            <ScanEye className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
          </motion.div>
          
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            ML-Powered Detection
          </span>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Cassava Leaf Disease Detection
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Our advanced machine learning model instantly identifies common cassava diseases from leaf images, 
            helping farmers take early action to protect their crops and maximize yields.
          </p>
        </ScrollReveal>

        {/* Disease Cards Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16" staggerDelay={0.1}>
          {diseaseTypes.map((disease, index) => (
            <motion.div
              key={disease.name}
              variants={staggerItemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <motion.img
                  src={disease.image}
                  alt={disease.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 ${
                    disease.status === "healthy"
                      ? "bg-emerald-500 text-white"
                      : disease.status === "disease"
                      ? "bg-red-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {disease.status === "healthy" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  <span className="hidden sm:inline">{disease.confidence}</span>
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 mb-1">
                  {disease.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {disease.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* How It Works */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-100">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 text-center mb-6 sm:mb-8">
              How It Works
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  >
                    <feature.icon className="w-6 sm:w-7 h-6 sm:h-7 text-emerald-600" />
                  </motion.div>
                  
                  <div className="text-lg sm:text-xl font-bold text-emerald-600 mb-1">
                    Step {index + 1}
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Accuracy Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-100"
            >
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">95%+</div>
                  <div className="text-xs sm:text-sm text-slate-500">Detection Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">&lt;3s</div>
                  <div className="text-xs sm:text-sm text-slate-500">Analysis Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">4+</div>
                  <div className="text-xs sm:text-sm text-slate-500">Disease Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">24/7</div>
                  <div className="text-xs sm:text-sm text-slate-500">Availability</div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CassavaDetection;
