import { motion } from "motion/react";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import CVDownloadButton from "@/components/CVDownloadButton";
import profilePhoto from "@/assets/profile-photo.webp";

// Staggered entrance for the hero text lines, ~80ms apart
const fadeUp = (step: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: step * 0.08, duration: 0.5 },
});

const HeroSection = () => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative" aria-label="Introduction">
      {/* Clip the glow here, not on the section, so it can't cause horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 right-[-10%] w-[720px] h-[720px] rounded-full bg-[radial-gradient(closest-side,rgb(225_29_72/0.14),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-32 pb-24 md:pt-44 md:pb-32 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <motion.p
            {...fadeUp(0)}
            className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-4"
          >
            {siteData.hero.greeting}
          </motion.p>

          <motion.h1
            {...fadeUp(1)}
            className="text-5xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.04em] leading-[0.95] mb-6"
          >
            {siteData.name}
          </motion.h1>

          <motion.p
            {...fadeUp(2)}
            className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
          >
            {siteData.tagline}
          </motion.p>

          <motion.div {...fadeUp(3)} className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => handleScroll("#contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full transition motion-safe:hover:-translate-y-0.5"
            >
              {siteData.hero.ctaPrimary}
            </Button>
            <CVDownloadButton size="lg" className="px-8" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-5 order-1 md:order-2"
        >
          <img
            src={profilePhoto}
            width={480}
            height={480}
            alt={`Portrait of ${siteData.name}`}
            className="w-40 h-40 md:w-full md:h-auto md:max-w-[340px] md:ml-auto aspect-square object-cover rounded-full md:rounded-[var(--radius-media)] border border-border"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
