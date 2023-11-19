import React from 'react';
import './ModalWithForm.css';
export default function ModalWithForm({children, formInfo}) {
    // console.log(formInfo);
    return (
        <form className='modal__form' onSubmit={formInfo.onSubmit} name={formInfo.formType}>
            <h2 className='modal__form-title'>{formInfo.name}</h2>
                {children}
            <button type='submit' className='modal__submit-btn'>{formInfo.btnTxt}</button>
        </form> 
    )
}