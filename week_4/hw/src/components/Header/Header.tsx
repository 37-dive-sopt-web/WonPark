import { useState } from "react";
import { Link } from "react-router-dom";
import * as styles from "./Header.css";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.left}>안녕하세요, 박원님</div>

        <nav className={styles.menu}>
          <Link to="/mypage/info" className={styles.tab}>
            내 정보
          </Link>
          <Link to="/mypage/users" className={styles.tab}>
            회원 조회
          </Link>
          <Link to="/mypage/delete" className={styles.tab}>
            회원탈퇴
          </Link>
          <button className={styles.logout}>로그아웃</button>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button className={styles.menuBtn} onClick={() => setOpen((v) => !v)}>
          ☰
        </button>
      </header>

      {open && (
        <div className={styles.mobileMenu}>
          <Link to="/mypage/info" onClick={() => setOpen(false)}>
            내 정보
          </Link>
          <Link to="/mypage/users" onClick={() => setOpen(false)}>
            회원 조회
          </Link>
          <Link to="/mypage/delete" onClick={() => setOpen(false)}>
            회원탈퇴
          </Link>
          <button onClick={() => setOpen(false)}>로그아웃</button>
        </div>
      )}
    </>
  );
};
