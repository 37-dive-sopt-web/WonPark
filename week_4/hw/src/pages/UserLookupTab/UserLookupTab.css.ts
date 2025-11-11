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

export const input = style({
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  marginBottom: 10,
});

export const button = style({
  width: "100%",
  padding: 10,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.primary,
  color: "#fff",
  fontWeight: 600,
  selectors: {
    "&:disabled": {
      backgroundColor: "#cfe7e2",
      cursor: "not-allowed",
    },
  },
});

export const info = style({
  marginTop: 20,
  fontSize: 14,
  lineHeight: 1.7,
});

export const error = style({
  marginTop: 12,
  color: vars.color.danger,
});
