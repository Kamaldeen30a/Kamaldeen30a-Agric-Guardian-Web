import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import { Atom, Paintbrush, Database, Brain, Shield } from "lucide-react";

const technologies = [
  { name: "React + TypeScript", description: "Modern Frontend", icon: Atom, color: "#61DAFB" },
  { name: "Tailwind CSS", description: "Design System", icon: Paintbrush, color: "#06B6D4" },
  { name: "Supabase + PostgreSQL", description: "Database", icon: Database, color: "#3ECF8E" },
  { name: "AI-Powered Analytics", description: "Intelligence", icon: Brain, color: "#8B5CF6" },
  { name: "Secure Cloud", description: "Infrastructure", icon: Shield, color: "#F59E0B" },
];

// Duplicate for seamless loop
const duplicatedTechnologies = [...technologies, ...technologies];

export const TechnologyTrust = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-sm text-slate-500 mb-10 tracking-wide uppercase">
            Built with modern, production-grade technology
          </p>
        </ScrollReveal>
      </div>
      
      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Track */}
        <motion.div
          className="flex gap-12 py-4"
          animate={{
            x: [0, -50 * technologies.length * 4],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 shrink-0 min-w-[280px] hover:border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${tech.color}15` }}
              >
                <tech.icon 
                  className="w-6 h-6" 
                  style={{ color: tech.color }}
                />
              </div>
              
              {/* Text */}
              <div>
                <p className="font-semibold text-slate-800 whitespace-nowrap">
                  {tech.name}
                </p>
                <p className="text-xs text-slate-500">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyTrust;
