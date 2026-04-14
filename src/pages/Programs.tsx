import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award, ArrowRight, ChevronDown, ChevronUp, Star, MessageSquare, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import aircraftImg from "@/assets/course-aircraft-design.jpg";
import cfdImg from "@/assets/course-cfd.jpg";
import feaImg from "@/assets/course-fea.jpg";

const programs = [
  {
    title: "Advanced Aircraft Design & Simulation",
    subtitle: "From Concept to Complete 3D Aircraft Modeling & Simulation",
    description: "This industry-oriented program trains students in conceptual aircraft modeling and simulation workflows used in aerospace industries. Emphasizes real aircraft component modeling, surface-based aerodynamic design, full aircraft assembly development, and simulation-based validation.",
    duration: "12 Weeks",
    level: "Beginner to Intermediate",
    software: "CATIA V5 | ANSYS Workbench",
    mode: "Online – Live + Recorded + Project-Based",
    audience: "Engineering Students",
    fee: "₹13,000",
    rating: 4.8,
    reviewCount: 124,
    image: aircraftImg,
    roles: ["Junior Aircraft Design Engineer", "CAD/CAM Engineer", "Aerospace Design Analyst", "Structural Analyst (Trainee)"],
    modules: [
      { week: "Week 1", title: "Aircraft Design Foundations", topics: ["Aircraft classifications & components", "Aerodynamics & flight mechanics", "Airfoil terminology & NACA series", "Structures, materials & composites", "Propulsion systems & certification basics"] },
      { week: "Week 2", title: "Conceptual Design & CATIA Foundations", topics: ["Aircraft sizing & design trade-offs", "CATIA V5 interface & workbenches", "Sketch-based modeling (Extrude, Revolve, Sweep)", "Aircraft part design: Airfoil, Wing, Fuselage, Tail, Engine"] },
      { week: "Week 3", title: "Assembly & Drafting", topics: ["Component insertion & constraint management", "Motion simulation & clash detection", "2D drawing generation & GD&T", "Bill of Materials & technical documentation"] },
      { week: "Week 4", title: "Surface Design (Professional Level)", topics: ["Generative Shape Design", "Lofting techniques, Sweep & Blend", "Curvature analysis"] },
      { week: "Week 5", title: "Complete Aircraft Surface Development", topics: ["Fuselage section modeling", "Wing aerodynamic shaping", "Tail integration & landing gear surfaces", "Final surface optimization → Professional OML Model"] },
      { week: "Weeks 6-7", title: "Wireframe Design & Final Assembly", topics: ["Wireframe elements & profile control", "Winglet integration", "Landing gear configurations", "Final aircraft assembly & alignment verification"] },
      { week: "Week 8", title: "Introduction to ANSYS Simulation", topics: ["Geometry import from CATIA", "Meshing fundamentals & boundary conditions", "Airfoil aerodynamic analysis", "Lift & drag extraction", "Wing structural load analysis"] },
      { week: "Weeks 9-12", title: "Capstone Aircraft Design Project", topics: ["Design a complete aircraft", "Aerodynamic validation & structural assessment", "Design improvement based on simulation", "Final technical report & engineering presentation"] },
    ],
    deliverables: ["Complete 3D Aircraft Model (CATIA)", "ANSYS Simulation Files", "Technical Project Report", "Engineering Presentation", "Certificate"],
    skills: ["Aircraft 3D Modeling Expertise", "Surface Design Proficiency", "CAD Assembly & Drafting", "Basic CFD & FEA Exposure", "Engineering Interpretation Skills"],
  },
  {
    title: "Project-Based CFD Industrial Training Program",
    subtitle: "From Fundamentals to Industrial Applications",
    description: "A structured program taking learners from CFD fundamentals to advanced applications through hands-on simulations using ANSYS Fluent and ICEM CFD. Covers fluid flow fundamentals, numerical methods via MATLAB, meshing strategies, turbulence modeling, and advanced CFD applications.",
    duration: "6 Modules (12+ Weeks)",
    level: "Beginner to Advanced",
    software: "ANSYS Fluent | ICEM CFD | MATLAB",
    mode: "Online – Live + Project-Based",
    audience: "Mechanical, Aerospace, Automotive Students",
    fee: "₹15,000",
    rating: 4.7,
    reviewCount: 98,
    image: cfdImg,
    roles: ["CFD Engineer (Graduate / Trainee)", "CFD Application Engineer", "Aerodynamics Engineer (Junior)", "Thermal / Heat Transfer CFD Engineer", "CFD Analyst (Automotive & Aerospace)"],
    modules: [
      { week: "Module 1", title: "Fundamentals of Fluid Flow & CFD", topics: ["Fluid properties & governing equations", "Newtonian & non-Newtonian fluids", "Laminar vs turbulent flows & Reynolds number", "Introduction to CFD workflow", "Projects: 2D & 3D Laminar Flow Analysis"] },
      { week: "Module 2", title: "Numerical Foundations using MATLAB", topics: ["Numerical discretization concepts", "Finite Difference Method (FDM)", "1D & 2D heat conduction solutions", "Comparison of numerical vs analytical solutions", "Project: 2D Heat Equation via FDM"] },
      { week: "Module 3", title: "Internal Flow Simulations (ANSYS Fluent)", topics: ["ANSYS Workbench & Fluent interface", "2D & 3D internal flow setup", "Solver settings & convergence monitoring", "Post-processing of velocity & pressure", "Projects: Pipe expansion & contraction flows"] },
      { week: "Module 4", title: "CFD Meshing Fundamentals", topics: ["Structured, unstructured & hybrid meshes", "ANSYS Meshing & ICEM CFD", "Mesh quality: Skewness, orthogonality, aspect ratio", "Boundary layer & inflation layers", "Y+ concept & mesh independence studies"] },
      { week: "Module 5", title: "Turbulence Modeling & RANS Simulations", topics: ["Reynolds decomposition & RANS equations", "k-ε, k-ω, k-ω SST models", "Vortex shedding & unsteady flow", "Turbulence model comparison", "Projects: Bluff body analysis & model comparison"] },
      { week: "Module 6", title: "Advanced CFD Applications", topics: ["Multiphase flow (VOF method)", "Heat transfer & conjugate heat transfer", "Unsteady simulations & UDFs", "External aerodynamic analysis", "Projects: VOF, forced convection, UDF, flow enhancement"] },
    ],
    deliverables: ["15+ CFD Simulation Projects", "ANSYS Fluent Project Files", "Technical Reports", "Certificate of Completion"],
    skills: ["CFD workflow (pre to post-processing)", "Internal & external flow simulation", "Surface & volume meshing (ICEM CFD)", "Turbulence modeling (RANS)", "Numerical methods via MATLAB"],
  },
  {
    title: "Project-Based FEA Industrial Training Program",
    subtitle: "From Solid Mechanics to Industry-Grade Structural Simulation",
    description: "Train in industry-relevant structural simulation workflows used in mechanical, automotive, aerospace, and manufacturing sectors. Emphasizes engineering decision-making, model validation, solver behavior understanding, and result interpretation using ANSYS Mechanical.",
    duration: "12 Weeks (3 Months)",
    level: "Intermediate",
    software: "ANSYS Workbench – Mechanical",
    mode: "Industry-Oriented Training",
    audience: "Final-year students, fresh graduates, early-career engineers",
    fee: "₹11,999",
    rating: 4.6,
    reviewCount: 76,
    image: feaImg,
    roles: ["Junior / Graduate FEA Engineer", "CAE Analyst (Structural)", "Mechanical Design Engineer with FEA", "Structural Analyst (Trainee / Entry Level)"],
    modules: [
      { week: "Week 1", title: "Solid Mechanics Fundamentals for FEA", topics: ["Stress & strain physical interpretation", "Elastic vs plastic behavior", "Engineering vs true stress–strain", "Task: Uniaxial Tensile Test Simulation"] },
      { week: "Week 2", title: "Finite Element Representation", topics: ["Degrees of freedom & constraints", "1D element formulation", "Strong form vs weak form concepts", "Task: Compression vs Bending Analysis"] },
      { week: "Week 3", title: "2D/3D Modeling & Meshing Strategies", topics: ["Plane stress vs plane strain", "Linear vs quadratic elements", "Mesh convergence methodology", "Task: Plate with Hole – Stress Concentration"] },
      { week: "Week 4", title: "Torsional and Shear Behaviour", topics: ["Torsional stiffness & shear stress", "Warping behavior", "Task: Torsional Test of Circular Shaft"] },
      { week: "Week 5", title: "Linear & Nonlinear Structural Analysis", topics: ["Material & geometric nonlinearity", "Large deformation effects", "Load stepping & convergence", "Task: Elastic vs Plastic Tensile Analysis"] },
      { week: "Week 6", title: "Contact Mechanics", topics: ["Bonded, frictionless & frictional contact", "Penalty vs augmented Lagrange methods", "Task: Pin-in-Hole Contact Assembly"] },
      { week: "Weeks 7-8", title: "Dynamics & Harmonic Response", topics: ["Modal analysis & eigenvalue problems", "Implicit vs explicit approaches", "Resonance & harmonic response", "Tasks: Modal beam analysis & harmonic response"] },
      { week: "Week 9", title: "Thermal & Thermo-Structural Analysis", topics: ["Heat conduction & thermal expansion", "Sequential thermal–structural coupling", "Task: Thermally Loaded Component Analysis"] },
      { week: "Week 10", title: "Fatigue & Durability Analysis", topics: ["High-cycle fatigue & S–N curves", "Mean stress correction", "Task: Fatigue Life of Rotating Shaft"] },
      { week: "Weeks 11-12", title: "Capstone Industry Project", topics: ["End-to-end structural analysis", "Geometry simplification & BC justification", "Mesh convergence & failure assessment", "Design improvement recommendations", "Complete FEA report & presentation"] },
    ],
    deliverables: ["Complete FEA Technical Report", "ANSYS Project Files", "Engineering Presentation", "Certificate"],
    skills: ["Structural FEA workflow proficiency", "Linear & nonlinear analysis", "Contact & fatigue analysis", "Engineering judgment & validation", "Industry-style reporting"],
  },
];

