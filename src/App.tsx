import { StudentList } from "./components/StudentList"
import { students, navElements } from "./data/data"
import { NavBar } from "./components/Navbar"
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";

export default function App() {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <main>
                <NavBar navElements={navElements} />
                <SearchBar onSearchChange={setSearchTerm} searchTerm={searchTerm} />
                <StudentList students={filteredStudents} />
            </main>
        </>
    )
}