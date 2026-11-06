


export interface Student {
    id: string;
    name: string;
    gender: "Male" | "Female" | "M" | "F" | "Other";
    age: number;
    email?: string;
    course: string;
    academicYear: number;
    status: "Active" | "Inactive";
} // interface Student


export interface StudentCardProps {
    student: Student
} // interface StudentCardProps


export interface StudentListProps {
    students: Student[]
}


export interface NavElem {
    name: string,
    link: string
}

export interface NavBarProps {
    navElements: NavElem[]
}