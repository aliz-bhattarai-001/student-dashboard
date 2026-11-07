import { createPortal } from "react-dom";
import type { ModalProps } from "../../types/student";
import styles from "./Modal.module.css";

export function Modal({ children, onClose }: ModalProps) {
    return createPortal(
        <div
            className={styles.modalBackdrop}
            onClick={onClose}
        >
            <div
                className={styles.modalContent}
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    ); // return 
} // React Component: <Modal></Modal>