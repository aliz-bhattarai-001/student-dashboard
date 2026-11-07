import { createPortal } from "react-dom";
import type { ModalProps } from "../../types/student";
import styles from "./Modal.module.css";

export function Modal({ children}: ModalProps) {
    return createPortal(
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>,
        document.body

    ); // return 
} // React Component: <Modal></Modal>