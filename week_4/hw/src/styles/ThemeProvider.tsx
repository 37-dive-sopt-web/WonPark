import type { ReactNode } from "react";
import { themeClass } from "./theme.css";

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  return <div className={themeClass}>{children}</div>;
};
