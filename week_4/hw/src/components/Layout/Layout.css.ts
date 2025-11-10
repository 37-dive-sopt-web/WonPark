import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const pageWrapper = style({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  padding: "60px 16px",
});

export const card = style({
  width: "100%",
  maxWidth: "480px",
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  padding: "32px 32px 40px",
  boxShadow: vars.shadow.card,
});
