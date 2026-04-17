import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechFlow Solutions",
    role: "Operations Director",
    testimonial:
      "Vedricx helped us automate our lead system and we saw a clear increase in conversions within weeks. The AI-powered workflow has transformed how we handle customer inquiries.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "InnovateTech India",
    role: "CEO",
    testimonial:
      "The automation system reduced our manual work significantly and improved efficiency. Our team can now focus on strategic tasks instead of repetitive data entry.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    company: "DataDriven Corp",
    role: "CTO",
    testimonial:
      "Professional team with strong understanding of business automation and AI systems. They delivered a custom dashboard that gives us real-time insights into our operations.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    company: "GrowthMatrix",
    role: "Marketing Head",
    testimonial:
      "The centralized dashboard and workflow automation have been game-changers for our marketing operations. We now have complete visibility across all campaigns.",
    rating: 4.5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i - 0.5 <= rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real results from businesses using our AI automation systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
            <StarRating rating={testimonial.rating} />
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-4 italic">
              "{testimonial.testimonial}"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-heading font-semibold text-sm">
                  {testimonial.name}
                </div>
                <div className="text-xs text-primary font-medium">
                  {testimonial.company}
                </div>
                <div className="text-xs text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
