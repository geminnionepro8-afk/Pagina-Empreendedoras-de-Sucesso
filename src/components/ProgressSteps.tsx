import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Seus Dados" },
  { number: 2, label: "Pagamento" },
  { number: 3, label: "Confirmação" },
];

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-sm mx-auto">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4, type: "spring", bounce: 0.3 }}
                className={`relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                  isCompleted
                    ? "bg-[#ee6983] text-white shadow-[0_0_16px_rgba(238,105,131,0.5)]"
                    : isActive
                    ? "bg-[#ee6983]/20 border-2 border-[#ee6983] text-[#ee6983] shadow-[0_0_12px_rgba(238,105,131,0.3)]"
                    : "bg-white/5 border border-white/15 text-white/30"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                ) : (
                  <span>{step.number}</span>
                )}
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-[#ee6983]/40 animate-ping opacity-60" />
                )}
              </motion.div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-[#ee6983]" : isCompleted ? "text-white/60" : "text-white/20"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-3 mb-5 relative overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ee6983] to-[#c04a61]"
                  initial={{ width: "0%" }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
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
