import type { SearchBarProps } from "../types/student";
import styles from "./SearchBar.module.css";

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search students by name..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>
    ) // return SearchBar
};  // func SearchBar() : ReactNode
