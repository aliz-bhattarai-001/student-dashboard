import { StudentList } from "./components/StudentList"
import { students, navElements } from "./data/data"
import { NavBar } from "./components/Navbar"
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import type { Student, StudentFormData } from "./types/student";
import { AddStudentForm } from "./components/AddStudentForm";

export default function App() {

    const [searchTerm, setSearchTerm] = useState("");
    const [studentList, setStudentList] = useState(students);

    const filteredStudents = studentList.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addStudentHandler = (formData: StudentFormData) => {
        const newStudent: Student = {
            id: crypto.randomUUID(),
            name: formData.name,
            age: Number(formData.age),
            academicYear: Number(formData.academicYear),
            course: formData.course,
            email: formData.email,
            gender: formData.gender,
            status: formData.status
        };

        setStudentList(prevStudentList => [...prevStudentList, newStudent])

    } // func addStudentHandler()

    return (
        <>
            <main>
                <NavBar navElements={navElements} />
                <SearchBar onSearchChange={setSearchTerm} searchTerm={searchTerm} />
                <AddStudentForm onAddStudent={addStudentHandler} />
                <StudentList students={filteredStudents} />
            </main>
        </>
    )
}