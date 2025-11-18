import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const title = style({
  fontSize: 24,
  marginBottom: 24,
});

export const step = style({
  marginBottom: 12,
  fontSize: 13,
  color: vars.color.text,
});

export const label = style({
  display: "block",
  marginBottom: 6,
  fontSize: 14,
});

export const input = style({
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  marginBottom: 14,
  fontSize: 14,
});

export const button = style({
  width: "100%",
  padding: "14px 0",
  borderRadius: vars.radius.pill,

  backgroundColor: vars.color.primaryHover,
  color: vars.color.text,
  fontWeight: 600,
  fontSize: 15,
  marginTop: 4,
  selectors: {
    "&:disabled": {
      backgroundColor: vars.color.primary,
      cursor: "not-allowed",
    },
    "&:not(:disabled):hover": {
      backgroundColor: vars.color.primaryHover,
    },
  },
});

export const error = style({
  fontSize: 12,
  color: vars.color.danger,
  marginTop: 6,
  marginBottom: 10,
});

export const helper = style({
  marginTop: 14,
  fontSize: 13,
  textAlign: "center",
  cursor: "pointer",
});
