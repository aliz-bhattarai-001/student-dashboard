


export interface Student {
    id: string;
    name: string;
    gender: "Male" | "Female" | "Other";
    age: number;
    email?: string;
    course: string;
    academicYear: number;
    status: "Active" | "Inactive";
} // interface Student


export interface StudentFormData {
    name: string;
    age: string;
    academicYear: string;
    course: string;
    email: string;
    gender: Student["gender"];
    status: Student["status"];
}

export interface StudentCardProps {
    student: Student;
    onDeleteStudent: (studentId: string) => void;
}

export interface StudentListProps {
    students: Student[];
    onDeleteStudent: (studentId: string) => void;
}


export interface NavElem {
    name: string,
    link: string
}

export interface NavBarProps {
    navElements: NavElem[],
    onToggleTheme: () => void
}


export interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export interface AddStudentFormProps {
    onAddStudent: (student: StudentFormData) => boolean;
}
