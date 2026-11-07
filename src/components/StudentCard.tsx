import type { StudentCardProps } from "../types/student";
import styles from "./StudentCard.module.css"


export function StudentCard({ student, onDeleteStudent }: StudentCardProps) {
    return (
        <article className={styles.studentCard}>
            <h2 className={styles.studentName}>{student.name}</h2>
            <p>{student.course}</p>
            <p>Academic Year: {student.academicYear}</p>
            <p>{student.age} years old</p>
            <p>{student.gender}</p>

            {/* or we can also use: {student.email ? <p>{student.email}</p> : null} */}
            {student.email && <p>{student.email}</p>}
            <p className={student.status === "Active" ? styles.statusActive : styles.statusInactive}>{student.status}</p>
            <button className={styles.deleteButton} type="button" onClick={() => onDeleteStudent(student.id)}>
                Delete
            </button>
        </article>
    ) // return StudentCard()
} // React Component: <StudentCard/>