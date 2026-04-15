import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Cpu } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const floatingAnimation = (duration: number, y: number = 15) => ({
  y: [-y, y, -y],
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
});

const glowPulse = (duration: number) => ({
  opacity: [0.4, 0.8, 0.4],
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
});

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Animated Background Image */}
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="w-full h-full object-cover object-center"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
    </motion.div>

    {/* Animated floating glow orbs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <motion.div
        className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-primary/20 blur-3xl"
        animate={{ ...floatingAnimation(6, 20), ...glowPulse(4) }}
      />
      <motion.div
        className="absolute top-1/3 right-[15%] w-24 h-24 rounded-full bg-accent/20 blur-2xl"
        animate={{ ...floatingAnimation(8, 25), ...glowPulse(5) }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[20%] w-20 h-20 rounded-full bg-primary/15 blur-2xl"
        animate={floatingAnimation(7, 18)}
      />
      <motion.div
        className="absolute bottom-1/3 right-[25%] w-16 h-16 rounded-full bg-accent/15 blur-xl"
        animate={floatingAnimation(5, 12)}
      />
    </div>

    {/* Content */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Engineering Education & AI-Powered Business Systems
          </div>
        </motion.div>

        <motion.h1
          className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Learn to Build.{" "}
          <span className="text-gradient">Build to Scale.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Industry-grade industrial training programs in Aircraft Design, CFD & FEA — 
          plus AI-powered business systems that centralize operations, automate workflows, and drive data-driven decisions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button asChild size="lg" className="text-base px-8 glow-primary">
            <Link to="/programs">
              <GraduationCap className="mr-2 h-5 w-5" />
              Explore Programs
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base px-8">
            <Link to="/services">
              <Cpu className="mr-2 h-5 w-5" />
              Build Your System
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { value: "500+", label: "Students Trained" },
            { value: "50+", label: "AI Systems Built" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
