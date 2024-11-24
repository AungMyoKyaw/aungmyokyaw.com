// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D1F2D", // A deep navy for a confident and trustworthy tone.
        secondary: "#F5F5F7", // A soft, warm light gray for backgrounds.
        accent: "#007AFF", // A bright, modern blue for highlights and call-to-actions.
        muted: "#7D7D7D", // A mid-gray for secondary text and muted content.
        dark: "#1C1C1E", // Rich, near-black for text and key elements.
        light: "#FFFFFF", // Crisp white for clean and minimal spaces.
        info: "#5AC8FA", // A bright cyan for informational elements.
        warning: "#FF9500", // A warm amber for non-critical warnings.
        danger: "#FF3B30", // A bold red for errors and alerts.
        success: "#34C759" // A fresh green for success feedback.
      }
    }
  },
  plugins: []
};
