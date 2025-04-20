import { createContext } from "react";
import { Note, Tag } from "../db/notesDB";

export type NoteContextType = {
  note: Note | null;
  tags: Tag[] | null;
};

export const NoteContext = createContext<NoteContextType | undefined>(undefined);
