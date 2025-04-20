import { ReactNode, useEffect, useState } from "react";
import { NoteContext } from "./NoteContext";
import { getNote, getTagsForNote, Note, Tag } from "../db/notesDB";

export function NoteContextProvider({ noteId, children }: { noteId: string; children: ReactNode }) {
  const [note, setNote] = useState<Note | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);

  useEffect(() => {
    async function syncNoteDetails() {
      const note = await getNote(noteId);
      const tags = await getTagsForNote(noteId);
      if (note === undefined) return;
      setNote(note);
      setTags(tags);
    }

    syncNoteDetails();
  }, [noteId]);

  const context = {
    note,
    tags
  };
  return <NoteContext.Provider value={context}>{children}</NoteContext.Provider>;
}
