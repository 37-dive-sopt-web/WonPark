import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as styles from "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { DeleteAccountModal } from "../DeleteAccountModal/DeleteAccountModal";
import { useMyInfo } from "../../hooks/useMyInfo";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { logout } = useAuth();
  const { user } = useMyInfo();

  const loc = useLocation();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  const tabClass = (path: string) =>
    `${styles.tab} ${loc.pathname === path ? styles.tabActive : ""}`;

  return (
    <>
      <header className={styles.container}>
        <div className={styles.left}>
          안녕하세요, {user?.name ? `${user.name}님` : "..."}
        </div>

        <nav className={styles.menu}>
          <Link to="/mypage/info" className={tabClass("/mypage/info")}>
            내 정보
          </Link>
          <Link to="/mypage/users" className={tabClass("/mypage/users")}>
            회원 조회
          </Link>
          <button
            className={styles.tab}
            onClick={() => setShowDeleteModal(true)}
          >
            회원탈퇴
          </button>
          <button className={styles.logout} onClick={handleLogout}>
            로그아웃
          </button>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button className={styles.menuBtn} onClick={() => setOpen((v) => !v)}>
          ☰
        </button>
      </header>

      {open && (
        <div className={styles.mobileMenu}>
          <Link
            to="/mypage/info"
            onClick={() => setOpen(false)}
            className={styles.mobileMenuItem}
          >
            내 정보
          </Link>
          <Link
            to="/mypage/users"
            onClick={() => setOpen(false)}
            className={styles.mobileMenuItem}
          >
            회원 조회
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              setShowDeleteModal(true);
            }}
            className={styles.mobileMenuItem}
          >
            회원탈퇴
          </button>
          <button onClick={handleLogout} className={styles.mobileMenuItem}>
            로그아웃
          </button>
        </div>
      )}

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};
