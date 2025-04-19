import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { ListBullets, ListNumbers, TextB, TextItalic } from "@phosphor-icons/react";

export function EditorToolbar({ editor }: { editor: Editor }) {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    if (!editor) return;
    let blurTimeout: number | null = null;
    const handleBlur = () => {
      blurTimeout = setTimeout(() => setVisible(false), 200);
    };

    const handleFocus = () => {
      if (blurTimeout) clearTimeout(blurTimeout);
      setVisible(true);
    };

    editor.on("focus", handleFocus);
    editor.on("blur", handleBlur);

    return () => {
      editor.off("focus", handleFocus);
      editor.off("blur", handleBlur);
    };
  }, [editor]);

  useEffect(() => {
    function updateOffset() {
      const viewport = window.visualViewport;
      if (!viewport) return;
      const offset = window.innerHeight - (viewport.offsetTop + viewport.height);
      setBottomOffset(offset);
    }

    updateOffset();

    window.visualViewport?.addEventListener("resize", updateOffset);
    window.visualViewport?.addEventListener("scroll", updateOffset);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateOffset);
      window.visualViewport?.removeEventListener("scroll", updateOffset);
    };
  }, []);

  if (!visible || !editor) return null;

  return (
    <div className="mobile-toolbar toolbar" style={{ bottom: `${bottomOffset}px` }}>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <TextB />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <TextItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <ListBullets />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListNumbers />
      </button>
    </div>
  );
}
