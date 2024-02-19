import React from 'react';
import './RegisterModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from 'react-hook-form';
export default function RegisterModal( {formInfo, activeModal, onClose, isBusy} ) {

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: formInfo.formValues.email, 
            password: formInfo.formValues.password, 
            confirmPassword: '', 
            name: '', 
            avatar: formInfo.formValues.avatar
        }
    })

    const formValues = watch();

    return (
        <ModalWithForm 
            formInfo={ {...formInfo, onSubmit: handleSubmit(formInfo.handleSubmit)} } 
            activeModal={activeModal} 
            onClose={onClose} 
            isBusy={isBusy}  
            formValues={formValues} 
        >
            <fieldset className='register__input-fieldset'>
                <div className='register__input-field'>
                    <label className='register__field-label' htmlFor='user-email'>Email</label>
                    <input 
                        type="text" 
                        className='register__input' 
                        id='user-email'
                        placeholder='User email'
                        {...register(
                            'email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Email is not valid"
                                }
                            }
                        )}
                    />
                    {errors.email && (<p className="register__error-message">{errors.email.message}</p>)}
                </div>

                <div className='register__input-field'>
                    <label className='register__field-label' htmlFor='user-password'>Password</label>
                    <input 
                        type='password' 
                        className="register__input" 
                        id='user-password'
                        placeholder="Password"
                        {...register(
                            'password', {
                                minLength: {
                                    value: "4",
                                    message: "Password should be at least 4 characters"
                                },
                                maxLength: {
                                    value: "30",
                                    message: "Password should be maximum 30 characters long"
                                },
                                required: "Password is required"
                            }
                        )} 
                    />
                    {errors.password && (<p className="register__error-message">{errors.password.message}</p>)}
                </div>

                <div className='register__input-field'>
                    <label className='register__field-label' htmlFor='confirm-password'>Confirm password</label>
                    <input 
                        type='password' 
                        className="register__input" 
                        id='confirm-password'
                        placeholder="Confirm password"
                        {...register(
                            'confirmPassword', {
                                minLength: {
                                    value: "4",
                                    message: "Password should be at least 4 characters"
                                },
                                maxLength: {
                                    value: "30",
                                    message: "Password should be maximum 30 characters long"
                                },
                                required: "Password confirmation is required"
                            }
                        )} 
                    />
                    {errors.confirmPassword && (<p className="register__error-message">{errors.confirmPassword.message}</p>)}
                </div>

                <div className='register__input-field'>
                    <label className='register__field-label' htmlFor='user-name'>Name</label>
                    <input 
                        type="text" 
                        className="register__input" 
                        id='user-name'
                        placeholder="Name"
                        {...register(
                            'name', {
                                minLength: {
                                    value: "1",
                                    message: "User name should be at least 1 character"
                                },
                                maxLength: {
                                    value: "30",
                                    message: "User name should be maximum 30 characters long"
                                },
                                required: "User name is required"
                            }
                        )} 
                    />
                    {errors.name && (<p className="register__error-message">{errors.name.message}</p>)}
                </div>

                <div className='register__input-field'>
                    <label className='register__field-label' htmlFor='avatar-url'>Avatar URL</label>
                    <input 
                        type="text" 
                        className="register__input" 
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
                    {errors.avatar && (<p className="register__error-message">{errors.avatar.message}</p>)}
                </div>

            </fieldset>
        </ModalWithForm>
    )
}