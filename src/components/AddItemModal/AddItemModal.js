import React from 'react';
import './AddItemModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from 'react-hook-form'
export default function AddItemModal( {formInfo, activeModal, onClose, isBusy} ) {

    const {register, handleSubmit, formState: {errors}} = useForm({ 
        defaultValues: {
            name: '', 
            imageUrl: '', 
            weather: 'hot'
        }
    });

    return (
        <ModalWithForm formInfo={ {...formInfo, onSubmit: handleSubmit(formInfo.handleSubmit)} } activeModal={activeModal} onClose={onClose} isBusy={isBusy} >
            <fieldset className='add-item__input-fieldset'>
                <div className='add-item__input-field'>
                    <label className='add-item__field-label' htmlFor='garment-name'>Name</label>
                    <input 
                        type="text" 
                        className="add-item__input" 
                        id='garment-name'
                        placeholder="Name"
                        {...register(
                            'name', {
                                maxLength: {
                                    value: "30",
                                    message: "Garment name should be maximum 30 characters long"
                                },
                                required: "Garment name is required"
                            }
                        )} 
                    />
                    {errors.name && (<p className="add-item__error-message">{errors.name.message}</p>)} 
                </div>

                <div className='add-item__input-field'>
                    <label className='add-item__field-label' htmlFor='garment-url'>Image</label>
                    <input 
                        type="text" 
                        className="add-item__input" 
                        id='garment-url'
                        placeholder="Image URL"
                        {...register(
                            'imageUrl', {
                                required: "Image picture URL is required",
                                pattern: {
                                    value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                                    message: "Not a URL"
                                }
                            }
                        )}
                    />
                    {errors.imageUrl && (<p className="add-item__error-message">{errors.imageUrl.message}</p>)}
                </div>

                <fieldset className='add-item__input-radio-fieldset'>
                    <legend className='add-item__select-weather-title'>Select the weather type:</legend>
                    <div>
                        <input 
                            type="radio" 
                            className='add-item__radio-item' 
                            id="hot" 
                            value="hot"
                            {...register('weather')}
                        />
                        <label className='add-item__field-label' htmlFor='hot'>Hot</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            className='add-item__radio-item' 
                            id="warm" 
                            value="warm"
                            {...register('weather')}
                        />
                        <label className='add-item__field-label' htmlFor='warm'>Warm</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            className='add-item__radio-item' 
                            id="cold" 
                            value="cold"
                            {...register('weather')}
                        />
                        <label className='add-item__field-label' htmlFor='cold'>Cold</label>
                    </div>
                </fieldset>
            </fieldset>
        </ModalWithForm>
    )
}