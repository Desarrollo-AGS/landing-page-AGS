import { Stat } from "@/components/ui/Stat";
import { getEstadisticasPublicables } from "@/data/estadisticas";

export default function StatsCounter() {
  const estadisticas = getEstadisticasPublicables();

  return (
    <section className="bg-brand-navy py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {estadisticas.map((estadistica) => (
          <Stat
            key={estadistica.id}
            value={estadistica.value}
            label={estadistica.label}
            suffix={estadistica.suffix}
            pendingContent={estadistica.pendingContent}
          />
        ))}
      </div>
    </section>
  );
}
