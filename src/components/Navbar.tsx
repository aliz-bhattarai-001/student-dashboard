import type { NavBarProps } from "../types/student";
import styles from "./Navbar.module.css";

export function NavBar({ navElements }: NavBarProps) {
    return (
        <section className={styles.navbar}>
            <h1 className={styles.logo}>StudentHub</h1>

            <nav className={styles.navLinks}>
                <ul className={styles.navList}>

                    {navElements.map(each => (
                        <li key={each.name}>
                            <a href={each.link}>
                                {each.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <button className={styles.themeButton} type="button">
                    Toggle Theme
                </button>
            </nav>
        </section>
    );
}
