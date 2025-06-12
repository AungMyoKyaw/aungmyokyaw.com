import { useEffect, useState } from "react";

interface EnhancedLoaderProps {
  onComplete: () => void;
}

const EnhancedLoader: React.FC<EnhancedLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Initializing");

  const loadingSteps = [
    { label: "Initializing", duration: 300 },
    { label: "Loading Experience", duration: 400 },
    { label: "Preparing Content", duration: 300 },
    { label: "Almost Ready", duration: 200 }
  ];

  useEffect(() => {
    let stepIndex = 0;
    let currentProgress = 0;

    const runStep = () => {
      if (stepIndex >= loadingSteps.length) {
        setProgress(100);
        setTimeout(onComplete, 200);
        return;
      }

      const step = loadingSteps[stepIndex];
      setCurrentStep(step.label);

      const stepProgress = 100 / loadingSteps.length;
      const interval = setInterval(() => {
        currentProgress += stepProgress / (step.duration / 50);
        setProgress(Math.min(currentProgress, (stepIndex + 1) * stepProgress));
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        stepIndex++;
        runStep();
      }, step.duration);
    };

    runStep();
  }, [onComplete]);

  return (
    <div className="enhanced-loading-wrapper relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Enhanced liquid glass loading container */}
      <div className="relative z-10 text-center">
        {/* Main Loading Orb */}
        <div className="relative mx-auto mb-8 h-24 w-24">
          <div className="absolute inset-0 animate-liquid-pulse rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-black/40 shadow-glass backdrop-blur-2xl">
            <div className="text-2xl font-bold text-white">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto mb-6 w-64 overflow-hidden rounded-full border border-white/20 bg-black/20 p-1 backdrop-blur-md">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="text-lg font-medium text-glass-primary">
          {currentStep}
        </div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`loader-particle-${i}`}
              className="absolute h-1 w-1 animate-liquid-float rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoader;
