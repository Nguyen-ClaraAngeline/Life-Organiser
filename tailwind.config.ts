import type { Config } from "tailwindcss";

/**
 * Mushroom-cottage palette
 *  - cream : parchment / linen backgrounds
 *  - moss  : forest greens
 *  - cap   : fly-agaric (toadstool) reds
 *  - bark  : warm browns
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFBF2",
          100: "#FBF3E4",
          200: "#F3E5CC",
        },
        moss: {
          50: "#F1F5EC",
          100: "#DDE8D1",
          200: "#BFD3AB",
          300: "#9DB985",
          400: "#7C9C63",
          500: "#5E8049",
          600: "#4A6838",
          700: "#3A512D",
          800: "#2C3E24",
          900: "#1F2C1A",
        },
        cap: {
          50: "#FDF0EE",
          100: "#FADCD7",
          200: "#F4B7AE",
          300: "#EC8E82",
          400: "#E06556",
          500: "#CC4636",
          600: "#A8352A",
          700: "#832A21",
        },
        bark: {
          50: "#F8F1EA",
          100: "#EBDCCB",
          200: "#D6BB9B",
          300: "#B8926A",
          400: "#966E48",
          500: "#7A5535",
          600: "#5F4129",
          700: "#473020",
          800: "#33231A",
          900: "#221710",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Nunito", "ui-rounded", "system-ui", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        cozy: "0 4px 0 rgb(95 65 41 / 0.06), 0 18px 32px -16px rgb(95 65 41 / 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
