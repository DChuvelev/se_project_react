import {useState} from 'react';
export default function useForm(defaultValues) {
    const [formValues, setValues] = useState(defaultValues);
  
    const setFormValues = (event) => {
        const {value, name} = event.target;
        setValues({...formValues, [name]: value});
    };
    return {formValues, setFormValues};
  }