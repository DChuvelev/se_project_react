import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import './App.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import WeatherApi from "../utils/WeatherApi.js";
import ItemModal from './ItemModal/ItemModal';
import AddItemModal from './AddItemModal/AddItemModal.js';
import RegisterModal from './RegisterModal/RegisterModal.js';
import LoginModal from './LoginModal/LoginModal.js';
import Profile from './Profile/Profile.js';
import ConfirmModal from './ConfirmModal/ConfirmModal.js';
import EditProfileModal from './EditProfileModal/EditProfileModal.js';
import { weatherApiRequest } from "../utils/constants.js"
import ProtectedRoute from '../utils/ProtectedRoute.js';
import { clothesApi } from '../utils/ClothesApi.js'

function App() {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const [weatherInfoReady, setWeatherInfoReady] = useState(false);   // change later!
  const [weatherInfo, setWeatherInfo] = useState({city: 'Moscow', temp: {F: '71F', C: '22C'}, isNight: false, tempInOneWord: 'hot'});
  const [activeModal, setActiveModal] = useState({type: ''});
  const [selectedCard, setSelectedCard] = useState({});
  const [formInfo, setFormInfo] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit ] = useState('C');
  const [clothingItems, setClothingItems] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    email: ""
  })
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  //---------------------  Initialization -----------------------------
  
  useEffect(() => {
    const weatherApiInfo = new WeatherApi(weatherApiRequest);
    weatherApiInfo.requestWeather().then(res => {
      // console.log(res);
      setWeatherInfo(weatherApiInfo.getFilteredWeather(res));
      setWeatherInfoReady(true);
    }).catch(alert);
  }, []);

  useEffect(() => {
    clothesApi.checkToken(localStorage.getItem('jwt')).then((userInfo) => {
      setLoggedIn(true);
      setCurrentUser(userInfo);
    }).catch(console.error);
  
    clothesApi.requestClothes().then(res => {
      setClothingItems(res.data);
    }).catch(alert);
  }, []);

//---------------------- Common functions -----------------------------

  const handleToggleSwitchChange = (unit) => {
    setCurrentTemperatureUnit(unit);
  }

  const handleSubmit = (request) => {
    setIsBusy(true);
    return request().then(handleModalClose).catch(alert).finally(() => {    
      setIsBusy(false);
    })  
  }

  //--------------------- Cards --------------------------

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal('card-preview');
  }

  const handleSubmitAddClothes = (item) => {
    handleSubmit(() => {
      return clothesApi.addItem(item, localStorage.getItem('jwt')).then(res => {
        setClothingItems([res, ...clothingItems]);
      })
    })
    
  }

  const handleAddClothes = () => {
    setActiveModal('form');
    setFormInfo({
      formType: 'add-garment',
      name: 'New garment',
      btnTxt: 'Add garment',
      btnTxtTypeBusy: 'Saving...',
      handleSubmit: handleSubmitAddClothes,
    })  
  }

  const deleteSelectedCard = () => {
    clothesApi.deleteItem(selectedCard._id, localStorage.getItem('jwt')).then(() => {
      setClothingItems(clothingItems.filter((item) => item._id !== selectedCard._id));
      handleModalClose();
    }).catch(alert).finally(() => {
      setIsBusy(false);
    })
  }

  const handleDelete = () => {
    setActiveModal('confirm-delete');
  }

  const handleLike = (evt, card) => {
    evt.stopPropagation();
    clothesApi.likeItem(card._id, localStorage.getItem('jwt')).then((res) => {
      setClothingItems(clothingItems => clothingItems.map(item => item._id === res._id ? res : item));
    }).catch(alert);
  }

  const handleDislike = (evt, card) => {
    evt.stopPropagation();
    clothesApi.dislikeItem(card._id, localStorage.getItem('jwt')).then((res) => {
      setClothingItems(clothingItems => clothingItems.map(item => item._id === res._id ? res : item));
    }).catch(alert);
  }

  //-------------------------- User login -------------------------------

  const handleLogin = (userInfo) => {
    const {token, ...otherUserInfo} = userInfo;
    setCurrentUser(otherUserInfo);
    localStorage.setItem('jwt', token);
    setLoggedIn(true);
  }

  const handleOpenLoginModal = (formValues) => {
    setActiveModal('form');
    setFormInfo({
      formType: 'login',
      name: 'Log In',
      btnTxt: 'Log In',
      redirBtnTxt: 'or Sign Up',
      btnTxtTypeBusy: 'Logging in...',
      handleSubmit: handleSubmitLogin,
      handleRedir: handleRedirectFromLoginToRegister,
      formValues
    })  
  }

  const handleSubmitLogin = ({ email, password }) => {
    handleSubmit(() => {
      return clothesApi.authorizeUser({ email, password }).then((res) => {
        handleLogin(res);
      }) 
    })
    
  }

  const handleRedirectFromLoginToRegister = (formValues) => {
    handleOpenRegisterModal(formValues);
  }

  //------------------------- User logout --------------------------

  const logout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
      avatar: '',
      _id: ''
    });
    history.push('/');
    handleModalClose();
  }

  const handleLogout = () => {
    setActiveModal('confirm-logout');
  }

  //---------------------------- User registration ------------------------------

  const handleOpenRegisterModal = (formValues) => {
    setActiveModal('form');
    setFormInfo({
      formType: 'register',
      name: 'Register',
      btnTxt: 'Sign Up',
      redirBtnTxt: 'or Log In',
      btnTxtTypeBusy: 'Saving...',
      handleSubmit: handleSubmitRegister,
      handleRedir: handleRedirectFromRegisterToLogin,
      formValues
    })  
  }

  const handleSubmitRegister = ({ email, name, password, confirmPassword, avatar}) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      handleSubmit(() => {
        return clothesApi.registerUser({ email, name, avatar, password }).then(() => {
          return clothesApi.authorizeUser({ email, password }).then((res) => {
            handleLogin(res);
          })
        })        
      }) 
    }
  }

  const handleRedirectFromRegisterToLogin = (formValues) => {
    handleOpenLoginModal(formValues);
  }

