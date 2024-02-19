import React from 'react';
import './WeatherCard.css';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
export default function WeatherCard(props) {
        const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);
        return (
        <section className={`weather__container${props.weatherInfo.isNight ? ' weather__container_type_night' : ''}`}>
            <p className='weather__temp'>{props.weatherInfo.temp[currentTemperatureUnit]}</p>
            <img className="weather__icon" src={`https://openweathermap.org/img/wn/${props.weatherInfo.icon}@2x.png`} alt='Icon'/>
        </section>
    )
}