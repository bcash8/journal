import Dexie, { Table } from "dexie";
import { v4 } from "uuid";

export type Note = {
  id: string; //UUID
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

class NotesDexie extends Dexie {
  notes!: Table<Note, string>;

  constructor() {
    super("notesDB");
    this.version(1).stores({
      notes: "id, createdAt, updatedAt"
    });
  }
}

export const db = new NotesDexie();

export async function createNote() {
  const id = v4();
  const timestamp = new Date().toISOString();
  await db.notes.add({
    id,
    title: "Untitled",
    content: JSON.stringify({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "new note" }] }]
    }),
    createdAt: timestamp,
    updatedAt: timestamp
  });

  return id;
}

export async function saveNote(id: string, content: string, title?: string) {
  const updatedAt = new Date().toISOString();
  await db.notes.update(id, { content, updatedAt, ...(title ? { title } : {}) });
}

export async function getNote(id: string) {
  return db.notes.get(id);
}
