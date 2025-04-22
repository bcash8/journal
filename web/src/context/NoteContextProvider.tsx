import { useLiveQuery } from "dexie-react-hooks";
import { ReactNode } from "react";
import { getNote, getTagsForNote } from "../db/notesDB";
import { NoteContext } from "./NoteContext";

export function NoteContextProvider({ noteId, children }: { noteId: string; children: ReactNode }) {
  const note = useLiveQuery(() => getNote(noteId), [noteId]);
  const tags = useLiveQuery(() => getTagsForNote(noteId), [noteId]);

  const context = {
    note: note ?? null,
    tags: tags ?? null
  };
  return <NoteContext.Provider value={context}>{children}</NoteContext.Provider>;
}
