/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
  colors: {
    primary: {
      50:  "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",   // main primary
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },

    secondary: {
      100: "#fff7d6",
      200: "#ffe89c",
      300: "#ffd76e",
      400: "#ffc846",
      500: "#fbbf24",   // warm amber
      600: "#d97706",
    },

    success: {
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
    },

    danger: {
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
    },

    dark: {
      50:  "#f4f4f5",
      100: "#e4e4e7",
      200: "#d4d4d8",
      300: "#a1a1aa",
      400: "#71717a",
      500: "#52525b",
      600: "#3f3f46",
      700: "#27272a",
      800: "#18181b",
      900: "#0f0f10",   // deep charcoal
    },

    brand: {
      yellow: "#F2C94C",
      blue: "#2D9CDB",
      green: "#27AE60",
      red: "#EB5757",
    }
  }
}

  },
  plugins: [],
}
