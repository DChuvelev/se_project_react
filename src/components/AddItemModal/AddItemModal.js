import React from 'react';
import { useState } from 'react';
import './AddItemModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
export default function AddItemModal( {formInfo, activeModal, onClose} ) {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [weather, setWeather] = useState('hot');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(evt);
        formInfo.handleSubmit({ name, imageUrl, weather });
    }

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleImageUrlChange = (evt) => {
        setImageUrl(evt.target.value);
    }

    const handleWeatherChange = (evt) => {
        setWeather(evt.target.value);
    }

    return (
        <ModalWithForm formInfo={ {...formInfo, onSubmit: handleSubmit} } activeModal={activeModal} onClose={onClose}>
            <fieldset className='add-item__input-fieldset'>
                <label className='add-item__field-label' htmlFor='garment-name'>Name</label>
                <input type="text" className="add-item__input" id='garment-name' placeholder="Name" minLength="1" maxLength="30" required onChange={handleNameChange} />
                <label className='add-item__field-label' htmlFor='garment-url'>Image</label>
                <input type="url" className="add-item__input" id='garment-url' placeholder="Image URL" required onChange={handleImageUrlChange} />
                <fieldset className='add-item__input-radio-fieldset'>
                    <legend className='add-item__select-weather-title'>Select the weather type:</legend>
                    <div>
                        <input type="radio" className='add-item__radio-item' name="weather-choice" id="hot" value="hot" onChange={handleWeatherChange} checked={weather === 'hot'} />
                        <label className='add-item__field-label' htmlFor='hot'>Hot</label>
                    </div>
                    <div>
                        <input type="radio" className='add-item__radio-item' name="weather-choice" id="warm" value="warm" onChange={handleWeatherChange} />
                        <label className='add-item__field-label' htmlFor='warm'>Warm</label>
                    </div>
                    <div>
                        <input type="radio" className='add-item__radio-item' name="weather-choice" id="cold" value="cold" onChange={handleWeatherChange} />
                        <label className='add-item__field-label' htmlFor='cold'>Cold</label>
                    </div>
                </fieldset>
            </fieldset>
        </ModalWithForm>
    )
}