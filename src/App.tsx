import { StudentList } from "./components/StudentList"
import { students, navElements } from "./data/data"
import { NavBar } from "./components/Navbar"

export default function App() {
    return (
        <>
            <main>
                <NavBar navElements={navElements} />
                <StudentList students={students} />
            </main>
        </>
    )
}