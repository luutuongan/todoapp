import {forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom';
import { useRef } from 'react';
import Button from './Button';

const Modal = forwardRef(function Modal ({children, buttonCaption}, ref) {
    const dialog = useRef();
    
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return createPortal(<dialog ref={dialog}>
        {children}
        <form method="dialog">
            <Button>{buttonCaption}</Button>
        </form>
         </dialog>,
        document.getElementById('modal')
    );
});

export default Modal;