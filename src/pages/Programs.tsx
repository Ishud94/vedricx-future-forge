import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Aircraft Design Fundamentals",
    description: "Master the principles of aerodynamics, structural analysis, and aircraft configuration design. Work on real-world projects with industry-standard tools.",
    duration: "12 Weeks",
    level: "Intermediate",
    students: "120+ enrolled",
    topics: ["Aerodynamics", "Structural Design", "Propulsion", "Flight Mechanics", "CATIA V5"],
    color: "primary" as const,
  },
  {
    title: "Computational Fluid Dynamics (CFD)",
    description: "Learn CFD simulation from fundamentals to advanced turbulence modeling. Hands-on with ANSYS Fluent and OpenFOAM for real engineering problems.",
    duration: "10 Weeks",
    level: "Advanced",
    students: "85+ enrolled",
    topics: ["Mesh Generation", "Turbulence Models", "ANSYS Fluent", "OpenFOAM", "Post-Processing"],
    color: "accent" as const,
  },
  {
    title: "Finite Element Analysis (FEA)",
    description: "Comprehensive FEA training covering static, dynamic, thermal, and non-linear analysis using ANSYS Mechanical and Abaqus.",
    duration: "10 Weeks",
    level: "Intermediate",
    students: "95+ enrolled",
    topics: ["Static Analysis", "Dynamic Analysis", "Thermal Analysis", "ANSYS Mechanical", "Abaqus"],
    color: "primary" as const,
  },
];

const Programs = () => (
  <main className="pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <GraduationCapIcon />
          Engineering Programs
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Industry-Grade <span className="text-gradient">Training Programs</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Hands-on engineering courses designed by professionals. Learn real tools, solve real problems, and build a portfolio that gets you hired.
        </p>
      </motion.div>

      <div className="space-y-8">
        {programs.map((program, i) => (
          <motion.div
            key={program.title}
            className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="p-8 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <h2 className="font-heading text-2xl font-bold mb-3">{program.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{program.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {program.duration}</span>
                    <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {program.level}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {program.students}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Button asChild size="lg">
                    <Link to="/contact">
                      Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </main>
);

const GraduationCapIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
  </svg>
);

export default Programs;
