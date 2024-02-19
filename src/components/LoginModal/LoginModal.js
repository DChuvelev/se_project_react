import React from 'react';
import './LoginModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from "react-hook-form" ;
export default function LoginModal( {formInfo, activeModal, onClose, isBusy} ) {
    
    const {register, watch, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: formInfo.formValues.email,
            password: formInfo.formValues.password
        }
    });

    const formValues = watch();

    return (
        <ModalWithForm 
            formInfo={ {...formInfo, onSubmit: handleSubmit(formInfo.handleSubmit)} } 
            activeModal={activeModal} 
            onClose={onClose} 
            isBusy={isBusy}  
            formValues={formValues} 
        >
            <fieldset className='login__input-fieldset'>
                <div className='login__input-field'>
                    <label className='login__field-label' htmlFor='user-email'>Email</label>
                    <input 
                        className='login__input' 
                        type="text" 
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
                    {errors.email && (<p className="login__error-message">{errors.email.message}</p>)}
                </div>
                <div className='login__input-field'>
                    <label className='login__field-label' htmlFor='user-password'>Password</label>
                    <input 
                        className="login__input" 
                        type='password' 
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
                    {errors.password && (<p className="login__error-message">{errors.password.message}</p>)}
                </div>
            </fieldset>
        </ModalWithForm>
    )
}