/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#254A72",

        accent: {
          DEFAULT: "#00A7BA",
          hover: "#008695",
        },
        customBlack: {
          main: "#111827",
        },
        customGreen: {
          extraLight: "#F7FDF9",
          light: "#A4DDB9",
          main: "#006F2C",
        },
        customOrange: {
          extraLight: "#FEFCFA",
          light: "#F9BF7E",
          main: "#DE822C",
        },
        customRed: {
          extraLight: "#ff3d3d08",
          light: "#f79f9f",
          main: "#EF4444",
        },
        custom: {
          gray: {
            DEFAULT: "#F9FAFB",
            1: "#F3F4F6",
            2: "#D1D5DB",
            3: "#DFE7EC",
            4: "#EFF5F5",
            5: "#E5E7EB",
            6: "#6B7280",
          },
        },
      },

      boxShadow: {
        base: "0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
      },

      fontFamily: {
        IRANYekan: "IRANYekan",
      },
    },
  },
  plugins: [],
}

