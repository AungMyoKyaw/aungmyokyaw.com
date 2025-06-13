import type { MOOCsData } from '../../../types';
import { MOOCCard } from '../MOOCCard';

interface MOOCGridProps {
  data: MOOCsData;
}

export const MOOCGrid = ({ data }: MOOCGridProps) => {
  return (
    <section
      className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Course certificates"
    >
      {data.items.map((mooc, index) => (
        <MOOCCard key={mooc.courseTitle} mooc={mooc} index={index} />
      ))}
    </section>
  );
};
