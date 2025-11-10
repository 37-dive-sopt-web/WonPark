import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  fontFamily: "Pretendard",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button", {
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
});

globalStyle("input", {
  fontFamily: "inherit",
  outline: "none",
});
