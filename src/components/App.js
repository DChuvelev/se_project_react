import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import WeatherApi from "../utils/WeatherApi.js";
import Modal from "./Modal/Modal";
import {
  weatherApiRequest
} from "../utils/constants.js"

function App() {
  // console.log('App, when does it happen?');
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  
  const [weatherInfo, setWeatherInfo] = React.useState({});
  const [windowState, setWindowState] = React.useState({modalOpened: false});
  React.useEffect(() => {
    console.log("That's a use effect from App. Should be used once.");
    const weatherApiInfo = new WeatherApi(weatherApiRequest);
    weatherApiInfo.requestWeather().then(res => {
      // console.log(res);
      setWeatherInfo(weatherApiInfo.getFilteredWeather(res));
    }).catch(err => {
      alert(err);
    });
  }, []);

  const handleCardClick = (card) => {
    // console.log(card);
    setWindowState({
      modalOpened: true,
      modalType: 'image',
      card: card,
    })
  }

  const handleAddClothes = () => {
    setWindowState({
      modalOpened: true,
      modalType: 'form',
      formType: 'add-garment',
      name: 'New garment',
      btnTxt: 'Add garment',
    })  
  }

  const handleClose = () => {    
    setWindowState({
      ...windowState,
      modalOpened: false
    });
  }

  
  return (
    <div className="page">
      <div className="page__wrapper">      
        <Header date={currentDate} weatherInfo={weatherInfo} handleAddClothes={handleAddClothes}/>
        <Main weatherInfo={weatherInfo} handleCardClick={handleCardClick}/>
        <Footer />
        <Modal windowState={windowState}  onClose={handleClose}/>
      </div>
    </div>
  );
}

export default App;
