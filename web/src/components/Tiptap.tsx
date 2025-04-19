import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Orderedlist from "@tiptap/extension-ordered-list";

import "./Tiptap.css";
import { EditorToolbar } from "./EditorToolbar";
import { useEffect, useRef } from "react";
import { getNote, saveNote } from "../db/notesDB";

export function Tiptap({ noteId }: { noteId: string }) {
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editor = useEditor({
    extensions: [Text, Document, Paragraph, Bold, Italic, ListItem, BulletList, Orderedlist],
    content: "",
    onUpdate({ editor }) {
      // Debounce updates to database
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(() => saveNote(noteId, JSON.stringify(editor.getJSON())), 500);
    }
  });

  useEffect(() => {
    async function load() {
      const note = await getNote(noteId);
      if (note && editor) {
        const content = JSON.parse(note.content);
        editor.commands.setContent(content);
      }
    }

    load();
  }, [noteId, editor]);

  if (!editor) return <div>Loading editor...</div>;
  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
      <EditorToolbar editor={editor} />
    </div>
  );
}
