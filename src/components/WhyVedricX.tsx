import { motion } from "framer-motion";
import { Wrench, Briefcase, Monitor, FolderKanban, Award, Users } from "lucide-react";

const benefits = [
  {
    icon: Wrench,
    title: "Industry-Oriented Training",
    description: "Curriculum designed by professionals working at leading aerospace and automotive companies.",
  },
  {
    icon: FolderKanban,
    title: "Real Project-Based Learning",
    description: "Build a professional portfolio with 10–15+ real engineering simulations and design projects.",
  },
  {
    icon: Monitor,
    title: "Industry-Relevant Tools",
    description: "Hands-on experience with CATIA, ANSYS, MATLAB — the exact software used in top engineering firms worldwide.",
  },
  {
    icon: Briefcase,
    title: "Career-Focused Programs",
    description: "Programs aligned with industry job roles — prepare for interviews with portfolio-ready projects.",
  },
  {
    icon: Award,
    title: "Certification & Recognition",
    description: "Earn industry-recognized certificates that validate your skills to potential employers.",
  },
  {
    icon: Users,
    title: "Mentorship & Support",
    description: "Get guidance from experienced engineers with dedicated doubt-clearing and project reviews.",
  },
];

const WhyVedricX = () => (
  <section className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Why Students Choose{" "}
          <span className="text-gradient">VedricX Global</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We don't just teach theory — we build engineers who are job-ready from day one.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:border-primary/20 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <b.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyVedricX;
