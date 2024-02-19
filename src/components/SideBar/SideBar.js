import React, { useContext } from 'react';
import './SideBar.css';
import CleverAvatar from '../CleverAvatar/CleverAvatar';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
export default function SideBar({handleLogout, handleOpenEditProfileModal}) {
    const { currentUser } = useContext(CurrentUserContext);
    const editUserProfile = () => {
        handleOpenEditProfileModal(currentUser);
    }
    return (
        <div className='sidebar'>
            <div className='sidebar__user-info'>
                <CleverAvatar avatar={currentUser.avatar} name={currentUser.name}></CleverAvatar>
                <p className="sidebar__user-name">{currentUser.name}</p>
            </div>
            <button className='sidebar__button' onClick={editUserProfile}>Change profile data</button>     
            <button className='sidebar__button' onClick={handleLogout}>Log out</button>        
        </div>
    )
}