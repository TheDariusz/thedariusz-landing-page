import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { siteData } from "@/data/siteData";
import { Server, Database, BarChart3, GitBranch, TestTube, Briefcase, BrainCircuit } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="w-5 h-5 text-primary" />,
  Database: <Database className="w-5 h-5 text-primary" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-primary" />,
  GitBranch: <GitBranch className="w-5 h-5 text-primary" />,
  TestTube: <TestTube className="w-5 h-5 text-primary" />,
  Briefcase: <Briefcase className="w-5 h-5 text-primary" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-primary" />,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-alt py-24 px-4" aria-label="Skills and Technologies">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-16 text-foreground accent-underline pb-4"
        >
          {siteData.skills.heading}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {siteData.skills.categories.map((category, catIndex, arr) => {
            const isLastOdd = catIndex === arr.length - 1 && arr.length % 2 === 1;
            return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              className={`bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors duration-300${isLastOdd ? " md:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {iconMap[category.icon]}
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-full border border-border bg-secondary/50 text-secondary-foreground hover:border-primary/50 hover:bg-primary/10 badge-glow transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
