import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const title = style({
  fontSize: 24,
  marginBottom: 24,
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
  backgroundColor: vars.color.primary,
  color: vars.color.text,
  fontWeight: 600,
  fontSize: 15,
  transition: "background 0.2s ease",
  selectors: {
    "&:disabled": {
      backgroundColor: "#cfe7e2",
      cursor: "not-allowed",
    },
    "&:not(:disabled):hover": {
      backgroundColor: vars.color.primaryHover,
    },
  },
});

export const helper = style({
  textAlign: "center",
  marginTop: 12,
  fontSize: 13,
});

export const error = style({
  fontSize: 12,
  color: vars.color.danger,
  margin: "4px 0 4px",
});
