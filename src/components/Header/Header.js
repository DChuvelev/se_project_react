import React from 'react';
import logoPath from '../../images/header-logo.svg'
import avatarPath from '../../images/Avatar.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import './Header.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function Header(props) {
    return (
        <header className='header'>            
            <ul className="header__menu">
                <li>
                    <Link to='/'>
                        <img src={logoPath} className='header__logo' alt='WTWR logo' />
                    </Link>
                </li>
                <li className='header__date'>
                    {props.date}, {props.weatherInfo.city}
                </li>
                <li className='header__toggle-switch'>
                    <ToggleSwitch />
                </li>
                <li className='header__btn-container'>
                    <button className='header__add-btn' onClick={props.handleAddClothes}>+ Add Clothes</button>
                </li>
                
                <li className="header__user-name">
                    <Link to='/profile'>Dmitry Chuvelev</Link>
                </li>
                
                <li className='header__avatar-container'>
                    <Link to='/profile'>
                        <img src={avatarPath} className='header__user-avatar' alt='User avatar'/>
                    </Link>
                </li>
                
            </ul>            
        </header>
    )
}

export default Header;