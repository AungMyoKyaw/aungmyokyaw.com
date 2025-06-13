import { useAccessibility } from '../../../contexts';
import { GlassContainer } from '../../ui';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  const { highContrast } = useAccessibility();

  return (
    <section className="mb-16 text-center" aria-labelledby="learning-journey-title">
      <GlassContainer className="mb-8 inline-block p-8">
        <h2
          id="learning-journey-title"
          className={`mb-6 text-5xl font-black drop-shadow-text-high ${
            highContrast ? "text-white" : "text-white"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mx-auto max-w-3xl text-lg leading-relaxed drop-shadow-text-medium ${
            highContrast ? "text-white" : "text-white/95"
          }`}
        >
          {description}
          <span className="font-semibold text-white">
            {" "}
            Click any card to explore the certificate
          </span>{" "}
          and dive into the skills I've mastered. 🎓
        </p>
      </GlassContainer>
    </section>
  );
};
