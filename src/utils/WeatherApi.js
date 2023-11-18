export default class WeatherApi {
    constructor(request) {
        this.request = request;
        // console.log("Weather Api constructor");
    }
    requestWeather() {
        return fetch(this.request).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error number: ${res.status}`);
            }    
        })
    }
    getFilteredWeather = (res) => {
        const compactInfo = {
            city: res.name,
            temp: Math.round(res.main.temp),
            icon: res.weather[0].icon,
        };
        if (res.main.temp > 32) {
            compactInfo.tempInOneWord = 'Very hot';
        } else if (res.main.temp > 25) {
            compactInfo.tempInOneWord = 'Hot';
        } else if (res.main.temp > 21) {
            compactInfo.tempInOneWord = 'Normal';
        } else if (res.main.temp > 15) {
            compactInfo.tempInOneWord = 'Cool';
        } else if (res.main.temp > 3) {
            compactInfo.tempInOneWord = 'Cold';
        } else {
            compactInfo.tempInOneWord = "It's fucking winter!";
        };
        return compactInfo;
    }
}