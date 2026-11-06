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
        onAddStudent(formData);

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
                        onChange={(ev) => { setFormData({ ...formData, name: ev.target.value }) }}
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
                        onChange={(ev) => { setFormData({ ...formData, age: ev.target.value }) }}
                    ></input>


                    <label htmlFor="gender">Gender:</label>
                    <select
                        required
                        id="gender"
                        className={styles.formInput}
                        value={formData.gender}
                        onChange={(ev) => {
                            setFormData({ ...formData, gender: ev.target.value as StudentFormData["gender"] });
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
                        onChange={(ev) => { setFormData({ ...formData, course: ev.target.value }) }}
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
                            setFormData({
                                ...formData,
                                academicYear: ev.target.value
                            });
                        }}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className={styles.formInput}
                        type="email"
                        value={formData.email}
                        onChange={(ev) => {
                            setFormData({
                                ...formData,
                                email: ev.target.value
                            });
                        }}
                    />


                    <label htmlFor="status">Status:</label>
                    <select
                        required
                        id="status"
                        className={styles.formInput}
                        value={formData.status}
                        onChange={(ev) => {
                            setFormData({
                                ...formData,
                                status: ev.target.value as StudentFormData["status"]
                            });
                        }}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>



                    <button type="submit">Add Student</button>
                </form>
            </section>

        </>
    ) // return AddStudentForm
} // func AddStudentForm() : ReactNode
