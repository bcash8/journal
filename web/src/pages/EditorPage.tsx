import { Tiptap } from "../components/Tiptap";
import styles from "./EditorPage.module.css";
export function EditorPage() {
  return (
    <main className={styles.container}>
      <Tiptap />
    </main>
  );
}
