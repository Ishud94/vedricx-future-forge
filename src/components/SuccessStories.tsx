import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const stories = [
  {
    name: "Arjun Sharma",
    course: "Aircraft Design & Simulation",
    role: "Junior CAD Engineer at Tata Advanced Systems",
    testimonial:
      "The hands-on CATIA and ANSYS training gave me real industry skills. Within 2 months of completing the program, I landed my dream role in aerospace design.",
    rating: 5,
  },
  {
    name: "Priya Menon",
    course: "CFD Industrial Training Program",
    role: "CFD Analyst at L&T Technology Services",
    testimonial:
      "The project-based approach was game-changing. I built a portfolio of 15+ simulations that directly helped me clear technical interviews.",
    rating: 5,
  },
  {
    name: "Rahul Deshmukh",
    course: "FEA Industrial Training Program",
    role: "Structural Analyst at Mahindra Aerospace",
    testimonial:
      "VedricX's FEA program bridges the gap between academic theory and industry practice. The capstone project alone was worth the entire investment.",
    rating: 4.5,
  },
  {
    name: "Sneha Patel",
    course: "Aircraft Design & Simulation",
    role: "Design Engineer at HAL",
    testimonial:
      "From zero CATIA knowledge to building a complete aircraft model — the structured weekly approach made complex concepts approachable and practical.",
    rating: 5,
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

const SuccessStories = () => (
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
          Success <span className="text-gradient">Stories</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real outcomes from real students. See how VedricX Global has
          transformed engineering careers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {stories.map((story, i) => (
          <motion.div
            key={story.name}
            className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
            <StarRating rating={story.rating} />
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-4 italic">
              "{story.testimonial}"
            </p>
            <div>
              <div className="font-heading font-semibold text-sm">
                {story.name}
              </div>
              <div className="text-xs text-primary font-medium">
                {story.course}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {story.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
