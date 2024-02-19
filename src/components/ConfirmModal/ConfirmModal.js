import React from 'react';
import './ConfirmModal.css'
import Modal from '../Modal/Modal';
export default function ConfirmModal( {message, okBtnTxt, activeModal, onClose, onOk} ) {
    return (
        <Modal activeModal={activeModal} onClose={onClose}>
            <div className='confirm-modal__message'>{message.map((line) => {return (<p className='confirm-modal__message-line'>{line}</p>)})}</div>
            <button className='confirm-modal__button' onClick={onOk}>{okBtnTxt}</button>
            <button className='confirm-modal__button' onClick={onClose}>Cancel</button>
        </Modal>
    )
}