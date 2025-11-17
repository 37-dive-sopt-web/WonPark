import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const container = style({
  width: "100%",
  backgroundColor: vars.color.primary,
  color: "#fff",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
});

export const left = style({
  fontWeight: 600,
  fontSize: 18,
});

export const menu = style({
  display: "flex",
  gap: 18,
  alignItems: "center",
  "@media": {
    "(max-width: 640px)": {
      display: "none",
    },
  },
});

export const tab = style({
  fontSize: 14,
  paddingBottom: 2,
  borderBottom: "2px solid transparent",
  color: "#fff",
  textDecoration: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 3,
  outline: "none",
});

export const tabActive = style({
  borderBottom: "2px solid #fff",
});

export const logout = style({
  background: "transparent",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  border: "none",
  cursor: "pointer",
});

export const menuBtn = style({
  display: "none",
  "@media": {
    "(max-width: 640px)": {
      display: "block",
      background: "transparent",
      color: "#fff",
      fontSize: 24,
    },
  },
});

export const mobileMenu = style({
  position: "absolute",
  right: 16,
  top: 56,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  padding: "12px 16px",
  borderRadius: 10,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  zIndex: 50,
});

export const mobileMenuItem = style({
  fontSize: 14,
  color: vars.color.text,
  textDecoration: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  outline: "none",
});
