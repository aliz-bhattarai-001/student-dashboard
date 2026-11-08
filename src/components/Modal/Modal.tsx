import { createPortal } from "react-dom";
import type { ModalProps } from "../../types/student";
import styles from "./Modal.module.css";

import { useEffect, useRef } from "react";

export function Modal({ children, onClose }: ModalProps) {

    // to store a ref to modal container
    const modalContentRef = useRef<HTMLDivElement>(null);

    // to exit the modal when esc is pressed.
    useEffect(() => {

        // the handler
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }

            // handles focus shifting
            if (event.key === "Tab") {
                // findind all focusable elements within the modalContainerRef. 
                const focusableElements =
                    modalContentRef.current?.querySelectorAll<HTMLElement>(
                        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
                    );

                // a[href] -> link containing elements
                // :not[disabled] -> meaning all enabled or active elements.
                // querySelectorAll returns all matching elements in DOM order.

                if (!focusableElements?.length) return; // if no focusable elements found : return


                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                // if shift + tab is clicked and on first Element directly set focus on last
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    // if not shift+Tab but soley +Tab then move to the first element. 
                    // meaning the tab will revolve in cycle: Last->First
                    // the rest of the tab focus is auto handled. 
                    // we need only to handle tab focus shift from last
                    //  to ensure the tab focus doesn't leave the modal
                    event.preventDefault();
                    firstElement.focus();
                }
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

    useEffect(() => {
        // store the previous state
        const previousOverflowVal = document.body.style.overflow;

        // the setup
        document.body.style.overflow = "hidden";

        // cleanup on modal exit:
        return () => {
            // reset to previous state
            document.body.style.overflow = previousOverflowVal;
        }
    }, []); // empty dependency arr so runs when Modal is mounted or added (initial Mount)


    // IF NO DEPENDENCY ARR IS PRESENT THEN IT MEANS : 
    // the useEffect() is invoked all of the time.

    // IF ANY DEPENDENCY IS INCLUDED IN THE ARR (ARR: NOT EMPTY):
    // useEffect() is invoked on inital mount as well as when that dependency is recreated/rerendered/changed.

    return createPortal(
        <div className={styles.modalBackdrop}
            onClick={onClose}>
            {/* Close event handled when clicked on Backdrop.*/}
            <div className={styles.modalContent}
                ref={modalContentRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-student-title"
                // .stopPropagation prevents clicks inside the modal from reaching backdrop.
                onClick={(event) => event.stopPropagation()}>

                {children}

            </div>
        </div>,
        document.body
    ); // return 
} // React Component: <Modal></Modal>