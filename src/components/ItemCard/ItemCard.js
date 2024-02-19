import React, {useContext, useMemo} from 'react';
import './ItemCard.css';
import likeButton from '../../images/like-button.png';
import likeButtonRed from '../../images/like-button-red.png';
import { CurrentUserContext } from '../contexts/contexts';
export default function ItemCard({ item, handleCardClick, handleLike, handleDislike }) {
    const { currentUser } = useContext(CurrentUserContext);
    const isLikedByCurrentUser = useMemo(() => item.likes.some(user => user === currentUser._id), [currentUser._id, item.likes])
    const likeCard = (evt) => {
        if (isLikedByCurrentUser) {
            handleDislike(evt, item);
        } else {
            handleLike(evt, item);
        }
    }
    return (
        <li className='item-card' onClick={() => handleCardClick(item)}>
            <div className='item-card__heading'>
                <h2 className='item-card__title'>{item.name}</h2>
                {currentUser._id && <img className='item-card__heart' src={isLikedByCurrentUser ? likeButtonRed : likeButton} onClick={likeCard} alt='Like'/>}
                {!currentUser._id && <p className='item-card__text'>Likes:</p> }
                <p className='item-card__number-of-likes'>{item.likes.length}</p>
            </div>
            <img className='item-card__image' src={item.imageUrl} alt={item.name} />                        
        </li>
    )
}
