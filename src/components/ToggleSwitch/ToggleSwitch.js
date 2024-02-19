import React from 'react';
import './ToggleSwitch.css';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
export default function ToggleSwitch() {
    const {  currentTemperatureUnit, setCurrentTemperatureUnit  } = React.useContext(CurrentTemperatureUnitContext);
    // console.log(props);
    const handleSwitchTemperature = () => {
        currentTemperatureUnit === 'F'
            ? setCurrentTemperatureUnit('C')
            : setCurrentTemperatureUnit('F');
    }
    return (
        <>
            
            <input 
                className='toggle-switch__checkbox'
                id='toggle-switch'
                type="checkbox" 
                onChange={handleSwitchTemperature}
            />
            <label
                className='toggle-switch__label'
                htmlFor='toggle-switch'
            >
                <span className='toggle-switch__button' />

                <span 
                    className='toggle-switch__letter'
                    style={{ color: (currentTemperatureUnit === 'C') && 'white'}}
                >
                    C
                </span>

                <span 
                    className='toggle-switch__letter'
                    style={{ color: (currentTemperatureUnit === 'F') && 'white'}}
                >
                    F
                </span>
            </label>
        </>
    )
}