//------------------------ User profile editing ------------------------

  const handleOpenEditProfileModal = (formValues) => {
    setActiveModal('form');
    setFormInfo({
      formType: 'edit-profile',
      name: 'Change profile data',
      btnTxt: 'Save changes',
      btnTxtTypeBusy: 'Saving...',
      handleSubmit: handleSubmitEditProfile,
      formValues
    })  
  }

  const handleSubmitEditProfile = ({ name, avatar}) => {
    handleSubmit(() => {
      return clothesApi.updateUserInfo({ userInfo: { name, avatar }, token: localStorage.getItem('jwt')}).then(() => {
        setCurrentUser({
          ...currentUser,
          name,
          avatar
        });
      })
    })
  }

  const handleModalClose = () => {    
    setActiveModal('');
  }

  
  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange  }}>
      <CurrentUserContext.Provider value={{ currentUser }}>      
        {weatherInfoReady && 
        <div className="page">
          <div className="page__wrapper">      
            <Header 
              date={currentDate} 
              weatherInfo={weatherInfo} 
              handleAddClothes={handleAddClothes} 
              handleOpenLoginModal={handleOpenLoginModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
              loggedIn={loggedIn}
            />
            <Switch>
              <Route exact path="/">
                <Main 
                  weatherInfo={weatherInfo} 
                  handleCardClick={handleCardClick}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  clothingItems={clothingItems} 
                />
              </Route>
              <ProtectedRoute loggedIn={loggedIn} path="/profile">
                <Profile 
                  handleCardClick={handleCardClick}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  clothingItems={clothingItems} 
                  handleAddClothes={handleAddClothes} 
                  handleLogout={handleLogout}
                  handleOpenEditProfileModal={handleOpenEditProfileModal}/>
              </ProtectedRoute>
            </Switch>
            <Footer />

            {activeModal === 'form' && formInfo.formType === 'add-garment' && <AddItemModal 
              formInfo={formInfo} 
              activeModal={activeModal} 
              onClose={handleModalClose} 
              isBusy={isBusy} 
            />}
            {activeModal === 'card-preview' && <ItemModal 
              activeModal={activeModal} 
              card={selectedCard} 
              handleDelete={handleDelete} 
              onClose={handleModalClose}
            />}
            {activeModal === 'confirm-delete' && <ConfirmModal 
              message={['Are you sure you want to delete this item?', 'This action is irreversible.']}
              okBtnTxt='Yes, delete item' 
              activeModal={activeModal} 
              onOk={deleteSelectedCard} 
              onClose={handleModalClose}
            />}
            {activeModal === 'confirm-logout' && <ConfirmModal 
              message={['Are you sure you want to log out?']}
              okBtnTxt='Log out' 
              activeModal={activeModal} 
              onOk={logout}
              onClose={handleModalClose}
            />}
            {activeModal === 'form' && formInfo.formType === 'register' && <RegisterModal 
              formInfo={formInfo} 
              activeModal={activeModal} 
              onClose={handleModalClose} 
              isBusy={isBusy} 
            />}
            {activeModal === 'form' && formInfo.formType === 'login' && <LoginModal 
              formInfo={formInfo} 
              activeModal={activeModal} 
              onClose={handleModalClose} 
              isBusy={isBusy} 
            />}
            {activeModal === 'form' && formInfo.formType === 'edit-profile' && <EditProfileModal 
              formInfo={formInfo} 
              activeModal={activeModal} 
              onClose={handleModalClose} 
              isBusy={isBusy} 
            />}
          </div>
        </div>}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>    
  );
}

export default App;
