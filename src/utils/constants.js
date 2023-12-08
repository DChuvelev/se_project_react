const latitude = '32.06450';
const longitude = '34.83013';
const APIkey = '736f59045c3382f518a33a894140a02d';
export const weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

export const clothesApiRequest = {
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
};