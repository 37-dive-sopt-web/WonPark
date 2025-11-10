import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    bg: null,
    surface: null,
    primary: null,
    primaryHover: null,
    danger: null,
    text: null,
    border: null,
  },
  radius: {
    lg: null,
    pill: null,
  },
  shadow: {
    card: null,
  },
  layout: {
    maxWidth: null,
  },
});

export const themeClass = createTheme(vars, {
  color: {
    bg: "#FFE5EC",

    surface: "#FFFFFF",

    primary: "#FF8FAB",

    primaryHover: "#FB6F92",

    danger: "#FF4D6A",

    text: "#222222",

    border: "#F1D1D0",
  },
  radius: {
    lg: "12px",
    pill: "999px",
  },
  shadow: {
    card: "0 10px 30px rgba(0,0,0,0.06)",
  },
  layout: {
    maxWidth: "1200px",
  },
});
