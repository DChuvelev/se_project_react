import React from 'react';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import {
    defaultClothingItems
} from '../../utils/constants';
export default function Main(props) {
    return (
        <main className='main'>
            <WeatherCard weatherInfo={props.weatherInfo}/>
            <h2 className='main__heading'>Today is {props.weatherInfo.temp}°C / You may want to wear:</h2>            
            <ul className='main__cards'>
                {defaultClothingItems.filter((item) => item.weather === props.weatherInfo.tempInOneWord).map(item => {
                    // console.log(item);
                    return (
                        <ItemCard item={item} key={item._id} handleCardClick={props.handleCardClick}/>
                    )
                })}
            </ul>        
        </main>
    )
}