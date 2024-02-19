import React from 'react';
import './Profile.css';
import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar'
export default function Profile({ handleCardClick, handleLike, handleDislike, clothingItems, handleAddClothes, handleLogout, handleOpenEditProfileModal}) {
    // console.log(handleCardClick);
    return (
        <div className='profile'>
            <SideBar handleLogout={handleLogout} handleOpenEditProfileModal={handleOpenEditProfileModal}/>
            <ClothesSection clothingItems={clothingItems} handleCardClick={handleCardClick} handleLike={handleLike} handleDislike={handleDislike} handleAddClothes={handleAddClothes}/>
        </div>
    )
}