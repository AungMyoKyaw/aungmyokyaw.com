// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#146321", // Main green color used in your components
        secondary: "#f8f8f8", // Light background color
        accent: "#4CAF50", // Example accent color, can be customized
        muted: "#808080" // Muted text color
      }
    }
  },
  plugins: []
};
