import { ReactNode } from "react";
import { EditorPage } from "../pages/EditorPage";

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
        <EditorPage />
      </>
    ),
    path: "/"
  }
];
