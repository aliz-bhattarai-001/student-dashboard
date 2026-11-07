import { createPortal } from "react-dom";
import type { ModalProps } from "../../types/student";
import styles from "./Modal.module.css";

import { useEffect } from "react";

export function Modal({ children, onClose }: ModalProps) {

    // to exit the modal when esc is pressed.
    useEffect(() => {

        // the handler
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        } // handler handleKeyDown() func

        // setup : Add the event listener to window rather than any input.
        window.addEventListener("keydown", handleKeyDown);


        // cleanup function : remove the event listener previously registered during setup
        // happens for the fact tha tif onClose is changed this function is executed.
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    // reCreate or call this every time onClose is recreated.
    // jsx creates function everytime teh function is invoked/ rerendered
    // thus it means for each onClose recreation this useEffect() is invoked.

    return createPortal(
        <div className={styles.modalBackdrop}
            onClick={onClose}>
            {/* Close event handled when clicked on Backdrop.*/}
            <div className={styles.modalContent}
                // .stopPropagation prevents clicks inside the modal from reaching backdrop.
                onClick={(event) => event.stopPropagation()}>

                {children}
            </div>
        </div>,
        document.body
    ); // return 
} // React Component: <Modal></Modal>