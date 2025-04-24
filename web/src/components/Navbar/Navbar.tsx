import { House, MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router";
import styles from "./Navbar.module.css";
export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <House size={30} />
        Home
      </Link>
      <Link to="/search">
        <MagnifyingGlass size={30} />
        Search
      </Link>
    </nav>
  );
}
