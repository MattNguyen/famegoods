module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.js",
      "layouts/**/*.js",
      "pages/**/*.js",
      "plugins/**/*.js",
    ],
  },
  theme: {
    borderRadius: {
      xl: "2rem",
    },
    extend: {
      animation: {
        pulse: "pulse 4s infinite",
      },
      fontFamily: {
        header: ["Recursive"],
      },
    },
  },
  variants: {
    scrollSnapType: ["responsive"],
  },
  plugins: [require("tailwindcss-scroll-snap")],
};
