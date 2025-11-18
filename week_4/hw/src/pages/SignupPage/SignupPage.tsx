import { PageLayout } from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import * as styles from "./SignupPage.css.ts";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useSignupForm } from "../../hooks/useSignupForm";
export const SignupPage = () => {
  const nav = useNavigate();
  const f = useSignupForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.step !== 3) return;
    const ok = await f.submit();
    if (ok) {
      alert(`${f.name}님, 회원가입이 완료되었습니다.`);
      nav("/login");
    }
  };
  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>회원가입</h1>
        <div className={styles.step}>Step {f.step} / 3</div>

        {f.step === 1 && (
          <>
            <label className={styles.label} htmlFor="username">
              아이디
            </label>
            <input
              id="username"
              className={styles.input}
              placeholder="아이디를 입력해 주세요"
              value={f.username}
              onChange={(e) => f.setUsername(e.target.value)}
            />
            {f.usernameError && (
              <div className={styles.error}>{f.usernameError}</div>
            )}
            <button
              className={styles.button}
              type="button"
              disabled={!f.canNextFromId}
              onClick={f.goNextFromId}
            >
              다음
            </button>
          </>
        )}

        {f.step === 2 && (
          <>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={f.password}
              onChange={(e) => f.setPassword(e.target.value)}
              placeholder="8~64자, 대/소문자+숫자+특수문자"
            />

            <label className={styles.label}>비밀번호 확인</label>
            <PasswordInput
              className={styles.input}
              value={f.passwordCheck}
              onChange={(e) => f.setPasswordCheck(e.target.value)}
              placeholder="비밀번호 확인"
            />
            {f.passwordError && (
              <div className={styles.error}>{f.passwordError}</div>
            )}
            <button
              className={styles.button}
              type="button"
              disabled={!f.canNextFromPassword}
              onClick={f.goNextFromPassword}
            >
              다음
            </button>
          </>
        )}
        {f.step === 3 && (
          <>
            <label className={styles.label}>이름</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              placeholder="이름을 입력해주세요"
              value={f.name}
              onChange={(e) => f.setName(e.target.value)}
            />

            <label className={styles.label}>이메일</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="name@example.com"
              value={f.email}
              onChange={(e) => f.setEmail(e.target.value)}
            />

            <label className={styles.label}>나이</label>

            <input
              id="age"
              type="number"
              className={styles.input}
              value={f.age}
              placeholder="숫자로 입력"
              onChange={(e) => f.setAge(e.target.value)}
            />
            {f.submitError && (
              <div className={styles.error}>{f.submitError}</div>
            )}
            <button
              type="submit"
              className={styles.button}
              disabled={!f.canSubmit}
            >
              회원가입
            </button>
          </>
        )}
        <div className={styles.helper}>
          이미 계정이 있나요? <Link to="/login">로그인으로 돌아가기</Link>
        </div>
      </form>
    </PageLayout>
  );
};
