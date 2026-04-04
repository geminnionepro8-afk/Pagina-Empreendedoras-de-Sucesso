import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const teamMembers = [
  {
    name: "Dr. Emily Roberts",
    experience: "12 years in care.",
    image:
      "https://cdn.prod.website-files.com/682982f2b42d35f376f2394e/6829a9de92753bf25250f312_Team%20Member%2001.png",
  },
  {
    name: "Dr. Thomas White",
    experience: "Trauma-informed care",
    image:
      "https://cdn.prod.website-files.com/682982f2b42d35f376f2394e/6829a9e1c3307b20d8b6aa2f_Team%20Member%2002.png",
  },
  {
    name: "Dr. Sarah Williams",
    experience: "Emotional Wellness Advisor",
    image:
      "https://cdn.prod.website-files.com/682982f2b42d35f376f2394e/6829a9e4d1fcf5b498d9c8a7_Team%20Member%2003.png",
  },
  {
    name: "Dr. Jessica Brown",
    experience: "8 years in holistic care",
    image:
      "https://cdn.prod.website-files.com/682982f2b42d35f376f2394e/6829a9e7b6c51a1f3e1cdfe5_Team%20Member%2004.png",
  },
  {
    name: "Dr. Michael Chen",
    experience: "Cognitive Behavioral Therapy",
    image:
      "https://cdn.prod.website-files.com/682982f2b42d35f376f2394e/6829a9ea03a6aa6ae7ee5e41_Team%20Member%2005.png",
  },
  {
    name: "Dr. Lisa Anderson",
    experience: "Family & Group Therapy",
    image:
      "https://cdn.prod.website-files.com/682982f2b42d35f376f2394e/6829a9ed7d1735c8e8b1a3f9_Team%20Member%2006.png",
  },
];

const TeamSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0a]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#ee6983] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ee6983] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div {...fadeUp} className="space-y-4 max-w-2xl">
            {/* Caption badge */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block w-8 h-[1px] bg-[#ee6983]/50" />
              <p className="text-[#ee6983] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
                Team Member
              </p>
              <div className="hidden sm:block w-8 h-[1px] bg-[#ee6983]/50" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tighter leading-tight">
              People Behind <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                The Healing Work.
              </span>
            </h2>
          </motion.div>

          {/* CTA button */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.15 }}
          >
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#850e35] to-[#ee6983] hover:from-[#9a1240] hover:to-[#f07f9b] text-white px-7 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(238,105,131,0.25)] hover:shadow-[0_0_30px_rgba(238,105,131,0.4)]"
            >
              <span className="text-sm">Our Therapists</span>
              <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-45"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="team-flip-card"
            >
              <div className="team-flip-inner">
                {/* ── Front Face ── */}
                <div className="team-flip-face team-flip-front">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay at bottom for name hint */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-bold text-lg uppercase tracking-wider drop-shadow-lg">
                      {member.name}
                    </p>
                  </div>
                </div>

                {/* ── Back Face ── */}
                <div className="team-flip-face team-flip-back">
                  <div className="flex flex-col items-center justify-center h-full gap-5 p-8">
                    {/* Mini avatar */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#ee6983]/30 shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-white font-black text-2xl uppercase tracking-wide text-center leading-tight">
                      {member.name}
                    </h3>

                    {/* Experience */}
                    <div className="text-center">
                      <span className="text-[#ee6983] text-xs font-bold uppercase tracking-[0.2em]">
                        Experience:
                      </span>
                      <p className="text-white/60 text-sm mt-1">{member.experience}</p>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-3">
                      {[Facebook, Instagram, Twitter, Linkedin].map((Icon, si) => (
                        <a
                          key={si}
                          href="#"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ee6983] hover:border-[#ee6983]/50 hover:bg-[#ee6983]/10 transition-all duration-300"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>

                    {/* View Profile button */}
                    <a
                      href="#"
                      className="mt-2 bg-gradient-to-r from-[#850e35] to-[#ee6983] hover:from-[#9a1240] hover:to-[#f07f9b] text-white text-sm font-bold uppercase tracking-wider px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(238,105,131,0.2)]"
                    >
                      {member.name}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
