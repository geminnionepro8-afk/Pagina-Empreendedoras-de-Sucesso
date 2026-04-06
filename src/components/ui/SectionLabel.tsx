import { FaRibbon } from "react-icons/fa";

export const PinkRibbon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <FaRibbon className={className} />
);

interface SectionLabelProps {
  text: string;
  centered?: boolean;
}

const SectionLabel = ({ text, centered = false }: SectionLabelProps) => (
  <div className={`flex items-center gap-3 mb-6 ${centered ? "justify-center" : "justify-start"}`}>
    <PinkRibbon className="w-5 h-5 text-[#ee6983]" />
    <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
      {text}
    </p>
  </div>
);

export default SectionLabel;
