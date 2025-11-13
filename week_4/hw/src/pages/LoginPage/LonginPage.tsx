import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/Layout/Layout";
import * as styles from "./LoginPage.css.ts";
import { api } from "../../api/client.ts";
import type { LoginRequest, LoginResponse } from "../../api/client.ts";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserId } = useAuth();
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post<LoginResponse>("/api/v1/auth/login", form);
      setUserId(res.data.id);
      nav("/mypage/info");
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageLayout>
      <form onSubmit={onSubmit}>
        <h1 className={styles.title}>로그인</h1>
        <label className={styles.label} htmlFor="username">
          아이디
        </label>
        <input
          id="username"
          name="username"
          className={styles.input}
          placeholder="아이디를 입력해주세요"
          value={form.username}
          onChange={onChange}
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
          value={form.password}
          onChange={onChange}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <div className={styles.helper}>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </PageLayout>
  );
};
