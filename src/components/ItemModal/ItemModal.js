import React from 'react';
import './ItemModal.css';
import Modal from '../Modal/Modal'
export default function ItemModal( {activeModal, card, onClose, handleDelete} ) {
    // console.log('Item modal rerender', card);
    return (
        <Modal activeModal={activeModal} onClose={onClose}>
            <img className='item-modal__picture' src={card.imageUrl} alt={`Image of ${card.name}`}/>
            <p className='item-modal__title'>{card.name}</p>
            <p className='item-modal__weather'>Weather: {card.weather}</p>
            <button className='item-modal__delete-btn' onClick={() => {handleDelete(card)}}>Delete item</button>
        </Modal>
    )
}