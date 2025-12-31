/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        unbounded: ["var(--font-unbounded)"],
      },
      colors: {
        primary: "#7B68EE",
        accent: "#9137DF",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 15px 35px rgba(123, 104, 238, 0.2)",
        "card-hover-alt":
          "0 10px 25px -5px rgba(123, 104, 238, 0.1), 0 8px 10px -6px rgba(123, 104, 238, 0.1)",
      },
      transitionProperty: {
        card: "transform, box-shadow",
        link: "color, transform",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(45deg, #9137DF, #7B68EE)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-5px)" },
        },
        "scale-x": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "card-hover": "slide-up 0.3s ease-in-out",
        underline: "scale-x 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