const programFaqs = [
  { q: "What is included in the course?", a: "Each program includes live instructor-led sessions, recorded lectures for revision, hands-on project work, industry-standard software training (CATIA, ANSYS, MATLAB), downloadable resources, dedicated doubt-clearing sessions, and a certificate of completion." },
  { q: "Do I need prior experience?", a: "No prior experience is required for our beginner-level programs. Basic engineering knowledge is helpful but not mandatory. Our courses are structured to take you from fundamentals to advanced concepts step by step." },
  { q: "What tools will I learn?", a: "Depending on the program, you'll gain hands-on experience with industry-standard tools like CATIA V5, ANSYS Workbench, ANSYS Fluent, ICEM CFD, and MATLAB — the same tools used by top engineering firms worldwide." },
  { q: "Will I get a certificate?", a: "Yes! Upon successful completion of the program and capstone project, you'll receive an industry-recognized certificate from VedricX Global that validates your skills to potential employers." },
  { q: "How can I enroll or contact?", a: "You can reach out to us via our Contact page, WhatsApp, or email at info@vedricxglobal.com. Our team will guide you through the enrollment process, answer any questions, and help you choose the right program." },
];

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-2">
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
    <span className="text-sm font-semibold">{rating}</span>
    <span className="text-xs text-muted-foreground">({count} reviews)</span>
  </div>
);

const GraduationCapIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
  </svg>
);

const Programs = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
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
            Engineering Industrial Training Programs
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Industry-Grade <span className="text-gradient">Training Programs</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Project-driven industrial training programs designed by industry professionals. Learn real tools, solve real problems, and build a portfolio that gets you hired.
          </p>
        </motion.div>

        <div className="space-y-10">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              {/* Course image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <StarRating rating={program.rating} count={program.reviewCount} />
                  </div>
                  <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-heading font-bold text-lg">
                    {program.fee}
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl font-bold mb-1">{program.title}</h2>
                    <p className="text-sm text-primary font-medium mb-3">{program.subtitle}</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{program.description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {program.duration}</span>
                      <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {program.level}</span>
                      <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {program.audience}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.software.split(" | ").map((sw) => (
                        <span key={sw} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{sw}</span>
                      ))}
                      {program.mode && (
                        <span className="rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-medium">{program.mode}</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prepares You For:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {program.roles.map((role) => (
                          <span key={role} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{role}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-2"
                    >
                      {expanded === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {expanded === i ? "Hide Syllabus" : "View Full Syllabus"}
                    </button>

                    {expanded === i && (
                      <motion.div
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-heading font-semibold text-lg">Course Modules</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {program.modules.map((mod) => (
                            <div key={mod.week} className="rounded-lg border border-border bg-background p-4">
                              <div className="text-xs font-semibold text-primary mb-1">{mod.week}</div>
                              <div className="font-medium text-sm mb-2">{mod.title}</div>
                              <ul className="space-y-1">
                                {mod.topics.map((t) => (
                                  <li key={t} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <span className="text-accent mt-0.5">•</span>
                                    {t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h4 className="font-heading font-semibold text-sm mb-2">Deliverables</h4>
                            <ul className="space-y-1">
                              {program.deliverables.map((d) => (
                                <li key={d} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-accent">✓</span> {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-heading font-semibold text-sm mb-2">Skills You'll Gain</h4>
                            <ul className="space-y-1">
                              {program.skills.map((s) => (
                                <li key={s} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-primary">→</span> {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex flex-col gap-3">
                    <Button asChild size="lg">
                      <Link to="/contact">
                        <MessageSquare className="mr-2 h-4 w-4" /> Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {programFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Programs;
