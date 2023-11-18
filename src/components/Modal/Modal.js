import React from 'react';
import './Modal.css';
import ItemModal from '../ItemModal/ItemModal';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
export default function Modal(props) {
    const checkClickOutsideContent = (evt) => {
        if (evt.target === evt.currentTarget) {
            props.onClose();
        }
    }

    const checkEscKey = (evt) => {
        if (evt.key === 'Escape') {
            props.onClose();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', checkEscKey);
        return () => {
            document.removeEventListener('keydown', checkEscKey);
        }
    }, [checkEscKey]);

    return (
        <div className={'modal ' + (props.windowState.modalOpened ? 'modal_opened' : '')} onClick={checkClickOutsideContent}>
            <div className={`modal__content modal__content_type_${props.windowState.modalType}`}>
                {props.windowState.modalType === 'image' && <ItemModal card={props.windowState.card}/>}
                {props.windowState.modalType === 'form' && <ModalWithForm windowState={props.windowState}/>}
                <button type="button" className="modal__close-btn" onClick={props.onClose}></button>
            </div>
        </div>    
    )
}