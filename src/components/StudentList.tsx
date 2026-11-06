import { StudentCard } from "./StudentCard";
import type { StudentListProps } from "../types/student";
import styles from "./StudentList.module.css";

export function StudentList({ students }: StudentListProps) {
    return (
        <section className={styles.studentList}>
            {students.map(each => (
                <StudentCard
                    key={each.id}
                    student={each}
                />
            ))}
        </section>
    );
} // <StudentList /> React Comp


