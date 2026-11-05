import { StudentList } from "./components/StudentList"
import { students } from "./data/data"


export default function App() {
    return (
        <>
            <main>
                <StudentList  students={students} />
            </main>
        </>
    )
}