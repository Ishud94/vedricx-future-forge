import { motion } from "framer-motion";
import { GraduationCap, Cpu, BarChart3, Users, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Engineering Programs",
    description: "Hands-on courses in Aircraft Design, CFD, and FEA taught by industry professionals.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Solutions",
    description: "Custom AI systems for automation, data processing, and intelligent decision making.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Dashboard-driven insights to track performance and optimize operations.",
  },
  {
    icon: Users,
    title: "LMS Platform",
    description: "Complete learning management with progress tracking, assessments, and certifications.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automated lead capture, onboarding, and follow-up systems via WhatsApp and email.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Accessible worldwide with multi-language support and flexible scheduling.",
  },
];

const FeaturesSection = () => (
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
          Two Verticals. <span className="text-gradient">One Platform.</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Whether you're a student seeking industry skills or a business building intelligent systems — we've got you covered.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="group p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:glow-primary transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
