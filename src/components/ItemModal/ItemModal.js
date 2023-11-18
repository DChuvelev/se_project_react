import React from 'react';
import './ItemModal.css';
export default function ItemModal(props) {
    // console.log('Item modal rerender', props);
    return (
        <>
            <img className='item-modal__picture' src={props.card.link} />
            <p className='item-modal__title'>{props.card.name}</p>
            <p className='item-modal__weather'>Weather: {props.card.weather}</p>
        </>
    )
}