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
    error: "#F07B7B",
  },
  fonts,
  breakpoints,
});

const textStyling = {
  bigTitle: {
    fontSize: "64px",
    boxShadow: "5px 5px 4px 0px #745FAD40",
    lineHeight: "76px",
    fontWeight: "bold",
  },

  h1: {
    fontSize: "32px",
    lineHeight: "37px",
    fontWeight: "700",
  },
  h2: {
    fontSize: "28px",
    fontWeight: "500",
    lineHeight: "33px",
    boxShadow: "2px 2px 4px 0px #00000040",
  },
  h3: {
    fontSize: "24p",
    lineHeight: "28px",
    fontWeight: 500,
  },
  h4: {
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "23.7px",
  },

  body1: {
    fontSize:"18px"

  },
  body2: {
    fontSize:"16px"

  },
  label: {
    fontStyle: "italic",
    fontSize: "16px",
    fontWight:'700'
  },
};

export const themeColors = {};
export const interactions = {
  button: {},
  cards: {},
  iconsButtons: {},
};

export default theme;
