import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "@/components/PhoneInput";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", countryCode: "+91-IN", phone: "", interest: "", message: "" });
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("https://formspree.io/f/xgorvkvz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setForm({
        name: "",
        email: "",
        countryCode: "+91-IN",
        phone: "",
        interest: "",
        message: ""
      });

    } else {
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    }

  } catch (error) {
    toast({
      title: "Error",
      description: "Network error!",
    });
  }

  setLoading(false);
};
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", countryCode: "+91-IN", phone: "", interest: "", message: "" });
      setLoading(false);
    }, 1000);
  };

>>>>>>> c9e07404a4ab60532c920cf6f8c4b02058e5d061
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Whether you're interested in our industrial training programs or need an AI-powered business system — we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <Input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input required type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone <span className="text-destructive">*</span></label>
                  <PhoneInput
                    countryCode={form.countryCode}
                    phone={form.phone}
                    onCountryCodeChange={(v) => setForm({ ...form, countryCode: v })}
                    onPhoneChange={(v) => setForm({ ...form, phone: v })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">I'm interested in</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  >
                    <option value="">Select an option</option>
                    <option value="aircraft-design">Aircraft Design & Simulation</option>
                    <option value="cfd">CFD Industrial Training</option>
                    <option value="fea">FEA Industrial Training</option>
                    <option value="ai-solutions">AI / IT Solutions</option>
                    <option value="both">Programs + Solutions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your needs..." />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="font-heading text-xl font-semibold mb-6">Other Ways to Reach Us</h3>
              <div className="space-y-5">
                <a
<<<<<<< HEAD
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">Chat with us instantly</div>
=======
                  href="tel:+918439120370"
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <div className="text-sm text-muted-foreground">+91 8439120370</div>
>>>>>>> c9e07404a4ab60532c920cf6f8c4b02058e5d061
                  </div>
                </a>
                <a
                  href="mailto:info@vedricxglobal.com"
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">info@vedricxglobal.com</div>
                  </div>
                </a>
<<<<<<< HEAD
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <div className="text-sm text-muted-foreground">Contact us for a consultation</div>
                  </div>
                </div>
=======
>>>>>>> c9e07404a4ab60532c920cf6f8c4b02058e5d061
              </div>
            </div>

            <div className="rounded-xl bg-card border border-border p-6">
              <h4 className="font-heading font-semibold mb-2">Response Time</h4>
              <p className="text-sm text-muted-foreground">
                We typically respond within 2–4 hours during business hours. For urgent inquiries, reach out via WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
