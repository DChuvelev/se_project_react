import React from 'react';
import './Modal.css';
export default function Modal( {children, activeModal, onClose} ) {
    const checkClickOutsideContent = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    const checkEscKey = (evt) => {
        if (evt.key === 'Escape') {
            onClose();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', checkEscKey);
        return () => {
            document.removeEventListener('keydown', checkEscKey);
        }
    }, []);

    return (
        <div className='modal ' onMouseDown={checkClickOutsideContent}>
            <div className={`modal__content modal__content_type_${activeModal}`}>
                {children}
                <button type="button" className="modal__close-btn" onClick={onClose}/>
            </div>
        </div>    
    )
}