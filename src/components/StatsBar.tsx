import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { siteData } from "@/data/siteData";
import { cn } from "@/lib/utils";

const StatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="px-4 border-t border-border" aria-label="Key highlights">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {siteData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              // Hairline dividers: vertical between columns on desktop, horizontal between rows on mobile
              className={cn(
                "py-8 md:py-10 pr-4",
                i > 0 && "md:border-l md:border-border md:pl-6",
                i >= 2 && "border-t border-border md:border-t-0",
              )}
            >
              <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mt-2">
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
