import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: "32px 24px",
  width: "90%",
  maxWidth: 400,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const title = style({
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 12,
  textAlign: "center",
  color: "#333",
});

export const message = style({
  fontSize: 14,
  color: "#666",
  marginBottom: 24,
  textAlign: "center",
  lineHeight: 1.5,
});

export const buttonGroup = style({
  display: "flex",
  gap: 12,
});

export const cancelButton = style({
  flex: 1,
  padding: "12px 24px",
  borderRadius: 8,
  border: "1px solid #ddd",
  backgroundColor: "#fff",
  color: "#333",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: "#f5f5f5",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const deleteButton = style({
  flex: 1,
  padding: "12px 24px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#ef4444",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: "#dc2626",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});
