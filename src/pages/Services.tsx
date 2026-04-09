import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, BarChart3, Workflow, MessageSquare, Database, Shield, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    description: "Custom AI chatbots for customer support, lead qualification, and internal operations. Trained on your business data.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "End-to-end automation for lead capture, onboarding, follow-ups, and data processing pipelines.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence Dashboards",
    description: "Real-time dashboards that turn raw data into actionable insights for smarter decisions.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp & Email Automation",
    description: "Automated messaging sequences for nurturing leads, student communications, and customer engagement.",
  },
  {
    icon: Database,
    title: "Custom CRM & Data Systems",
    description: "Tailored CRM solutions with lead scoring, pipeline management, and analytics built in.",
  },
  {
    icon: Shield,
    title: "System Integration & Security",
    description: "Seamless integration of existing tools with robust security and data protection practices.",
  },
];

const process = [
  { step: "01", title: "Discovery", description: "We analyze your business needs, workflows, and pain points." },
  { step: "02", title: "Design", description: "We architect a custom solution tailored to your requirements." },
  { step: "03", title: "Build", description: "Our team develops and tests the system with your feedback." },
  { step: "04", title: "Deploy & Scale", description: "We launch, monitor, and iterate to ensure maximum impact." },
];

const Services = () => (
  <main className="pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <Bot className="h-4 w-4" />
          AI & IT Solutions
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Build Your <span className="text-gradient">Intelligent System</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          From AI chatbots to full-scale business automation — we design, build, and deploy systems that grow with your business.
        </p>
      </motion.div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="group p-6 rounded-xl border border-border bg-card hover:border-accent/30 hover:glow-accent transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <service.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Process */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Our <span className="text-gradient">Process</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, i) => (
            <motion.div
              key={item.step}
              className="relative p-6 rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="font-heading text-5xl font-bold text-primary/10">{item.step}</span>
              <h3 className="font-heading text-lg font-semibold mt-2 mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="text-center">
        <Button asChild size="lg" className="glow-primary text-base px-8">
          <Link to="/contact">
            Let's Build Together <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </main>
);

export default Services;
