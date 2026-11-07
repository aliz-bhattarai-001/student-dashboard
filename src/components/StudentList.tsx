import { StudentCard } from "./StudentCard";
import type { StudentListProps } from "../types/student";
import styles from "./StudentList.module.css";

export function StudentList({ students, onDeleteStudent }: StudentListProps) {
    return (
        <section className={styles.studentList}>
            {students.length > 0 ? (
                students.map(each => (
                    <StudentCard key={each.id} student={each} onDeleteStudent={onDeleteStudent} />
                ))
            ) : (
                <p className={styles.emptyState}>Sorry, No students found.</p>
            )}
        </section>
    );
} // <StudentList /> React Comp


