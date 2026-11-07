import { useState } from "react";
import type { AddStudentFormProps, StudentFormData } from "../types/student"
import styles from "./AddStudentForm.module.css"
import type { SubmitEvent } from "react";

export function AddStudentForm({ onAddStudent }: AddStudentFormProps) {
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

    return (
        <>
            <section className={styles.studentForm}>
                <form
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">Name: </label>
                    <input
                        required
                        id="name"
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter Student Name..."
                        value={formData.name}
                        onChange={(ev) => { handleChange("name", ev.target.value) }}
                    ></input>

                    <label htmlFor="age">Age: </label>
                    <input
                        required
                        id="age"

                        min="15"
                        className={styles.formInput}
                        type="number"
                        placeholder="Student Age..."
                        value={formData.age}
                        onChange={(ev) => { handleChange("age", ev.target.value) }}
                    ></input>


                    <label htmlFor="gender">Gender:</label>
                    <select
                        required
                        id="gender"
                        className={styles.formInput}
                        value={formData.gender}
                        onChange={(ev) => {
                            handleChange("gender", ev.target.value as StudentFormData["gender"])
                        }}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label htmlFor="course">Course: </label>
                    <input
                        required
                        id="course"
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter Course Name..."
                        value={formData.course}
                        onChange={(ev) => { handleChange("course", ev.target.value) }}
                    ></input>

                    <label htmlFor="academicYear">Academic Year:</label>
                    <input
                        required
                        id="academicYear"
                        className={styles.formInput}
                        type="number"
                        min="1"
                        value={formData.academicYear}
                        onChange={(ev) => {
                            handleChange("academicYear", ev.target.value)
                        }}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className={styles.formInput}
                        type="email"
                        value={formData.email}
                        onChange={(ev) => {
                            handleChange("email", ev.target.value)
                        }}
                    />


                    <label htmlFor="status">Status:</label>
                    <select
                        required
                        id="status"
                        className={styles.formInput}
                        value={formData.status}
                        onChange={(ev) => {

                            handleChange("status", ev.target.value as StudentFormData["status"])
                        }}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>



                    <button className={styles.addButton} type="submit">Add Student</button>
                </form>
            </section>

        </>
    ) // return AddStudentForm
} // func AddStudentForm() : ReactNode
