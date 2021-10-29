import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  body: "Rubik, sans-serif",
  heading: "Rubik, serif",
  mono: "Menlo, monospace",
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
  xxl: "92em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    bgLanding:
      "linear-gradient(177.64deg, #360033 1.93%, #0B8793 42.16%, #A496DE 56.03%)",
    bgDarkBlue: "#0B8793",
    primary: "#7FD8D8",
    seconday: "#FFFF",
  },
  fonts,
  breakpoints,
});

const textStyling = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},

  body1: {},
  body2: {},
  label: {},
};

const themeColors = {};
const interactions = {
  button: {},
  cards: {},
  iconsButtons: {},
};

export default theme;
