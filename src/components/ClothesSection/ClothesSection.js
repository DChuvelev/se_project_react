import React, { useContext } from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentUserContext } from '../contexts/contexts';

export default function ClothesSection({ handleCardClick, handleLike, handleDislike, clothingItems, handleAddClothes }) {
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <div className='clothes-section'>
                <h2 className='clothes-section__heading'>
                    Your Items
                    <button className='clothes-section__button' onClick={handleAddClothes}>+ Add new</button>
                </h2>

            <ul className='clothes-section__cards'>
                {clothingItems.filter((item) => currentUser._id === item.owner).map(item => {
                    return (
                        <ItemCard item={item} key={item._id} handleCardClick={handleCardClick} handleLike={handleLike} handleDislike={handleDislike}/>
                    )
                })}
            </ul>        
        </div>
    )
}