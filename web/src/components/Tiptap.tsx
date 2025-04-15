import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "./Tiptap.css";
import { EditorToolbar } from "./EditorToolbar";

const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

export function Tiptap() {
  return (
    <div className="editor-wrapper">
      <EditorProvider extensions={extensions} content={content}>
        <EditorToolbar />
      </EditorProvider>
    </div>
  );
}
