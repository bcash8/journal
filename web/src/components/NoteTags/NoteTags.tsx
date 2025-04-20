import { Plus, Tag } from "@phosphor-icons/react";
import { useNote } from "../../hooks/useNote";
import styles from "./NoteTags.module.css";

export function NoteTags() {
  const note = useNote();
  return (
    <div className={styles.noteContainer}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ display: "flex", alignItems: "center" }}>
          <Tag size={28} />
        </h3>
        <button>
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
  );
}
