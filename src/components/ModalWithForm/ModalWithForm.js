import React from 'react';
import './ModalWithForm.css';
import ModalAddGarment from '../ModalAddGarment/ModalAddGarment'
export default function ModalWithForm(props) {
    console.log(props);
    return (
        <form className='modal__form' onSubmit={props.windowState.onSubmit} name={props.windowState.formType}>
            <h2 className='modal__form-title'>{props.windowState.name}</h2>
            <fieldset className='modal__input-fieldset'>
                {props.windowState.formType === 'add-garment' && <ModalAddGarment/>}
            </fieldset>
            <button type='submit' className='modal__submit-btn'>{props.windowState.btnTxt}</button>
        </form> 
    )
}