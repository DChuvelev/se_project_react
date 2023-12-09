import React from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

export default function ClothesSection({ handleCardClick, clothingItems, handleAddItems }) {
    return (
        <div className='clothes-section'>
                <h2 className='clothes-section__heading'>Your Items
                <button className='clothes-section__button' onClick={handleAddItems}>+ Add new</button></h2>

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