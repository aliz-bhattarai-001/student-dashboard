import type { ReactNode } from "react";



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
    onDeleteStudent: (student: Student) => void;
}

export interface StudentListProps {
    students: Student[];
    onDeleteStudent: (student: Student) => void;
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
    onAddStudent: (formData: StudentFormData) => boolean;
    onCancel: () => void;
}


export interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    ariaLabelledBy?: string;
}


export interface ConfirmDeleteModalProps {
    student: Student;
    onConfirm: () => void;
    onCancel: () => void;
}