import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export function useNote() {
  const context = useContext(NoteContext);
  if (!context) throw new Error("useNote must be used within a NoteContextProvider");
  return context;
}
