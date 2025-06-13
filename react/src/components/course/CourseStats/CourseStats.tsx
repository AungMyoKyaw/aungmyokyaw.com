import type { StatsData } from '../../../types';
import { useAccessibility } from '../../../contexts';

interface CourseStatsProps {
  stats: StatsData;
}

export const CourseStats = ({ stats }: CourseStatsProps) => {
  const { highContrast } = useAccessibility();

  const statItems = [
    {
      value: stats.completedCourses,
      label: "Courses Completed",
      color: highContrast ? "text-green-200" : "text-green-300"
    },
    {
      value: stats.inProgressCourses,
      label: "In Progress",
      color: highContrast ? "text-orange-200" : "text-orange-300"
    },
    {
      value: stats.specializations,
      label: "Specializations",
      color: highContrast ? "text-blue-200" : "text-blue-300"
    },
    {
      value: stats.totalCourses,
      label: "Total Courses",
      color: highContrast ? "text-purple-200" : "text-purple-300"
    }
  ];

  return (
    <section
      className="mt-8 flex flex-wrap justify-center gap-6"
      aria-label="Learning statistics"
    >
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`rounded-full border px-6 py-4 shadow-stats backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-stats-hover ${
            highContrast
              ? "border-white/25 bg-black/70 hover:border-white/40"
              : "border-white/15 bg-black/50 hover:border-white/25"
          }`}
        >
          <span className={`block text-2xl font-bold ${item.color}`}>
            {item.value}
          </span>
          <p
            className={`mt-1 text-sm drop-shadow-text-medium ${
              highContrast ? "text-white" : "text-white/95"
            }`}
          >
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
};
