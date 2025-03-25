/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "pewter-orange": "#f4a261",
        "pewter-gray": "#909EAE",
      },
      boxShadow: {
        bottom: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
        top: "0 -2px 4px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
