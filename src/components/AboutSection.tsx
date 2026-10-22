import { siteData } from "@/data/siteData";
import FadeInSection from "@/components/FadeInSection";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 px-4 border-t border-border" aria-label="About Me">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-12 gap-10">
        <FadeInSection className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-4">About</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground">
            {siteData.about.heading}
          </h2>
        </FadeInSection>

        <div className="md:col-span-8">
          <div className="space-y-6">
            {siteData.about.professional.map((paragraph, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <p className="text-foreground/85 leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="mt-10 pt-8 border-t border-border" delay={0.2}>
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-3">
              Beyond Work
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {siteData.about.beyondWork}
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
