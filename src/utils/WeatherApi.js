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
        const timeInSec = Date.now()/1000;
        const tempInCelsius = (res.main.temp - 32) * 5/9;
        const compactInfo = {
            city: res.name,
            temp: {
                F: Math.round(res.main.temp) + '°F',
                C: Math.round(tempInCelsius) + '°C',
            },
            icon: res.weather[0].icon,
            isNight: timeInSec > res.sys.sunrise && timeInSec < res.sys.sunset ? false : true,
        };
        if (tempInCelsius > 25) {
            compactInfo.tempInOneWord = 'hot';
        } else if (tempInCelsius > 18) {
            compactInfo.tempInOneWord = 'warm';
        } else {
            compactInfo.tempInOneWord = "cold";
        };
        return compactInfo;
    }
}