import { Route, Routes } from "react-router";
import { useRoutes } from "./useRoutes";

export function Router() {
  const { routes } = useRoutes();
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.label} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}
