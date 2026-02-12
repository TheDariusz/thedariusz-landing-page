import { motion } from "motion/react";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import CVDownloadButton from "@/components/CVDownloadButton";
import { ArrowDown, ChevronDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const HeroSection = () => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[100px]" />
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-48 h-48 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden ring-2 ring-primary/50 ring-offset-4 ring-offset-background shadow-[0_0_40px_hsl(347_77%_50%/0.15)]">
            <img
              src={profilePhoto}
              alt={`Portrait of ${siteData.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-sm font-mono tracking-wider uppercase mb-3"
        >
          {siteData.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          {siteData.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm md:text-base text-muted-foreground mb-10 font-medium tracking-[0.2em] uppercase"
        >
          {siteData.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => handleScroll("#contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            {siteData.hero.ctaPrimary}
          </Button>
          <CVDownloadButton size="lg" className="px-8" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16"
        >
          <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground animate-bounce-subtle" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
