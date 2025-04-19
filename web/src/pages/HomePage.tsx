import { useNavigate } from "react-router";
import { createNote } from "../db/notesDB";
import styles from "./HomePage.module.css";
import { NotePencil } from "@phosphor-icons/react";
export function HomePage() {
  const navigate = useNavigate();

  async function newNote() {
    const id = await createNote();
    navigate(`/editor/${id}`);
  }

  return (
    <main className={`page ${styles.main}`}>
      <h2>Recent Notes</h2>
      <button onClick={newNote} className={styles.newNoteButton}>
        <NotePencil size={40} />
      </button>
    </main>
  );
}
