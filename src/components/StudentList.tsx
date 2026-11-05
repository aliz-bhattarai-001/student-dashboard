import { StudentCard } from "./StudentCard";
import type { StudentListProps } from "../types/student";
import styles from "./StudentList.module.css"

export function StudentList({ students }: StudentListProps) {
    return (
        <section className={styles.StudentList}>
            {
                students.map(each => (
                    <StudentCard
                        key={each.id}
                        student={each}
                    />
                ))
            }
        </section>
    )


} // function StudentList




