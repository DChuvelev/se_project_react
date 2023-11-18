import React from 'react';
import './WeatherCard.css';
export default function WeatherCard(props) {
    
    return (
        <section className="weather__container">
            <p className='weather__temp'>{props.weatherInfo.temp}°C</p>
            <img className="weather__icon" src={`https://openweathermap.org/img/wn/${props.weatherInfo.icon}@2x.png`} />
        </section>
    )
}