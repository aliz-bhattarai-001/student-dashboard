import { useEffect, useState } from "react";
import type { AddStudentFormProps, StudentFormData } from "../types/student"
import styles from "./AddStudentForm.module.css"
import type { SubmitEvent } from "react";
import { useRef } from "react";


export function AddStudentForm({ onAddStudent, onCancel }: AddStudentFormProps) {
    const [formData, setFormData] = useState<StudentFormData>({
        name: "",
        age: "",
        academicYear: "",
        course: "",
        email: "",
        gender: "Other",
        status: "Active"
    });

    const handleSubmit = (ev: SubmitEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const success = onAddStudent(formData);
        if (success) {
            setFormData({
                name: "",
                age: "",
                academicYear: "",
                course: "",
                email: "",
                gender: "Other",
                status: "Active"
            });

            onCancel(); // to restore focus
        }
        else {
            return;
        }
    } // func handleSubmit(s)


    // K extends keyof means that now K can have any value among keys of StudentForm data only
    function handleChange<K extends keyof StudentFormData>(
        field: K,
        value: StudentFormData[K]
    ) {
        setFormData(previousData => ({
            ...previousData,
            [field]: value
        }));
    }


    const nameInputRef = useRef<HTMLInputElement>(null);
    // sets the current foucus on the referred object.
    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    return (
        <section className={styles.studentForm}>
            <h2 id="add-student-title">Add Student Details: </h2>
            <form onSubmit={handleSubmit} className={styles.formGrid}>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        ref={nameInputRef}
                        required
                        id="name"
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter student name..."
                        value={formData.name}
                        onChange={(ev) => handleChange("name", ev.target.value)}
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="age">Age</label>
                    <input
                        required
                        id="age"
                        min="15"
                        className={styles.formInput}
                        type="number"
                        placeholder="Student age..."
                        value={formData.age}
                        onChange={(ev) => handleChange("age", ev.target.value)}
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="gender">Gender</label>
                    <select
                        required
                        id="gender"
                        className={styles.formInput}
                        value={formData.gender}
                        onChange={(ev) =>
                            handleChange("gender", ev.target.value as StudentFormData["gender"])
                        }
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label htmlFor="course">Course</label>
                    <input
                        required
                        id="course"
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter course name..."
                        value={formData.course}
                        onChange={(ev) => handleChange("course", ev.target.value)}
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="academicYear">Academic Year</label>
                    <input
                        required
                        id="academicYear"
                        className={styles.formInput}
                        type="number"
                        min="1"
                        placeholder="e.g. 2026"
                        value={formData.academicYear}
                        onChange={(ev) =>
                            handleChange("academicYear", ev.target.value)
                        }
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="status">Status</label>
                    <select
                        required
                        id="status"
                        className={styles.formInput}
                        value={formData.status}
                        onChange={(ev) =>
                            handleChange("status", ev.target.value as StudentFormData["status"])
                        }
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        className={styles.formInput}
                        type="email"
                        placeholder="Enter email address..."
                        value={formData.email}
                        onChange={(ev) => handleChange("email", ev.target.value)}
                    />
                </div>

                <div className={`${styles.formActions} ${styles.fullWidth}`}>
                    <button
                        className={styles.cancelButton}
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.addButton}
                        type="submit"
                    >
                        Add Student
                    </button>
                </div>

            </form>
        </section>
    );
    // return AddStudentForm
} // func AddStudentForm() : ReactNode
