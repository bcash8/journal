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
import { saveNote } from "../db/notesDB";
import { useNote } from "../hooks/useNote";

export function Tiptap() {
  const note = useNote();
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const editor = useEditor({
    extensions: [Text, Document, Paragraph, Bold, Italic, ListItem, BulletList, Orderedlist],
    content: "",
    onUpdate({ editor }) {
      // Debounce updates to database
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(
        () => note.note && saveNote(note.note.id, JSON.stringify(editor.getJSON())),
        500
      );
    },
    immediatelyRender: true,
    shouldRerenderOnTransaction: false
  });

  useEffect(() => {
    async function load() {
      if (note.note && editor) {
        const content = JSON.parse(note.note.content);
        editor.commands.setContent(content);
      }
    }

    load();
  }, [editor, note.note]);

  if (!editor) return <div>Loading editor...</div>;
  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
      <EditorToolbar editor={editor} />
    </div>
  );
}
