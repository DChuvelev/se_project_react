import React from 'react';
import './ItemCard.css';
export default function ItemCard({ item, handleCardClick }) {
    return (
        <li className='item-card' onClick={() => handleCardClick(item)}>
            <h2 className='item-card__title'>{item.name}</h2>
            <img className='item-card__image' src={item.imageUrl} alt={item.name} />                        
        </li>
    )
}
