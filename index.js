import config from './config.js';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = config.API_KEY;

const searchBox = document.querySelector(".form input");
const searchBtn = document.querySelector(".form button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + `${city}&units=metric&appid=${apiKey}`);
    let data = await response.json();

    if(response.status == 404){
        document.querySelector(".error").style.display = "flex";
        document.querySelector(".weather").style.display = "none";
    } else {
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/cloud-01.svg"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/sun.svg"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/cloud-raining-02.svg"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/cloud-raining-01.svg"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/cloud-raining-06.svg"
        }
    
        document.querySelector(".weather").style.display = "flex";
        document.querySelector(".error").style.display = "none";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})