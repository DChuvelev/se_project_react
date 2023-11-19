import React from 'react';
import './Modal.css';
import ItemModal from '../ItemModal/ItemModal';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ModalAddGarment from '../ModalAddGarment/ModalAddGarment'
export default function Modal( {activeModal, formInfo, card, onClose} ) {
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
        <div className='modal ' onClick={checkClickOutsideContent}>
            <div className={`modal__content modal__content_type_${activeModal}`}>
                {activeModal === 'card-preview' && <ItemModal card={card}/>}
                {activeModal === 'form' && formInfo.formType === 'add-garment' && <ModalWithForm formInfo={formInfo}>
                    <fieldset className='modal__input-fieldset'>
                        <ModalAddGarment/>
                    </fieldset>
                </ModalWithForm>}
                <button type="button" className="modal__close-btn" onClick={onClose}></button>
            </div>
        </div>    
    )
}