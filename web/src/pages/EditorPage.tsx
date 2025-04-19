import { lazy, Suspense, useEffect, useState } from "react";
import styles from "./EditorPage.module.css";
import { useParams } from "react-router";
import { db } from "../db/notesDB";
import { Pencil } from "@phosphor-icons/react";

const TiptapEditor = lazy(() => import("../components/Tiptap").then((module) => ({ default: module.Tiptap })));

export function EditorPage() {
  const { noteId } = useParams();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [syncTimoutId, setSyncTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    async function syncNote() {
      if (noteId === undefined) return;

      const note = await db.notes.get(noteId);
      setNoteTitle(note?.title ?? "");
    }

    syncNote();
  }, [noteId]);

  function titleUpdate(newTitle: string) {
    if (noteId === undefined) return;
    setNoteTitle(newTitle);

    // Debounce updates to db
    if (syncTimoutId) clearTimeout(syncTimoutId);
    const timeoutId = setTimeout(() => db.notes.update(noteId, { title: newTitle }), 500);
    setSyncTimeoutId(timeoutId);
  }

  if (noteId === undefined) return <>Unknown note</>;

  return (
    <main className={styles.container}>
      <div className={styles.titleInput}>
        <input value={noteTitle} onChange={(e) => titleUpdate(e.target.value)} />
        <Pencil size={20} />
      </div>
      <Suspense fallback={<div>Loading editor...</div>}>
        <TiptapEditor noteId={noteId} />
      </Suspense>
    </main>
  );
}
