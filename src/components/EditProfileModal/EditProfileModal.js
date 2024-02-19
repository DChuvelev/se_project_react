import React from 'react';
import './EditProfileModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from 'react-hook-form';
export default function EditProfileModal( {formInfo, activeModal, onClose, isBusy} ) {

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: formInfo.formValues.name, 
            avatar: formInfo.formValues.avatar
        }
    })

    return (
        <ModalWithForm formInfo={ {...formInfo, onSubmit: handleSubmit(formInfo.handleSubmit)} } activeModal={activeModal} onClose={onClose} isBusy={isBusy}  >
            <fieldset className='edit-profile__input-fieldset'>
                <div className='edit-profile__input-field'>
                    <label className='edit-profile__field-label' htmlFor='user-name'>Name</label>
                    <input 
                        type="text" 
                        className="edit-profile__input" 
                        id='user-name'
                        placeholder="Name"
                        {...register(
                            'name', {
                                maxLength: {
                                    value: "30",
                                    message: "User name should be maximum 30 characters long"
                                },
                                required: "User name is required"
                            }
                        )} 
                    />
                    {errors.name && (<p className="edit-profile__error-message">{errors.name.message}</p>)}
                </div>

                <div className='edit-profile__input-field'>
                    <label className='edit-profile__field-label' htmlFor='avatar-url'>Avatar URL</label>
                    <input 
                        type="text" 
                        className="edit-profile__input" 
                        id='avatar-url'
                        placeholder="Avatar URL"
                        {...register(
                            'avatar', {
                                required: "Avatar URL is required",
                                pattern: {
                                    value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                                    message: "Not a URL"
                                }
                            }
                        )}
                    />
                    {errors.avatar && (<p className="edit-profile__error-message">{errors.avatar.message}</p>)}
                </div>
            </fieldset>
        </ModalWithForm>
    )
}