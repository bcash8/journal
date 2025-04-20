import Dexie, { Table } from "dexie";
import { v4 } from "uuid";

export type Note = {
  id: string; //UUID
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  id: string;
  name: string;
  description?: string;
};

export type NoteTag = {
  id: string;
  noteId: string;
  tagId: string;
};

class NotesDexie extends Dexie {
  notes!: Table<Note, string>;
  tags!: Table<Tag, string>;
  noteTags!: Table<NoteTag, string>;

  constructor() {
    super("notesDB");
    this.version(1).stores({
      notes: "id, createdAt, updatedAt",
      tags: "id, name, description",
      noteTags: "id, noteId, tagId"
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

export async function addTag(name: string, description?: string) {
  const id = v4();
  await db.tags.add({ id, name, description });
  return id;
}

export async function tagNote(noteId: string, tagId: string) {
  const id = v4();
  const existingTags = await db.noteTags.where("noteId").equals(noteId).toArray();
  if (existingTags.some((noteTag) => noteTag.tagId === tagId)) return;
  await db.noteTags.add({ id, noteId, tagId });
}

export async function untagNote(noteId: string, tagId: string) {
  const link = await db.noteTags
    .where("noteId")
    .equals(noteId)
    .and((link) => link.tagId === tagId)
    .first();

  if (link) {
    await db.noteTags.delete(link.id);
    return true;
  }

  return false;
}

export async function getTagsForNote(noteId: string): Promise<Tag[]> {
  const links = await db.noteTags.where("noteId").equals(noteId).toArray();
  const tagIds = links.map((l) => l.tagId);
  const tags = await db.tags.bulkGet(tagIds);
  if (tags === undefined) return [];
  return tags.filter((tag) => tag !== undefined);
}

export async function getNotesForTag(tagId: string) {
  const links = await db.noteTags.where("tagId").equals(tagId).toArray();
  const noteIds = links.map((l) => l.noteId);
  return await db.notes.bulkGet(noteIds);
}
