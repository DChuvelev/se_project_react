import React from 'react';
import logoPath from '../../images/header-logo.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import CleverAvatar from '../CleverAvatar/CleverAvatar';
import './Header.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { CurrentUserContext } from '../contexts/contexts';
function Header({ date, weatherInfo, handleAddClothes, handleOpenRegisterModal, handleOpenLoginModal, loggedIn}) {
    const {currentUser} = React.useContext(CurrentUserContext);
    return (
        <header className='header'>            
            <ul className="header__menu">
                <li>
                    <Link to='/'>
                        <img src={logoPath} className='header__logo' alt='WTWR logo' />
                    </Link>
                </li>
                <li className='header__date'>
                    {date}, {weatherInfo.city}
                </li>
                <li className='header__toggle-switch'>
                    <ToggleSwitch />
                </li>
                {loggedIn && <>
                    <li className='header__btn-container'>
                        <button className='header__menu-item-btn' onClick={handleAddClothes}>+ Add Clothes</button>
                    </li>
                    
                    <li className="header__user-name">
                        <Link className="header__link" to='/profile'>{currentUser.name}</Link>
                    </li>
                    
                    <li>                        
                        <Link to='/profile'>
                            <CleverAvatar avatar={currentUser.avatar} name={currentUser.name}></CleverAvatar>
                        </Link>                        
                    </li>
                </>}
                {!loggedIn && <>
                    <li className='header__btn-container'>
                        <button className='header__menu-item-btn' onClick={handleOpenLoginModal}>Login</button>
                    </li>
                    <li className='header__btn-container'>
                        <button className='header__menu-item-btn' onClick={handleOpenRegisterModal}>Register</button>
                    </li>
                </>}                
            </ul>            
        </header>
    )
}

export default Header;