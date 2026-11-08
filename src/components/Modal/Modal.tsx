import { createPortal } from "react-dom";
import type { ModalProps } from "../../types/student";
import styles from "./Modal.module.css";

import { useEffect, useRef } from "react";

export function Modal({ children, onClose, ariaLabelledBy }: ModalProps) {

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
                        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), textarea:not([disabled])'
                    );

                // a[href] -> link containing elements
                // :not([disabled]) -> meaning all enabled or active elements.
                // querySelectorAll returns all matching elements in DOM order.
                // :not([type="hidden"]) -> excludes hidden sections
                // [tabindex]:not([tabindex="-1"]) -> excludes things that have tab navigation blocking


                // even after so much of filtering
                // We still don't want display: none (invisible elements) to be in focusableElements.
                // so we filter using getClientRect()
                // We can use getClientRects() to check whether an element has a rendered layout box.

                // focusableElemnts ?? [] : If focusableElements exists use it 
                // else use an empty array. 
                // since Array.from() expects an array but modelContentRef.current? may return undefined.
                const visibleFocusableElements = Array.from(focusableElements ?? []).filter(
                    (element) => element.getClientRects().length > 0 // if has a rendered layout then it's visible.
                );

                // EG: const elements = undefined ?? []; 
                // here  elements will contain an empty array.


                // Nullish coalescing (??) : checks hecks whether the value on the left is specifically null or undefined.
                // so it works as a ternary operator of sorts but specifically for nullish values.

                // we can use this to provide default values for missing properties like :
                // const username = user.name ?? "Guest";

                // while using ternary operator for decision making based on condition.
                // TRICK QUESTION: const count = 0
                // const elem = count ?? 10;
                // elem will be 0 since 0 is "FALSY" NOT "NULLISH" (NULLISH: null or Undefined only)

                if (!visibleFocusableElements?.length) return; // if no focusable elements found : return

                // use the final filtered visibleFocusElements
                const firstElement = visibleFocusableElements[0];
                const lastElement = visibleFocusableElements[visibleFocusableElements.length - 1];


                // if somehow the focus wanders outside the modal elements.
                // bring it back immediately to the first focusable elemnt.
                // Check whether the currently focused element is inside the modal.
                if (!modalContentRef.current?.contains(document.activeElement)) {
                    // If the modal does NOT contain the currently focused element
                    // bring focus back to the first focusable element

                    // if multiple modals or elements requiring focus are present at same level.
                    event.preventDefault(); // prevents default browser behavior (overrides it i'd say)
                    firstElement.focus(); // if the model
                    return;
                }

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
                aria-labelledby={ariaLabelledBy}
                // .stopPropagation prevents clicks inside the modal from reaching backdrop.
                onClick={(event) => event.stopPropagation()}>

                {children}

            </div>
        </div>,
        document.body
    ); // return 
} // React Component: <Modal></Modal>