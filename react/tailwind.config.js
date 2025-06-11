export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          primary: "rgba(255, 255, 255, 0.09)",
          secondary: "rgba(255, 255, 255, 0.06)",
          tertiary: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.18)",
          "border-hover": "rgba(255, 255, 255, 0.28)"
        },
        spectrum: {
          purple: "rgba(139, 92, 246, 0.6)",
          blue: "rgba(59, 130, 246, 0.6)",
          cyan: "rgba(34, 211, 238, 0.6)",
          teal: "rgba(20, 184, 166, 0.6)",
          emerald: "rgba(16, 185, 129, 0.6)",
          pink: "rgba(236, 72, 153, 0.6)",
          orange: "rgba(251, 146, 60, 0.6)"
        }
      },
      backdropBlur: {
        subtle: "12px",
        medium: "24px",
        strong: "40px",
        extreme: "60px"
      },
      backgroundImage: {
        "liquid-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.04) 100%)",
        "liquid-gradient-hover":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.14) 25%, rgba(255, 255, 255, 0.10) 50%, rgba(255, 255, 255, 0.14) 75%, rgba(255, 255, 255, 0.08) 100%)",
        "spectrum-aurora":
          "linear-gradient(45deg, var(--spectrum-purple), var(--spectrum-blue), var(--spectrum-cyan), var(--spectrum-teal), var(--spectrum-emerald), var(--spectrum-pink), var(--spectrum-orange))"
      },
      animation: {
        "liquid-float": "liquid-float 8s ease-in-out infinite",
        "liquid-glow": "liquid-glow 4s ease-in-out infinite",
        "liquid-shimmer": "liquid-shimmer 3s ease-in-out infinite",
        "morphing-blob": "morphing-blob 12s ease-in-out infinite",
        "spectrum-shift": "spectrum-shift 6s linear infinite",
        "liquid-pulse": "liquid-pulse 2s ease-in-out infinite",
        "aurora-shift": "aurora-shift 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1)"
      },
      boxShadow: {
        glass:
          "0 8px 32px 0 rgba(0, 0, 0, 0.24), 0 4px 16px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "glass-hover":
          "0 20px 64px 0 rgba(0, 0, 0, 0.35), 0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 2px 0 rgba(255, 255, 255, 0.15)",
        "glass-active":
          "0 32px 80px 0 rgba(0, 0, 0, 0.45), 0 12px 48px 0 rgba(0, 0, 0, 0.25), inset 0 3px 0 rgba(255, 255, 255, 0.2)",
        "spectrum-glow":
          "0 8px 24px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        "spectrum-glow-hover":
          "0 16px 48px rgba(139, 92, 246, 0.5), 0 8px 24px rgba(59, 130, 246, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3)"
      },
      borderRadius: {
        liquid: "24px",
        "liquid-lg": "28px",
        "liquid-xl": "32px"
      }
    }
  },
  plugins: []
};
