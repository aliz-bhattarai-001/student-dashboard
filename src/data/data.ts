import type { Student } from "../types/student";


export const students: Student[] = [
    {
        id: "1",
        name: "Alfred",
        age: 20,
        gender: "Male",
        course: "Computer Engineering",
        email: "alfred@example.gmail.com",
        academicYear: 2026,
        status: "Active"
    }, // an object belonging to Interface Student

    {
        id: "2",
        name: "Adler",
        age: 22,
        gender: "Male",
        course: "Electronics Engineering",
        email: "adler@example.gmail.com",
        academicYear: 2025,
        status: "Active"
    },

    {
        id: "3",
        name: "Yogi",
        age: 19,
        gender: "Male",
        course: "Mechanical Engineering",
        email: "ogiy@example.gmail.com",
        academicYear: 2026,
        status: "Inactive"
    },

    {
        id: "4",
        name: "Sarah",
        age: 19,
        gender: "Female",
        course: "Aerospace Engineering",
        email: "sarah@example.gmail.com",
        academicYear: 2025,
        status: "Active"
    } 
]; // data students