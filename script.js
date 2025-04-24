
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');

const card = document.querySelector('.card');

const apiKey = "6e99f29d9b8d9f6b04a712c160e795f8";

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();
    const city = cityInput.value;
    
    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city name");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("City do not exist");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
    const {name: city, sys: {country}, 
        main: {temp, humidity}, 
        weather:[{description, id}]} = data;
    card.textContent = "";
    card.style.display ="flex";
        // elements created for the card 
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
        // changes textcontent in elements 
    cityDisplay.textContent = `${city}, ${country}`;
    const tempCelsius = `${(temp - 273.15).toFixed(0)}`;
    tempDisplay.textContent = `${tempCelsius}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity} %`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
        // en if-sats för att ändra färg på temp-texten
        // beroende på temperatur
        if (tempCelsius < 0){
            tempDisplay.style.color = "blue";
        }
        if (tempCelsius >= 15 && tempCelsius < 20)
            tempDisplay.style.color = "orange";

        if (tempCelsius >= 20) {
            tempDisplay.style.color = "red";
        }
        // adds classes (for CSS)
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
        // appends the elements into the card so its visible
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🤣";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}