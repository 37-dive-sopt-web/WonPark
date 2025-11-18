import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const pageWrapper = style({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
  backgroundColor: vars.color.surface,
});

export const card = style({
  width: "100%",
  maxWidth: "600px",
  backgroundColor: vars.color.surface,
});
