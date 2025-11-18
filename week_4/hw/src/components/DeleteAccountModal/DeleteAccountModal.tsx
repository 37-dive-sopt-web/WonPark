import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import * as styles from "./DeleteAccountModal.css.ts";
import type { AxiosError } from "axios";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal = ({
  isOpen,
  onClose,
}: DeleteAccountModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { userId, logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, isDeleting]);

  if (!isOpen) return null;

  const handleCancel = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  const handleDelete = async () => {
    if (!userId) return;

    setIsDeleting(true);
    try {
      await api.delete(`/api/v1/users/${userId}`);
      alert("회원탈퇴가 완료되었습니다.");
      logout();
      nav("/login");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "회원탈퇴 중 오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>정말 탈퇴하시겠어요?</h2>
        <p className={styles.message}>탈퇴 후에는 모든 정보가 삭제돼요</p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={isDeleting}
          >
            취소
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "처리 중..." : "회원탈퇴"}
          </button>
        </div>
      </div>
    </div>
  );
};
