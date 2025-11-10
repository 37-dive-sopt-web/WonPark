import * as styles from "./MyInfoTab.css";

export const MyInfoTab = () => {
  return (
    <div className={styles.wrap}>
      <form>
        <div style={{ marginBottom: 16, fontSize: 14 }}>
          아이디: <strong>qkr.won</strong>
        </div>

        <label className={styles.label}>이름</label>
        <input className={styles.input} placeholder="이름" />

        <label className={styles.label}>이메일</label>
        <input className={styles.input} placeholder="이메일" />

        <label className={styles.label}>나이</label>
        <input className={styles.input} placeholder="나이" />

        <button className={styles.button} type="submit">
          저장
        </button>
      </form>
    </div>
  );
};
