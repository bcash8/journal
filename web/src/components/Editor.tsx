import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor } from "@milkdown/react";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord-dark.css";
import "./editor.css";

export function Editor() {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: "HERE"
    });
    return crepe;
  }, []);

  return <Milkdown />;
}
