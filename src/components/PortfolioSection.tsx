import { siteData } from "@/data/siteData";
import FadeInSection from "@/components/FadeInSection";

const pad = (n: number) => String(n).padStart(2, "0");

const PortfolioSection = () => {
  const { heading, projects } = siteData.portfolio;

  return (
    <section id="projects" className="py-24 md:py-32 px-4 border-t border-border" aria-label="Projects">
      <div className="container mx-auto max-w-6xl">
        <FadeInSection>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-4">Projects</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] mb-16 md:mb-24 text-foreground">
            {heading}
          </h2>
        </FadeInSection>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, i) => {
            const screenshotRight = i % 2 === 1;
            return (
              <FadeInSection key={project.url}>
                <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Duplicate of the text link below: hidden from keyboard and screen readers */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`group block md:col-span-7 bg-card border border-border rounded-[var(--radius-media)] p-2 md:p-3 overflow-hidden transition-colors hover:border-subtle${screenshotRight ? " md:order-2" : ""}`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width={1600}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top rounded-[calc(var(--radius-media)-8px)] transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:transform-none"
                    />
                  </a>
                  <div className={`md:col-span-5${screenshotRight ? " md:order-1" : ""}`}>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-4">
                      {pad(i + 1)} / {pad(projects.length)}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4 text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group font-mono text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {new URL(project.url).hostname}{" "}
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none">
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
