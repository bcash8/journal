import { Note as NoteIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../db/notesDB";
import styles from "./SearchNotePage.module.css";

export function SearchNotesPage() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const tags = useLiveQuery(
    () => db.tags.toArray().then((tags) => tags.sort((a, b) => a.name.localeCompare(b.name))),
    []
  );

  const filteredNotes = useLiveQuery(async () => {
    const lowerSearch = searchString.toLowerCase();

    let notes = await db.notes.toArray();
    if (searchString.trim()) {
      notes = notes.filter((note) => note.title.toLowerCase().includes(lowerSearch));
    }

    if (selectedTag) {
      const noteTags = await db.noteTags
        .where("noteId")
        .anyOf(notes.map((note) => note.id))
        .toArray();

      notes = notes.filter((note) =>
        noteTags.filter((tag) => tag.noteId === note.id).some((tag) => tag.tagId === selectedTag)
      );
    }

    return notes;
  }, [searchString, selectedTag]);

  return (
    <main className={`page`}>
      <h2 className={styles.title}>Search Notes</h2>
      <div className={styles.inputContainer}>
        <input
          placeholder="Note name"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className={styles.nameInput}
        />
        <select onChange={(e) => setSelectedTag(e.target.value)}>
          <option value={""}>No Selection</option>
          {tags?.map((tag, i) => (
            <option key={i} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <ul className={styles.recentList}>
        {filteredNotes?.map((note) => (
          <li key={note.id} onClick={() => navigate(`/editor/${note.id}`)}>
            <NoteIcon size={25} />
            <div>
              <span>{note.title}</span>
              <span>{formatDate(note.updatedAt)}</span>
            </div>
          </li>
        ))}
      </ul>
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
