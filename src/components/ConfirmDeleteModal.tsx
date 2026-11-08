import type { ConfirmDeleteModalProps } from "../types/student";
import { Modal } from "./Modal/Modal";
import styles from "./DeleteModal.module.css"

export function ConfirmDeleteModal({
    student,
    onConfirm,
    onCancel
}: ConfirmDeleteModalProps) {

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