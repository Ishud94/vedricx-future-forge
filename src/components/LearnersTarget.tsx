import { useEffect, useRef } from "react";
import logoTata from "@/assets/logo-tata.jpg";
import logoMahindra from "@/assets/logo-mahindra.jpg";
import logoOla from "@/assets/logo-ola.png";
import logoHcl from "@/assets/logo-hcl.png";
import logoWipro from "@/assets/logo-wipro.png";
import logoInfosys from "@/assets/logo-infosys.png";
import logoLt from "@/assets/logo-lt.jpg";
import logoReliance from "@/assets/logo-reliance.jpg";

const companies = [
  { name: "Tata", logo: logoTata },
  { name: "Mahindra", logo: logoMahindra },
  { name: "Ola", logo: logoOla },
  { name: "HCL", logo: logoHcl },
  { name: "Wipro", logo: logoWipro },
  { name: "Infosys", logo: logoInfosys },
  { name: "L&T", logo: logoLt },
  { name: "Reliance", logo: logoReliance },
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
                const radius = 42;
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);

                return (
                  <div
                    key={company.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-border/60 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary/30 cursor-default p-2">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
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
