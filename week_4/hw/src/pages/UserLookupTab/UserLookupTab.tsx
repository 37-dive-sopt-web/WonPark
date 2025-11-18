import * as styles from "./UserLookupTab.css.ts";
import { useState } from "react";
import { api } from "../../api/client";
import type { User } from "../../api/client";
import type { AxiosError } from "axios";

export const UserLookupTab = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setUser(null);
    setError("");

    const userId = Number(id);
    if (isNaN(userId) || userId <= 0) {
      setError("올바른 회원 ID를 입력해주세요.");
      return;
    }

    try {
      const res = await api.get<User>(`/api/v1/users/${userId}`);

      const responseData = res.data as { data?: User } | User;
      const userData =
        "data" in responseData && responseData.data
          ? responseData.data
          : (responseData as User);

      if (userData && userData.id) {
        setUser(userData);
      } else {
        setError("사용자를 찾을 수 없습니다.");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 404) {
        setError(`회원 ID ${id}를 찾을 수 없습니다.`);
      } else if (axiosError.response?.status === 403) {
        setError("접근 권한이 없습니다.");
      } else {
        setError(
          `조회 중 오류가 발생했습니다. (${
            axiosError.response?.status || "알 수 없음"
          })`
        );
      }
    }
  };

  const disabled = id.trim() === "";
  return (
    <div className={styles.wrap}>
      <h2>회원 조회</h2>
      <input
        className={styles.input}
        type="number"
        placeholder="회원 ID를 입력하세요 (숫자)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={disabled}
      >
        확인
      </button>
      {user && (
        <div className={styles.info}>
          <div>이름: {user.name}</div>
          <div>아이디: {user.username}</div>
          <div>이메일: {user.email}</div>
          <div>나이: {user.age}</div>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
