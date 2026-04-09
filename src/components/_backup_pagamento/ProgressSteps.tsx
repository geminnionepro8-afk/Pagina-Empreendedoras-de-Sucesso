import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

interface ProgressStepsProps {
  currentStep: number;
  steps: Step[];
}

const ProgressSteps = ({ currentStep, steps }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto px-4 py-8">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2 relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4, type: "spring", bounce: 0.3 }}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 z-10 ${
                  isCompleted
                    ? "bg-[#ee6983] text-white shadow-[0_0_16px_rgba(238,105,131,0.5)]"
                    : isActive
                    ? "bg-[#ee6983]/20 border-2 border-[#ee6983] text-[#ee6983] shadow-[0_0_12px_rgba(238,105,131,0.3)]"
                    : "bg-white/5 border border-white/10 text-white/50"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" strokeWidth={2.5} />
                ) : (
                  <span>{step.number}</span>
                )}
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-[#ee6983]/40 animate-ping opacity-60" />
                )}
              </motion.div>
              <span
                className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 absolute -bottom-6 left-1/2 -translate-x-1/2 text-center w-max ${
                  isActive ? "text-[#ee6983]" : isCompleted ? "text-white/60" : "text-white/35"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 relative overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ee6983] to-[#c04a61]"
                  initial={{ width: "0%" }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
