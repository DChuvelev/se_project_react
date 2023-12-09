import React from 'react';
import './Profile.css';
import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar'
export default function Profile({ handleCardClick, clothingItems, handleAddItems}) {
    // console.log(handleCardClick);
    return (
        <div className='profile'>
            <SideBar />
            <ClothesSection clothingItems={clothingItems} handleCardClick={handleCardClick} handleAddItems={handleAddItems}/>
        </div>
    )
}