import { ReactNode } from "react";
import { EditorPage } from "../pages/EditorPage";
import { HomePage } from "../pages/HomePage";

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
  }
];
