import { Link } from "react-router-dom";
import { PageLayout } from "../../components/Layout/Layout";
import * as styles from "./LoginPage.css.ts";

export const LoginPage = () => {
  return (
    <PageLayout>
      <form>
        <h1 className={styles.title}>로그인</h1>
        <label className={styles.label} htmlFor="username">
          아이디
        </label>
        <input
          id="username"
          name="username"
          className={styles.input}
          placeholder="아이디를 입력해주세요"
        />

        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          placeholder="비밀번호를 입력해 주세요"
        />

        <button className={styles.button} type="submit">
          로그인
        </button>

        <div className={styles.helper}>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </PageLayout>
  );
};
