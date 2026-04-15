import { useEffect, useRef } from "react";

const companies = [
  { name: "Tata", color: "hsl(221, 83%, 53%)" },
  { name: "Mahindra", color: "hsl(0, 72%, 51%)" },
  { name: "Ola", color: "hsl(145, 63%, 42%)" },
  { name: "HCL", color: "hsl(221, 83%, 53%)" },
  { name: "Wipro", color: "hsl(262, 52%, 47%)" },
  { name: "Infosys", color: "hsl(199, 89%, 48%)" },
  { name: "L&T", color: "hsl(25, 95%, 53%)" },
  { name: "Reliance", color: "hsl(221, 83%, 40%)" },
];

const LearnersTarget = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div
        ref={sectionRef}
        className="container mx-auto px-4 md:px-8 transition-all duration-700 opacity-0 translate-y-6"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side */}
          <div className="lg:w-5/12 text-center lg:text-left">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Trusted Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Our Learners Target
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Our apprenticeship programs prepare learners for roles across core
              engineering organizations — connecting talent with India's top
              employers.
            </p>
          </div>

          {/* Right Side — Circular Logo Layout */}
          <div className="lg:w-7/12 flex justify-center">
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px]">
              {/* Center Circle */}
              <div className="absolute inset-0 m-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center z-10 shadow-lg">
                <span className="text-primary font-bold text-sm sm:text-base text-center leading-tight">
                  Learners
                  <br />
                  Choice
                </span>
              </div>

              {/* Orbit ring */}
              <div className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-primary/15" />

              {/* Company logos arranged in a circle */}
              {companies.map((company, i) => {
                const angle = (360 / companies.length) * i - 90;
                const rad = (angle * Math.PI) / 180;
                const radius = 42; // percentage from center
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);

                return (
                  <div
                    key={company.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card border border-border/60 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary/30 cursor-default">
                      <span
                        className="font-bold text-xs sm:text-sm transition-colors duration-300"
                        style={{ color: company.color }}
                      >
                        {company.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnersTarget;
