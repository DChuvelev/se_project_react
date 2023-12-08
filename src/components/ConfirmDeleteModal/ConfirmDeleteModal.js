import React from 'react';
import './ConfirmDeleteModal.css'
import Modal from '../Modal/Modal';
export default function ConfirmDeleteModal( {activeModal, cardToDelete, onClose, onOk} ) {

    return (
        <Modal activeModal={activeModal} onClose={onClose}>
            <p className='confirm-delete-modal__title'>Are you sure you want to delete this item?</p>
            <p className='confirm-delete-modal__title'>This action is irreversible.</p>
            <button className='confirm-delete-modal__button' onClick={() => onOk(cardToDelete)}>Yes, delete item</button>
            <button className='confirm-delete-modal__button' onClick={onClose}>Cancel</button>
        </Modal>
    )
}