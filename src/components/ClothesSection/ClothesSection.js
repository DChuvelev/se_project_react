import React from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

export default function ClothesSection({ handleCardClick, clothingItems }) {
    return (
        <div className='clothes-section'>
            <h2 className='clothes-section__heading'>Your Items</h2>            
            <ul className='clothes-section__cards'>
                {clothingItems.map(item => {
                    return (
                        <ItemCard item={item} key={item._id} handleCardClick={handleCardClick}/>
                    )
                })}
            </ul>        
        </div>
    )
}