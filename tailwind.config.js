module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  future: {},
  theme: {
    extend: {
      colors: {
        action: "#001aff",
        paper: "#F2F2F2",
        lightgray: "#808080",
        smoke: "rgba(0, 0, 0, 0.5)",
      },
      maxWidth: {
        container: "97rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
