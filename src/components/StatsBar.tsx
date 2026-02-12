import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { siteData } from "@/data/siteData";

const StatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="section-alt py-12 px-4" aria-label="Key highlights">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {siteData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center border-t-2 border-primary/60 pt-4"
            >
              <p className="text-xl md:text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
