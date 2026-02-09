import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section id="contact" className="py-24 px-4" aria-label="Contact">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground accent-underline pb-4">
            {siteData.contact.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {siteData.contact.subheading}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {siteData.contact.subtitle}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${siteData.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="group-hover:underline underline-offset-4">{siteData.email}</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{siteData.contact.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-4">
              <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href={siteData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
            noValidate
          >
            <div>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                aria-label="Your name"
                className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                required
              />
              {errors.name && <p className="text-sm text-primary mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-label="Your email"
                className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                required
              />
              {errors.email && <p className="text-sm text-primary mt-1">{errors.email}</p>}
            </div>
            <div>
              <Textarea
                placeholder="Your message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                aria-label="Your message"
                rows={5}
                className="bg-secondary/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                required
              />
              {errors.message && <p className="text-sm text-primary mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full px-8">
              <Send className="w-4 h-4 mr-2" />
              {siteData.contact.submitLabel}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
