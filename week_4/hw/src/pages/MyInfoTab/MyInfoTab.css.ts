import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const wrap = style({
  maxWidth: 600,
  margin: "32px auto",
  padding: 24,
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.card,
});

export const label = style({
  display: "block",
  marginBottom: 6,
  fontSize: 14,
});

export const input = style({
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  marginBottom: 14,
});

export const button = style({
  padding: "10px 24px",
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.primary,
  color: "#fff",
  fontWeight: 600,
});
