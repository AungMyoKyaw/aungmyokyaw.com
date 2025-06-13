import { useAccessibility } from '../../../contexts';

interface StatusBadgeProps {
  status: 'Completed' | 'In Progress';
  className?: string;
}

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const { highContrast } = useAccessibility();
  const isCompleted = status === 'Completed';

  const baseClasses = 'flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium';
  const statusClasses = isCompleted
    ? 'border border-green-400/30 bg-green-500/20 text-green-300'
    : 'border border-orange-400/30 bg-orange-500/20 text-orange-300';
  const contrastClasses = highContrast ? 'border-2' : '';

  return (
    <output
      className={`${baseClasses} ${statusClasses} ${contrastClasses} ${className}`}
      aria-label={`Course status: ${status}`}
    >
      {isCompleted ? "✓ Done" : "⏳ Learning"}
    </output>
  );
};

interface TypeBadgeProps {
  type: 'Course' | 'Bundle';
  courseCount?: number;
  className?: string;
}

export const TypeBadge = ({ type, courseCount, className = '' }: TypeBadgeProps) => {
  const { highContrast } = useAccessibility();

  const baseClasses = 'rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm';
  const typeClasses = type === 'Bundle'
    ? 'border-purple-400/30 bg-purple-500/20 text-purple-200'
    : 'border-blue-400/30 bg-blue-500/20 text-blue-200';
  const contrastClasses = highContrast ? 'border-2' : '';

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <div className={`${baseClasses} ${typeClasses} ${contrastClasses} ${className}`}>
        {type === 'Bundle' ? '📚' : '📖'} {type}
      </div>
      {courseCount && (
        <div
          className={`rounded-full border px-3 py-1 text-sm font-medium ${
            highContrast
              ? 'border-white/60 bg-white/20 text-white'
              : 'border-white/20 bg-white/10 text-white/80'
          }`}
        >
          {courseCount} course{courseCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};
