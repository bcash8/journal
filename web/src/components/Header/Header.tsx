import { lazy } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
const MobileNavbar = lazy(() => import("../Navbar/MobileNavbar").then((module) => ({ default: module.MobileNavbar })));
import styles from "./Header.module.css";

export function Header() {
  const isMobile = useIsMobile();

  return <header className={styles.header}>{isMobile && <MobileNavbar />}</header>;
}
