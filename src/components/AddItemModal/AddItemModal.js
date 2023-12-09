import React from 'react';
import './AddItemModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useForm from '../../hooks/useForm'
export default function AddItemModal( {formInfo, activeModal, onClose, isBusy} ) {

    const {values, handleChange} = useForm({name: '', imageUrl: '', weather: 'hot'});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(evt);
        formInfo.handleSubmit(values);
    }

    return (
        <ModalWithForm formInfo={ {...formInfo, onSubmit: handleSubmit} } activeModal={activeModal} onClose={onClose} isBusy={isBusy} >
            <fieldset className='add-item__input-fieldset'>
                <label className='add-item__field-label' htmlFor='garment-name'>Name</label>
                <input type="text" className="add-item__input" id='garment-name' name='name' value={values.name} placeholder="Name" minLength="1" maxLength="30" required onChange={handleChange} />
                <label className='add-item__field-label' htmlFor='garment-url'>Image</label>
                <input type="url" className="add-item__input" id='garment-url' name='imageUrl' value={values.imageUrl} placeholder="Image URL" required onChange={handleChange} />
                <fieldset className='add-item__input-radio-fieldset'>
                    <legend className='add-item__select-weather-title'>Select the weather type:</legend>
                    <div>
                        <input type="radio" className='add-item__radio-item' name="weather" id="hot" value="hot" onChange={handleChange} checked={values.weather === 'hot'} />
                        <label className='add-item__field-label' htmlFor='hot'>Hot</label>
                    </div>
                    <div>
                        <input type="radio" className='add-item__radio-item' name="weather" id="warm" value="warm" onChange={handleChange} />
                        <label className='add-item__field-label' htmlFor='warm'>Warm</label>
                    </div>
                    <div>
                        <input type="radio" className='add-item__radio-item' name="weather" id="cold" value="cold" onChange={handleChange} />
                        <label className='add-item__field-label' htmlFor='cold'>Cold</label>
                    </div>
                </fieldset>
            </fieldset>
        </ModalWithForm>
    )
}