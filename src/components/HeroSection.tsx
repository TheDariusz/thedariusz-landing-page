import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const HeroSection = () => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 pt-20"
      aria-label="Introduction"
    >
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-48 h-48 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden ring-2 ring-primary/50 ring-offset-4 ring-offset-background">
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
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-border text-foreground hover:bg-secondary px-8"
          >
            <a href={siteData.cvLink} download>
              <Download className="w-4 h-4 mr-2" />
              {siteData.hero.ctaSecondary}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
