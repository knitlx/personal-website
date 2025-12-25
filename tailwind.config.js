/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        unbounded: ["var(--font-unbounded)"],
      },
      colors: {
        'primary': '#7B68EE',
        'accent': '#9137DF',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
