import { PageLayout } from "../../components/Layout/Layout.tsx";
import { Link } from "react-router-dom";
import * as styles from "./SignupPage.css.ts";

export const SignupPage = () => {
  return (
    <PageLayout>
      <form>
        <h1 className={styles.title}>회원가입</h1>

        {/* Step 1: 아이디 */}
        <div className={styles.step}>Step 1 / 3</div>
        <label className={styles.label} htmlFor="username">
          아이디
        </label>
        <input
          id="username"
          className={styles.input}
          placeholder="아이디를 입력해 주세요"
        />
        <button className={styles.button} type="button">
          다음
        </button>

        {/* Step 2: 비밀번호 */}
        <div className={styles.step} style={{ marginTop: 24 }}>
          Step 2 / 3
        </div>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="8~64자, 대/소문자+숫자+특수문자"
        />

        <label className={styles.label} htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          type="password"
          className={styles.input}
          placeholder="비밀번호 확인"
        />

        <button className={styles.button} type="button">
          다음
        </button>

        {/* Step 3: 이름 / 이메일 / 나이 */}
        <div className={styles.step} style={{ marginTop: 24 }}>
          Step 3 / 3
        </div>
        <label className={styles.label} htmlFor="name">
          이름
        </label>
        <input
          id="name"
          className={styles.input}
          placeholder="이름을 입력해 주세요"
        />

        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="name@example.com"
        />

        <label className={styles.label} htmlFor="age">
          나이
        </label>
        <input
          id="age"
          type="number"
          className={styles.input}
          placeholder="숫자로 입력"
        />

        <button className={styles.button} type="submit">
          회원가입
        </button>

        <div className={styles.helper}>
          이미 계정이 있나요? <Link to="/login">로그인으로 돌아가기</Link>
        </div>
      </form>
    </PageLayout>
  );
};
