import React from 'react';
export default function ModalAddGarment() {
    return (
        <>
            <label className='modal__field-label' htmlFor='garment-name'>Name</label>
            <input type="text" className="modal__input" id='garment-name' placeholder="Name" minLength="1" maxLength="30" required/>
            <label className='modal__field-label' htmlFor='garment-url'>Image</label>
            <input type="url" className="modal__input" id='garment-url' placeholder="Image URL" required/>
            <fieldset className='modal__input-radio-fieldset'>
                <legend className='modal__select-weather-title'>Select the weather type:</legend>
                <div>
                    <input type="radio" className='modal__radio-item' name="weather-choice" id="hot" value="hot"/>
                    <label className='modal__field-label' htmlFor='hot'>Hot</label>
                </div>
                <div>
                    <input type="radio" className='modal__radio-item' name="weather-choice" id="warm" value="warm"/>
                    <label className='modal__field-label' htmlFor='warm'>Warm</label>
                </div>
                <div>
                    <input type="radio" className='modal__radio-item' name="weather-choice" id="cold" value="cold"/>
                    <label className='modal__field-label' htmlFor='cold'>Cold</label>
                </div>
            </fieldset>
        </>
    )
}