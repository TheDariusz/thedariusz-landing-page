import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { siteData } from "@/data/siteData";
import FadeInSection from "@/components/FadeInSection";
import { Server, Database, BarChart3, GitBranch, TestTube, Briefcase, BrainCircuit } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="w-5 h-5 text-muted-foreground" />,
  Database: <Database className="w-5 h-5 text-muted-foreground" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-muted-foreground" />,
  GitBranch: <GitBranch className="w-5 h-5 text-muted-foreground" />,
  TestTube: <TestTube className="w-5 h-5 text-muted-foreground" />,
  Briefcase: <Briefcase className="w-5 h-5 text-muted-foreground" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-muted-foreground" />,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 md:py-32 lg:py-40 px-4 border-t border-border" aria-label="Skills and Technologies">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <FadeInSection>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-4">Skills</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] mb-16 text-foreground">
            {siteData.skills.heading}
          </h2>
        </FadeInSection>

        <div className="grid gap-4 md:grid-cols-2">
          {siteData.skills.categories.map((category, catIndex, arr) => {
            const isLastOdd = catIndex === arr.length - 1 && arr.length % 2 === 1;
            return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              className={`bg-card border border-border rounded-2xl p-6 hover:border-subtle transition-colors duration-300${isLastOdd ? " md:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {iconMap[category.icon]}
                <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-full border border-border text-secondary-foreground hover:border-subtle hover:text-foreground transition-colors duration-200 cursor-default"
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
