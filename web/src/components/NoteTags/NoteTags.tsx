import { Plus, Tag } from "@phosphor-icons/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useNote } from "../../hooks/useNote";
import styles from "./NoteTags.module.css";

export function NoteTags() {
  const note = useNote();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <>
      <div className={styles.noteContainer}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ display: "flex", alignItems: "center" }}>
            <Tag size={28} />
          </h3>
          <button onClick={() => setModalOpen(true)}>
            New
            <Plus weight="bold" />
          </button>
        </div>
        <ul>
          {note.tags?.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <p>content</p>
        </Modal>
      )}
    </>
  );
}

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose?: () => void; children?: ReactNode }) {
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
