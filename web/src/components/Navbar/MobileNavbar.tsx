import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./MobileNavbar.module.css";
import { House, List } from "@phosphor-icons/react";
export function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navbarRef.current === null) return;
      if (e.target instanceof Node && navbarRef.current.contains(e.target)) return;
      setOpen(false);
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
          <Link to="/">
            <House size={30} />
            Home
          </Link>
        </nav>
      )}
    </>
  );
}
