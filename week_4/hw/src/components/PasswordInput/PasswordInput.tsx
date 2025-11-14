import { useState } from "react";
import * as styles from "./PasswordInput.css.ts";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = (props: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.wrap}>
      <input
        {...props}
        type={show ? "text" : "password"}
        className={styles.input}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setShow((v) => !v)}
      >
        {show ? "숨기기" : "보기"}
      </button>
    </div>
  );
};
