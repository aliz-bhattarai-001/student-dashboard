import type { ConfirmDeleteModalProps } from "../types/student";
import { Modal } from "./Modal/Modal";
import styles from "./DeleteModal.module.css"
import { useEffect, useRef } from "react";

export function ConfirmDeleteModal({
    student,
    onConfirm,
    onCancel
}: ConfirmDeleteModalProps) {

    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        // if student is null (no selected) this doesn't run at all.
        // even during initial load since student is null it doesn't execute the code below.
        if (student) {
            cancelButtonRef.current?.focus();
        }
    }, [student]); // whenever student changes (aka Student to delete changes value)

    return (
        <Modal
            onClose={onCancel}
            ariaLabelledBy="delete-student-title"
        >
            <div className={styles.confirmationContent}>
                <h2
                    id="delete-student-title"
                    className={styles.title}
                >
                    Delete Student?
                </h2>

                <p className={styles.message}>
                    Are you sure you want to delete{" "}
                    <strong>{student.name}</strong>?
                </p>

                <p className={styles.warning}>
                    This action cannot be undone.
                </p>

                <div className={styles.actions}>
                    <button
                        ref={cancelButtonRef}
                        className={styles.cancelButton}
                        type="button"
                        onClick={onCancel} >
                        Cancel
                    </button>

                    <button
                        className={styles.confirmButton}
                        type="button"
                        onClick={onConfirm} >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}