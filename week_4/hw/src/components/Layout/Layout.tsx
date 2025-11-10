import type { ReactNode } from "react";
import * as styles from "./Layout.css";

export const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.pageWrapper}>
    <div className={styles.card}>{children}</div>
  </div>
);
