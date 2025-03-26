/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "pewter-orange": "#fb8500",
        "pewter-black": "#0b090a",
        "pewter-gray": "#f0ebd8",
        "pewter-white": "#ffffff",
      },
      boxShadow: {
        bottom: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
        top: "0 -2px 4px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
