import React from 'react';
import './ModalWithForm.css';
import Modal from '../Modal/Modal'
export default function ModalWithForm({children, formInfo, activeModal, onClose, isBusy}) {
    console.log(isBusy);
    return (
        <Modal activeModal={activeModal} onClose={onClose}>
            <form className='modal__form' onSubmit={formInfo.onSubmit} name={formInfo.formType}>
                <h2 className='modal__form-title'>{formInfo.name}</h2>
                    {children}
                <button type='submit' className='modal__submit-btn'>{isBusy? formInfo.btnTxtTypeBusy : formInfo.btnTxt}</button>
            </form> 
        </Modal>
    )
}