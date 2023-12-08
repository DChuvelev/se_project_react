import React from 'react';
import './SideBar.css';
import avatarPath from '../../images/Avatar.svg'
export default function SideBar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__user-info'>
                <img src={avatarPath} className='sidebar__user-avatar' alt='User avatar'/>
                <p className="sidebar__user-name">Dmitry Chuvelev</p>
            </div>                 
        </div>
    )
}