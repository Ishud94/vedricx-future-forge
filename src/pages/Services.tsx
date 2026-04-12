import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, BarChart3, Workflow, Database, Shield, Layers, ArrowRight, CheckCircle } from "lucide-react";
import serviceDataImg from "@/assets/service-data-intelligence.jpg";
import serviceBusinessImg from "@/assets/service-business-system.jpg";
import serviceAiImg from "@/assets/service-ai-automation.jpg";
import serviceCloudImg from "@/assets/service-cloud-deploy.jpg";
import processRequirementImg from "@/assets/process-requirement.jpg";
import processDesignImg from "@/assets/process-design.jpg";
import processDevelopmentImg from "@/assets/process-development.jpg";
import processDeployImg from "@/assets/process-deploy.jpg";

const services = [
  {
    icon: Layers,
    title: "Data Intelligence Layer",
    description: "Transform raw business data into meaningful insights. Data cleaning, visualization through dashboards, trend analysis, and predictive modeling for forecasting outcomes.",
    image: serviceDataImg,
  },
  {
    icon: Database,
    title: "Business System Development",
    description: "Build the core system that manages all operations — CRM systems, admin dashboards, database systems for structured storage, and API integrations for connecting external tools.",
    image: serviceBusinessImg,
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Add intelligence and reduce manual workload — lead scoring, predictive analytics, automated follow-ups and notifications, and AI chatbots for customer interaction.",
    image: serviceAiImg,
  },
  {
    icon: BarChart3,
    title: "Centralized Dashboards",
    description: "Complete visibility across all operations with real-time dashboards that turn scattered data into actionable, decision-ready insights.",
    image: serviceDataImg,
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "End-to-end automation for lead capture, onboarding, follow-ups, and data processing — eliminating manual tracking and reducing errors.",
    image: serviceBusinessImg,
  },
  {
    icon: Shield,
    title: "Cloud Deployment & Support",
    description: "Deployment on cloud infrastructure with ongoing support and performance optimization to ensure systems scale with your business.",
    image: serviceCloudImg,
  },
];

const problems = [
  "Disorganized data across Excel, WhatsApp, and CRMs",
  "Heavy reliance on manual tracking and follow-ups",
  "Lack of real-time insights for decision-making",
  "Absence of intelligent systems that predict outcomes",
];

const outcomes = [
  "Increased operational efficiency",
  "Higher conversion rates and revenue growth",
  "Reduced manual effort and errors",
  "Better strategic planning through data insights",
];

const process = [
  { step: "01", title: "Requirement Analysis", description: "Understanding your business needs, workflows, and pain points in depth.", image: processRequirementImg },
  { step: "02", title: "System Design", description: "Architecture planning and solution design tailored to your requirements.", image: processDesignImg },
  { step: "03", title: "Development & Integration", description: "Building and integrating features with your feedback at every stage.", image: processDevelopmentImg },
  { step: "04", title: "Deploy & Optimize", description: "Cloud deployment with ongoing support and continuous performance optimization.", image: processDeployImg },
];

const targets = [
  "Startups and SMEs",
  "Coaching institutes & educational platforms",
  "Real estate & service-based businesses",
  "Healthcare and consulting firms",
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
          AI-Powered Business Systems
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Build Your <span className="text-gradient">Intelligent System</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Vedricx Global integrates full stack development, data science, and AI into unified solutions that transform business operations — making them efficient, automated, and insight-driven.
        </p>
      </motion.div>

      {/* Problem / Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <motion.div
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-xl font-bold mb-4 text-destructive">The Problem</h3>
          <ul className="space-y-3">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-destructive mt-0.5">✕</span> {p}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="rounded-xl border border-accent/20 bg-accent/5 p-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-xl font-bold mb-4 text-accent">The Outcome</h3>
          <ul className="space-y-3">
            {outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /> {o}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="group rounded-xl border border-border bg-card hover:border-accent/30 hover:glow-accent transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="h-40 overflow-hidden">
              <img src={service.image} alt={service.title} loading="lazy" width={800} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <service.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Process */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Implementation <span className="text-gradient">Approach</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, i) => (
            <motion.div
              key={item.step}
              className="relative rounded-xl bg-card border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-36 overflow-hidden">
                <img src={item.image} alt={item.title} loading="lazy" width={800} height={512} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <span className="font-heading text-5xl font-bold text-primary/10">{item.step}</span>
                <h3 className="font-heading text-lg font-semibold mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Target Audience */}
      <motion.div
        className="rounded-xl bg-card border border-border p-8 md:p-12 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="font-heading text-2xl font-bold mb-6 text-center">Who We Build For</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {targets.map((t) => (
            <div key={t} className="text-center p-4 rounded-lg bg-secondary">
              <span className="text-sm font-medium text-secondary-foreground">{t}</span>
            </div>
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
