import React from 'react';
import './ItemCard.css';
export default function ItemCard(props) {
    // console.log(props);
    return (
        <li className='item-card'>
            <h2 className='item-card__title'>{props.item.name}</h2>
            <img className='item-card__image' src={props.item.link} alt={props.item.name} onClick={() => props.handleCardClick(props.item)}/>                        
        </li>
    )
}
