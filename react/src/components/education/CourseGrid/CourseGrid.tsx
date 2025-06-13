import type { MOOCsData } from '../../../types';
import { CourseCard } from '../CourseCard';

interface CourseGridProps {
  data: MOOCsData;
}

export const CourseGrid = ({ data }: CourseGridProps) => {
  return (
    <section
      className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Course certificates"
    >
      {data.items.map((mooc, index) => (
        <CourseCard key={mooc.courseTitle} mooc={mooc} index={index} />
      ))}
    </section>
  );
};
