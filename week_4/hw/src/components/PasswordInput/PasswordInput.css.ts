import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";
export const wrap = style({
  position: "relative",
});

export const input = style({
  width: "100%",
  padding: "12px 40px 12px 12px",
  borderRadius: 8,
  border: `1px solid ${vars.color.border}`,
  fontSize: 14,
});

export const toggle = style({
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 11,
  background: "transparent",
  color: "#555",
});
