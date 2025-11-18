import * as styles from "./MyInfoTab.css";
import { useMyInfo } from "../../hooks/useMyInfo";
import { useState } from "react";

export const MyInfoTab = () => {
  const {
    user,
    name,
    email,
    age,
    setName,
    setEmail,
    setAge,
    hasChanges,
    save,
  } = useMyInfo();
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const ok = await save();
    setIsSaving(false);
    alert(ok ? "정보가 수정되었습니다." : "저장 중 오류가 발생했습니다.");
  };

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 16, fontSize: 14 }}>
          아이디: <strong>{user.username}</strong>
        </div>

        <label className={styles.label}>이름</label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>나이</label>
        <input
          className={styles.input}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button
          className={styles.button}
          type="submit"
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
  );
};
