import * as styles from "./UserLookupTab.css.ts";

export const UserLookupTab = () => {
  return (
    <div className={styles.wrap}>
      <h2>회원 조회</h2>
      <input
        className={styles.input}
        type="number"
        placeholder="회원 ID (숫자만 입력)"
      />
      <button className={styles.button}>확인</button>
    </div>
  );
};
