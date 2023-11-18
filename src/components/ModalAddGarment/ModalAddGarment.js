import React from 'react';
export default function ModalAddGarment(props) {
    // console.log('Add garment props', props);
    return (
        <>
            <label className='modal__field-label' for='garment-name'>Name</label>
            <input type="text" className="modal__input" id='garment-name' placeholder="Name" minlength="1" maxlength="30" required/>
            <label className='modal__field-label' for='garment-url'>Image</label>
            <input type="url" className="modal__input" id='garment-url' placeholder="Image URL" required/>
            <fieldset className='modal__input-radio-fieldset'>
                <legend className='modal__select-weather-title'>Select the weather type:</legend>
                <div>
                    <input type="radio" className='modal__radio-item' name="weather-choice" id="hot" value="hot"/>
                    <label className='modal__field-label' for='hot'>Hot</label>
                </div>
                <div>
                    <input type="radio" className='modal__radio-item' name="weather-choice" id="warm" value="warm"/>
                    <label className='modal__field-label' for='warm'>Warm</label>
                </div>
                <div>
                    <input type="radio" className='modal__radio-item' name="weather-choice" id="cold" value="cold"/>
                    <label className='modal__field-label' for='cold'>Cold</label>
                </div>
            </fieldset>
        </>
    )
}