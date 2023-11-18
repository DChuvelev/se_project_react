import React from 'react';
import logoPath from '../../images/header-logo.svg'
import avatarPath from '../../images/Avatar.svg'
import './Header.css'
function Header(props) {
    return (
        <header className='header'>            
            <ul className="header__menu">
                <li>
                    <img src={logoPath} className='header__logo'/>
                </li>
                <li className='header__date'>
                    {props.date}, {props.weatherInfo.city}
                </li>
                <li className='header__btn-container'>
                    <button className='header__add-btn' onClick={props.handleAddClothes}>+ Add Clothes</button>
                </li>
                <li className="header__user-name">
                    Dmitry Chuvelev
                </li>
                <li className='header__avatar-conteiner'>
                    <img src={avatarPath} className='header__user-avatar'/>
                </li>
            </ul>            
        </header>
    )
}

export default Header;