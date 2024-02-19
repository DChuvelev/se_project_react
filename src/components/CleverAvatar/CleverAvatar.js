import React, { useState, useEffect } from "react";
import './CleverAvatar.css';
export default function CleverAvatar( {avatar, name} ) {
    const [displayAvatar, setDisplayAvatar] = useState();
    
    const replaceAvatar = () => {
        setDisplayAvatar(false);
    }

    useEffect(() => {
        setDisplayAvatar(true);
    }, [avatar])

    return (
        <div className="clever-avatar__avatar-container">
            {displayAvatar && <img key={Date.now()} src={avatar} onError={replaceAvatar} className='clever-avatar__user-avatar' alt='' style={{opacity: 1}}/>}
            <p className='clever-avatar__avatar-placeholder'>{name.toUpperCase()[0]}</p>
        </div>
        
    )
}