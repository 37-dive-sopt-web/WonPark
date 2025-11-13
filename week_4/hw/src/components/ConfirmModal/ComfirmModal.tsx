import * as styles from "./ConfirmModal.css";

interface Props {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal = ({ open, message, onConfirm, onClose }: Props) => {
  if (!open) return null;
  return (
    <div className={styles.backdrop}>
      <div className={styles.box}>
        <h3 className={styles.title}>확인</h3>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={onClose}>
            취소
          </button>
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
