import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteData } from "@/data/siteData";

const FadeInSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4" aria-label="About Me">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground accent-underline pb-4">
            {siteData.about.heading}
          </h2>
        </FadeInSection>

        <div className="space-y-6">
          {siteData.about.professional.map((paragraph, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <p className="text-secondary-foreground leading-relaxed text-base md:text-lg">
                {paragraph}
              </p>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="mt-10 pt-8 border-t border-border" delay={0.2}>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Beyond Work
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {siteData.about.beyondWork}
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AboutSection;
