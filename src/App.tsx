import { StudentList } from "./components/StudentList"
import { students, navElements } from "./data/data"
import { NavBar } from "./components/Navbar"
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import type { Student, StudentFormData } from "./types/student";
import { AddStudentForm } from "./components/AddStudentForm";
import "./App.css"

export default function App() {

    const [searchTerm, setSearchTerm] = useState("");
    const [studentList, setStudentList] = useState(students);
    const [theme, setTheme] = useState<"light" | "dark">("light");


    const filteredStudents = studentList.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); // dataHolder filteredStudents

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

    }; // func addStudentHandler()


    const deleteStudentHandler = (studentId: string) => {
        setStudentList(previousStudents =>
            previousStudents.filter(
                student => student.id !== studentId
            )
        );
    }; // func deleteStudentHandler()


    const handleToggleTheme = () => {
        setTheme(currentTheme =>
            currentTheme === "light" ? "dark" : "light"
        );
    }; // func toggleTheme()

    return (
        <>
            <main className={theme === "dark" ? "dark-theme" : "light-theme"}>
                <NavBar navElements={navElements} onToggleTheme={handleToggleTheme} />
                <SearchBar onSearchChange={setSearchTerm} searchTerm={searchTerm} />
                <AddStudentForm onAddStudent={addStudentHandler} />
                <StudentList students={filteredStudents} onDeleteStudent={deleteStudentHandler} />
            </main>
        </>
    )
}