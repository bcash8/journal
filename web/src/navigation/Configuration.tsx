import { ReactNode } from "react";
import { EditorPage } from "../pages/EditorPage";
import { HomePage } from "../pages/HomePage";
import { SearchNotesPage } from "../pages/SearchNotesPage";

type RouteConfiguration = {
  label: string;
  element: ReactNode;
  path: string;
};

export const configuration: RouteConfiguration[] = [
  {
    label: "Home",
    element: (
      <>
        <HomePage />
      </>
    ),
    path: "/"
  },
  {
    label: "Editor",
    element: (
      <>
        <EditorPage />
      </>
    ),
    path: "/editor/:noteId"
  },
  {
    label: "Search Notes",
    element: (
      <>
        <SearchNotesPage />
      </>
    ),
    path: "/search"
  }
];
