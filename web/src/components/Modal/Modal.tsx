import { ReactNode, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose?: () => void; children?: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    function handleClickOutside(e: MouseEvent) {
      if (contentRef.current && e.target instanceof Node && !contentRef.current.contains(e.target)) onClose?.();
    }

    dialog.addEventListener("click", handleClickOutside);
    return () => {
      dialog.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} onCancel={onClose} className={styles.modal}>
      <div ref={contentRef} className={`${styles.content}`}>
        {children}
      </div>
    </dialog>
  );
}
