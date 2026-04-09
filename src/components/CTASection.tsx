import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        className="relative rounded-2xl bg-hero-gradient p-12 md:p-20 text-center overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">
            Join hundreds of students and businesses already transforming with VedricX Global.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-base px-8">
              <Link to="/programs">
                View Programs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">
                Talk to Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
