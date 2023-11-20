import React from 'react';
import './ItemModal.css';
import Modal from '../Modal/Modal'
export default function ItemModal( {activeModal, card, onClose} ) {
    // console.log('Item modal rerender', props);
    return (
        <Modal activeModal={activeModal} onClose={onClose}>
            <img className='item-modal__picture' src={card.link} alt={`Image of ${card.name}`}/>
            <p className='item-modal__title'>{card.name}</p>
            <p className='item-modal__weather'>Weather: {card.weather}</p>
        </Modal>
    )
}