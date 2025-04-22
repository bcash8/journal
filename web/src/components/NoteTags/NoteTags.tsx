import { CheckCircle, Pencil, Plus, Tag as TagIcon } from "@phosphor-icons/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { v4 } from "uuid";
import { db, tagNote, untagNote } from "../../db/notesDB";
import { useNote } from "../../hooks/useNote";
import { Modal } from "../Modal/Modal";
import styles from "./NoteTags.module.css";

export function NoteTags() {
  const note = useNote();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.noteContainer}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ display: "flex", alignItems: "center" }}>
            <TagIcon size={28} />
          </h3>
          <button onClick={() => setModalOpen(true)}>
            Add
            <Plus />
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
          <div className={styles.modalContent}>
            <AddTag />
            <ExistingTagSelection />
          </div>
        </Modal>
      )}
    </>
  );
}

function ExistingTagSelection() {
  const tags = useLiveQuery(
    () => db.tags.toArray().then((tags) => tags.sort((a, b) => a.name.localeCompare(b.name))),
    []
  );
  const note = useNote();

  async function handleTagClick(id: string) {
    if (!note || !note.note) return;
    if (note.tags?.some((tag) => tag.id === id)) {
      await untagNote(note.note.id, id);
    } else {
      await tagNote(note.note.id, id);
    }
  }

  if (!tags || !note) return <>Loading</>;

  return (
    <div className={styles.exisitingTagContainer}>
      <h4>Existing Tags</h4>
      <ul>
        {tags.map((tag, i) => (
          <li
            key={i}
            className={`${styles.tagItem} ${
              note.tags?.some((noteTag) => noteTag.id === tag.id) ? styles.appliedTag : ""
            }`}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTag() {
  const [tagName, setTagName] = useState("");

  async function addTag() {
    const id = v4();
    await db.tags.add({ id, name: tagName });
    setTagName("");
  }

  return (
    <div className={styles.addTagContainer}>
      <h4>New Tag</h4>
      <div className={styles.addTagInputRow}>
        <div className={styles.titleInput}>
          <input value={tagName} onChange={(e) => setTagName(e.target.value)} />
          <Pencil size={20} />
        </div>
        <button className={styles.addTagApplyButton} disabled={tagName === ""} onClick={addTag}>
          <CheckCircle size={28} />
        </button>
      </div>
    </div>
  );
}
