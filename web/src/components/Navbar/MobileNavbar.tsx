import { House, List, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./MobileNavbar.module.css";

export function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!(e.target instanceof Node)) return;

      // Close if clicked outside navbar
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setOpen(false);
        return;
      }

      // Close if clicked on an <a> tag
      const anchor = e.target instanceof HTMLElement ? e.target.closest("a") : undefined;
      if (anchor) setTimeout(() => setOpen(false), 100);
    }
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)} className={styles.menu}>
        <List size={30} />
      </button>
      {open && (
        <nav ref={navbarRef} className={styles.navbar}>
          <Link to="/">
            <House size={30} />
            Home
          </Link>
          <Link to="/search">
            <MagnifyingGlass size={30} />
            Search
          </Link>
        </nav>
      )}
    </>
  );
}
