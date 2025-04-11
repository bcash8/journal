import { useMemo } from "react";
import { configuration } from "./Configuration";

export function useRoutes() {
  const routes = useMemo(() => configuration, []);

  return { routes };
}
