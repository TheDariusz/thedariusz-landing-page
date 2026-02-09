import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail } from "lucide-react";
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
      <div className="container mx-auto max-w-xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {siteData.contact.heading}
          </h2>
          <p className="text-muted-foreground mb-10">
            {siteData.contact.subtitle}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
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
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-8">
            <Send className="w-4 h-4 mr-2" />
            {siteData.contact.submitLabel}
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-sm text-muted-foreground flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          {siteData.contact.fallbackText}{" "}
          <a
            href={`mailto:${siteData.email}`}
            className="text-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            {siteData.email}
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
