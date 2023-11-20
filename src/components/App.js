import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import WeatherApi from "../utils/WeatherApi.js";
import Modal from "./Modal/Modal";
import ItemModal from './ItemModal/ItemModal';
import ModalWithForm from './ModalWithForm/ModalWithForm';
import ModalAddGarment from './ModalAddGarment/ModalAddGarment'
import {
  weatherApiRequest
} from "../utils/constants.js"

function App() {
  // console.log('App, when does it happen?');
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  
  const [weatherInfo, setWeatherInfo] = React.useState({});
  const [activeModal, setActiveModal] = React.useState({type: ''});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [formInfo, setFormInfo] = React.useState({});
  React.useEffect(() => {
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
    setSelectedCard(card);
    setActiveModal('card-preview');
  }

  const handleSubmitAddGarment = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    handleModalClose();
  }

  const handleAddClothes = () => {
    setActiveModal('form');
    setFormInfo({
      formType: 'add-garment',
      name: 'New garment',
      btnTxt: 'Add garment',
      onSubmit: handleSubmitAddGarment,
    })  
  }

  const handleModalClose = () => {    
    setActiveModal('');
  }

  
  return (
    <div className="page">
      <div className="page__wrapper">      
        <Header date={currentDate} weatherInfo={weatherInfo} handleAddClothes={handleAddClothes}/>
        <Main weatherInfo={weatherInfo} handleCardClick={handleCardClick}/>
        <Footer />
        {activeModal === 'form' && <ModalWithForm formInfo={formInfo} activeModal={activeModal} onClose={handleModalClose}>          
            <fieldset className='modal__input-fieldset'>
                <ModalAddGarment/>
            </fieldset>
        </ModalWithForm>}
        {activeModal === 'card-preview' && <ItemModal activeModal={activeModal} card={selectedCard} onClose={handleModalClose}/>}
      </div>
    </div>
  );
}

export default App;
