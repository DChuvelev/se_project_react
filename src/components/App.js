import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext.js';
import './App.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import WeatherApi from "../utils/WeatherApi.js";
import ClothesApi from '../utils/ClothesApi.js';
import ItemModal from './ItemModal/ItemModal';
import AddItemModal from './AddItemModal/AddItemModal.js'
import Profile from './Profile/Profile.js';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal.js';
import {
  weatherApiRequest,
  clothesApiRequest
} from "../utils/constants.js"

function App() {
  // console.log('App, when does it happen?');
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const [weatherInfoReady, setWeatherInfoReady] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [activeModal, setActiveModal] = useState({type: ''});
  const [selectedCard, setSelectedCard] = useState({});
  const [formInfo, setFormInfo] = useState({});
  const [currentTemperatureUnit, handleToggleSwitchChange ] = useState('C');
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDelete, setCardToDelete] = useState();
  const [isBusy, setIsBusy] = React.useState(false);
  const [clothesApi, setClothesApi] = React.useState();
  
  useEffect(() => {
    const weatherApiInfo = new WeatherApi(weatherApiRequest);
    weatherApiInfo.requestWeather().then(res => {
      // console.log(res);
      setWeatherInfo(weatherApiInfo.getFilteredWeather(res));
      setWeatherInfoReady(true);
    }).catch(err => {
      alert(err);
    });
  }, []);

  useEffect(() => {
    const localClothesApi = new ClothesApi(clothesApiRequest);
    setClothesApi(localClothesApi);
    localClothesApi.requestClothes().then(res => {
      setClothingItems(res);
    }).catch(err => {
      alert(err);
    });
  }, []);

  const handleCardClick = (card) => {
    // consnpole.log(card);
    setSelectedCard(card);
    setActiveModal('card-preview');
  }

  const handleSubmitAddGarment = (item) => {
    setIsBusy(true);
    clothesApi.addItem(item).then(res => {
        setClothingItems([res, ...clothingItems]);
        handleModalClose();
    }).catch(err => {
        alert(err);
    }).finally(() => {      
      setIsBusy(false);
    })
  }

  const handleAddClothes = () => {
    setActiveModal('form');
    setFormInfo({
      formType: 'add-garment',
      name: 'New garment',
      btnTxt: 'Add garment',
      btnTxtTypeBusy: 'Saving...',
      handleSubmit: handleSubmitAddGarment,
    })  
  }

  const handleModalClose = () => {    
    setActiveModal('');
  }

  const deleteCard = (card) => {
    clothesApi.deleteItem(card._id).then(res => {
      console.log("Delete done");
      setClothingItems(clothingItems.filter((item) => item._id != card._id));
      handleModalClose();
    }).catch(err => {
      alert(err);
    }).finally(() => {
      setIsBusy(false);
    })
  }

  const handleDelete = (card) => {
    setActiveModal('confirm-delete');
    setCardToDelete(card);
  }

  
  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange  }}>
      {weatherInfoReady && 
      <div className="page">
        <div className="page__wrapper">      
          <Header date={currentDate} weatherInfo={weatherInfo} handleAddClothes={handleAddClothes}/>
          <Switch>
            <Route exact path="/">
              <Main weatherInfo={weatherInfo} handleCardClick={handleCardClick} clothingItems={clothingItems} />
            </Route>
            <Route path="/profile">
              <Profile handleCardClick={handleCardClick} clothingItems={clothingItems} handleAddItems={handleAddClothes}/>
            </Route>
          </Switch>
          <Footer />
          {activeModal === 'form' && <AddItemModal formInfo={formInfo} activeModal={activeModal} onClose={handleModalClose} isBusy={isBusy} />}
          {activeModal === 'card-preview' && <ItemModal activeModal={activeModal} card={selectedCard} handleDelete={handleDelete} onClose={handleModalClose}/>}
          {activeModal === 'confirm-delete' && <ConfirmDeleteModal activeModal={activeModal} cardToDelete={cardToDelete} onOk={deleteCard} onClose={handleModalClose}/>}
        </div>
      </div>}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
