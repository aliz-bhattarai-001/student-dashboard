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

        // Validating input without solely relying on browser validation alone.
        if (
            formData.name.trim() === "" ||
            formData.course.trim() === "" ||
            formData.age.trim() === "" ||
            formData.academicYear.trim() === ""
        ) {
            alert("Please fill in all required fields.");
            return false;
        }

        const age = Number(formData.age);
        const academicYear = Number(formData.academicYear);

        if (!Number.isInteger(age) || age < 15) {
            alert("Please enter a valid age.");
            return false;
        }

        if (!Number.isInteger(academicYear) || academicYear < 1) {
            alert("Please enter a valid academic year.");
            return false;
        }


        const newStudent: Student = {
            id: crypto.randomUUID(),
            name: formData.name,
            age,
            academicYear,
            course: formData.course,
            email: formData.email,
            gender: formData.gender,
            status: formData.status
        };

        setStudentList(prevStudentList => [...prevStudentList, newStudent])

        return true;

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