import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "<500ms", label: "Average Translation Latency" },
  { value: "60+", label: "Languages Supported" },
  { value: "99.2%", label: "Translation Accuracy" },
  { value: "4.9", label: "User Rating", suffix: "★" },
];

const StatsSection = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      
      {/* soft ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />

      {/* floating glow blobs */}
      <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">

          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>

              <div
                className="
                  group relative text-center
                  rounded-2xl
                  border border-border/40
                  bg-card/40 backdrop-blur-md
                  p-8
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-border
                  hover:shadow-lg
                "
              >
                
                {/* subtle glow border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* value */}
                <div className="relative text-4xl lg:text-5xl font-bold font-display gradient-text mb-2">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-primary ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* label */}
                <p className="relative text-sm text-muted-foreground">
                  {stat.label}
                </p>

                {/* small decorative line */}
                <div className="mx-auto mt-4 h-[2px] w-10 bg-primary/30 rounded-full group-hover:w-16 transition-all duration-300" />

              </div>

            </ScrollReveal>
          ))}

        </div>
      </div>
    </section>
  );
};

export default StatsSection;