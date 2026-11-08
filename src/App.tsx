import { StudentList } from "./components/StudentList"
import { students, navElements } from "./data/data"
import { NavBar } from "./components/Navbar"
import { useEffect, useRef, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import type { Student, StudentFormData } from "./types/student";
import { AddStudentForm } from "./components/AddStudentForm";
import "./App.css"

import { Modal } from "./components/Modal/Modal";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";
export default function App() {

    const [searchTerm, setSearchTerm] = useState("");
    const [studentList, setStudentList] = useState(students);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    // localStorage is the browsers storage that allows user to save settings. using keyvalue pairs
    // set, get, remove + Item or clear (to clear all)
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const savedTheme = localStorage.getItem("student-dashboard-theme"); //getting dashboard theme using the key

        return savedTheme === "dark" ? "dark" : "light"; // verifying again which theme to apply initially.
    });

    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

    const handleOpenAddStudent = () => {
        setIsAddStudentOpen(true);
    };

    const handleCloseAddStudent = () => {
        setIsAddStudentOpen(false);
    };

    // we useRef here because useState would've invoked an unnecessary render.
    // we want to store teh ref to the mutable object (.current)
    // so useRef was the appropriate choice.
    const wasModalOpen = useRef(false);


    useEffect(() => {
        // if modal was previously (recently ) open and now isAddStudentOpen  = false
        // meaning it is now closed
        if (wasModalOpen.current && !isAddStudentOpen) {
            addStudentButtonRef.current?.focus(); // set focus on the add student button
        };

        wasModalOpen.current = isAddStudentOpen; // store the latest value of isAddstudentOpen
    }, [isAddStudentOpen]) // call whenever isAddStudentOpen changes


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

    const handleDeleteRequest = (student: Student) => {
        setStudentToDelete(student);
    }; // func handleDeleteRequest()

    const handleCancelDelete = () => {
        setStudentToDelete(null);
    }; // func handleCancelDelete()

    const handleConfirmDelete = () => {


        // if no student exists return (in case of null )
        if (!studentToDelete) {
            return;
        }

        // pass the id to handler
        deleteStudentHandler(studentToDelete.id);

        setStudentToDelete(null); // clear the setStudentToDelete
    }; // func handleConfirmDelete()



    const handleToggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";

        setTheme(nextTheme);

        localStorage.setItem("student-dashboard-theme", nextTheme);
    }; // func toggleTheme()


    useEffect(() => {
        document.documentElement.className =
            theme === "dark" ? "dark-theme" : "light-theme";
    }, [theme]);

    const addStudentButtonRef = useRef<HTMLButtonElement>(null); // to keep a reference to the button that opened the form
    // to return focus to the button when escaped using tab navigation.

    return (
        <>
            <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
                <main >
                    <NavBar navElements={navElements} onToggleTheme={handleToggleTheme} />
                    <SearchBar onSearchChange={setSearchTerm} searchTerm={searchTerm} />
                    <button ref={addStudentButtonRef} onClick={handleOpenAddStudent}>
                        + Add Student
                    </button>
                    {/* // conditionalRendering of Modal */}
                    {isAddStudentOpen && (
                        <Modal onClose={handleCloseAddStudent} ariaLabelledBy="add-student-title">
                            <AddStudentForm
                                onAddStudent={addStudentHandler}
                                onCancel={handleCloseAddStudent}
                            />
                        </Modal>
                    )}

                    {studentToDelete && (
                        <ConfirmDeleteModal
                            student={studentToDelete}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                        />
                    )}
                    <StudentList students={filteredStudents} onDeleteStudent={handleDeleteRequest} />
                </main>
            </div>
        </>
    )
}