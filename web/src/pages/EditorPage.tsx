import { lazy, Suspense, useEffect, useRef, useState } from "react";
import styles from "./EditorPage.module.css";
import { useParams } from "react-router";
import { db } from "../db/notesDB";
import { Pencil } from "@phosphor-icons/react";
import { NoteTags } from "../components/NoteTags/NoteTags";
import { NoteContextProvider } from "../context/NoteContextProvider";
import { useNote } from "../hooks/useNote";

const TiptapEditor = lazy(() => import("../components/Tiptap").then((module) => ({ default: module.Tiptap })));

export function EditorPage() {
  const { noteId } = useParams();

  if (noteId === undefined) return <></>;

  return (
    <NoteContextProvider noteId={noteId}>
      <EditorPageContent />
    </NoteContextProvider>
  );
}

export function EditorPageContent() {
  const note = useNote();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNoteTitle(note.note?.title ?? "");
  }, [note.note?.title]);

  function titleUpdate(newTitle: string) {
    setNoteTitle(newTitle);
    // Debounce updates to db
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => note.note && db.notes.update(note.note.id, { title: newTitle }), 500);
  }

  return (
    <main className={styles.container}>
      <div className={styles.titleInput}>
        <input value={noteTitle} onChange={(e) => titleUpdate(e.target.value)} />
        <Pencil size={20} />
      </div>
      <NoteTags />
      <Suspense fallback={<div>Loading editor...</div>}>
        <TiptapEditor />
      </Suspense>
    </main>
  );
}
