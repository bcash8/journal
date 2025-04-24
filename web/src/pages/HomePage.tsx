import { Note as NoteIcon, NotePencil } from "@phosphor-icons/react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createNote, db, Note } from "../db/notesDB";
import styles from "./HomePage.module.css";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function HomePage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const notes = await db.notes.orderBy("updatedAt").reverse().limit(10).toArray();
      setNotes(notes);
    }

    fetchNotes();
  }, []);

  async function newNote() {
    const id = await createNote();
    navigate(`/editor/${id}`);
  }

  return (
    <main className={`page ${styles.main}`}>
      <div className={styles.recentListContainer}>
        <h2 className={styles.recentListTitle}>Recent Notes</h2>
        <ul className={styles.recentList}>
          {notes.map((note) => (
            <li key={note.id} onClick={() => navigate(`/editor/${note.id}`)}>
              <NoteIcon size={25} />
              <div>
                <span>{note.title}</span>
                <span>{formatDate(note.updatedAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={newNote} className={styles.newNoteButton}>
        <NotePencil size={40} />
      </button>
    </main>
  );
}

function formatDate(dateString: string) {
  const date = dayjs(dateString);
  const now = dayjs();

  if (date.isToday()) {
    return `Today, ${date.format("h:mm A")}`;
  }

  if (date.isYesterday()) {
    return `Yesterday, ${date.format("h:mm A")}`;
  }

  if (date.isAfter(now.subtract(7, "day"))) {
    return date.format("dddd, h:mm A");
  }

  return date.format("MMM D, YYYY, h:mm A");
}
