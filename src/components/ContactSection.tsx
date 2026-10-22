import { useState } from "react";
import { flushSync } from "react-dom";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import FadeInSection from "@/components/FadeInSection";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      // Commit aria-invalid/aria-describedby before focusing, so the error is read on focus
      flushSync(() => setErrors(fieldErrors));
      const firstInvalid = (["name", "email", "message"] as const).find((f) => fieldErrors[f]);
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const response = await fetch(siteData.contact.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!response.ok) throw new Error("Request failed");
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: `Could not send your message. Please email me directly at ${siteData.email}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldA11y = (field: string) => ({
    id: `contact-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 px-4 border-t border-border" aria-label="Contact">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-12 gap-12">
        <FadeInSection className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-4">Contact</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] mb-6 text-foreground">
            {siteData.contact.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">{siteData.contact.subtitle}</p>

          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-1">Email</dt>
              <dd>
                <a
                  href={`mailto:${siteData.email}`}
                  className="font-mono text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                >
                  {siteData.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-1">Location</dt>
              <dd className="text-muted-foreground">{siteData.contact.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtle mb-2">Elsewhere</dt>
              <dd className="flex items-center gap-5">
                <SocialLinks iconClassName="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </dd>
            </div>
          </dl>
        </FadeInSection>

        <FadeInSection className="md:col-span-7" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-[var(--radius-media)] p-6 md:p-8 space-y-4"
            noValidate
          >
            <div>
              <Input
                placeholder="Your name"
                value={form.name}
                {...fieldA11y("name")}
                autoComplete="name"
                onChange={(e) => handleChange("name", e.target.value)}
                aria-label="Your name"
                disabled={isSubmitting}
                className="bg-background border-subtle/70 focus:border-primary/50 aria-invalid:border-destructive text-foreground placeholder:text-subtle"
                required
              />
              {errors.name && <p id="contact-name-error" className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                {...fieldA11y("email")}
                autoComplete="email"
                onChange={(e) => handleChange("email", e.target.value)}
                aria-label="Your email"
                disabled={isSubmitting}
                className="bg-background border-subtle/70 focus:border-primary/50 aria-invalid:border-destructive text-foreground placeholder:text-subtle"
                required
              />
              {errors.email && <p id="contact-email-error" className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Textarea
                placeholder="Your message"
                value={form.message}
                {...fieldA11y("message")}
                onChange={(e) => handleChange("message", e.target.value)}
                aria-label="Your message"
                rows={5}
                disabled={isSubmitting}
                className="bg-background border-subtle/70 focus:border-primary/50 aria-invalid:border-destructive text-foreground placeholder:text-subtle resize-none"
                required
              />
              {errors.message && <p id="contact-message-error" className="text-sm text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full px-8 rounded-full transition motion-safe:hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {siteData.contact.submittingLabel}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {siteData.contact.submitLabel}
                </>
              )}
            </Button>
          </form>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ContactSection;
