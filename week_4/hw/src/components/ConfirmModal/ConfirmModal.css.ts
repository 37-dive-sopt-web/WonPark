import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
});

export const box = style({
  width: 320,
  backgroundColor: vars.color.surface,
  borderRadius: 10,
  padding: "24px 20px 20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
});

export const title = style({
  margin: 0,
  marginBottom: 12,
  fontSize: 18,
});

export const buttons = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 16,
});

export const btn = style({
  padding: "8px 14px",
  borderRadius: 6,
  fontSize: 14,
  backgroundColor: "#f3f3f3",
});

export const primary = style({
  backgroundColor: vars.color.primary,
  color: "#fff",
});
