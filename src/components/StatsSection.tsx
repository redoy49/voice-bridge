import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "<500ms", label: "Average Translation Latency" },
  { value: "60+", label: "Languages Supported" },
  { value: "99.2%", label: "Translation Accuracy" },
  { value: "4.9", label: "User Rating", suffix: "★" },
];

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">
                  {stat.value}{stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
