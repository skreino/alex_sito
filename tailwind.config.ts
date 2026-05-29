import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackdeep: "#050505",
        paper: "#F2F0EA",
        warm: "#B8B4AA",
        ink: "#1C1C1C"
      },
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "'Arial Narrow'", "sans-serif"],
        sans: ["'Franklin Gothic Medium'", "Aptos", "Helvetica", "Arial", "sans-serif"],
        accent: ["Georgia", "serif"]
      },
      letterSpacing: {
        brutal: "0.02em"
      }
    }
  },
  plugins: []
};

export default config;
