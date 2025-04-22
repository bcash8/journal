import { lazy } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Header.module.css";
const MobileNavbar = lazy(() => import("../Navbar/MobileNavbar").then((module) => ({ default: module.MobileNavbar })));

export function Header() {
  const isMobile = useIsMobile();

  return <header className={styles.header}>{isMobile ? <MobileNavbar /> : <Navbar />}</header>;
}
