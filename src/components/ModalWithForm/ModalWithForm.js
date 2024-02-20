import React from 'react';
import './ModalWithForm.css';
import Modal from '../Modal/Modal'
export default function ModalWithForm({children, formInfo, activeModal, onClose, isBusy, formValues}) {
    
    const handleRedir = () => {
        formInfo.handleRedir(formValues);
    }
    return (
        <Modal activeModal={activeModal} onClose={onClose}>
            <form className='modal__form' onSubmit={formInfo.onSubmit} name={formInfo.formType}>
                <h2 className='modal__form-title'>{formInfo.name}</h2>
                {children}
                <div className='modal__buttons'>
                    <button type='submit' className='modal__submit-btn'>{isBusy? formInfo.btnTxtTypeBusy : formInfo.btnTxt}</button>
                    {formInfo.redirBtnTxt && <button className='modal__redir-btn' type='button' onClick={handleRedir}>{formInfo.redirBtnTxt}</button>}
                </div>
            </form> 
        </Modal>
    )
}