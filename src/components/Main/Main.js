import React from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
export default function Main({ weatherInfo, handleCardClick, clothingItems}) {
    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);
    return (
        <main className='main'>
            <WeatherCard weatherInfo={weatherInfo}/>
            <h2 className='main__heading'>Today is {weatherInfo.temp[currentTemperatureUnit]} / You may want to wear:</h2>            
            <ul className='main__cards'>
                {clothingItems.filter((item) => item.weather === weatherInfo.tempInOneWord).map(item => {
                    return (
                        <ItemCard item={item} key={item._id} handleCardClick={handleCardClick}/>
                    )
                })}
            </ul>        
        </main>
    )
}