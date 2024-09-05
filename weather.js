const searchBox = document.querySelector(".search input ")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")


const apiEy = "715a364e34f2c0a00c900c2f5a561108"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

async function checkWeather(city) {
    const response = await fetch (apiUrl + city + `&appid=${apiEy}`)

     const data  = await response.json()
     console.log(data)
     document.querySelector(".city").innerHTML = data.name
     document.querySelector(".temp").innerHTML  = Math.round( data.main.temp )+ "°C"
     document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
     document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"
    
     if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/snow.webp"
     }
     else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "images/sun.webp"
     }
     else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rainy.webp"
     }
     else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/dri.webp"
     }
     else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.webp"
     }
    const forecastResponse = await fetch (forecastApiUrl + city + `&appid=${apiEy}`)
     const forecastData = await forecastResponse.json()
     console.log(forecastData)
     const day1Data = forecastData.list[8]; // 24 hours from now
        document.querySelectorAll(".forecast-day")[0].querySelector(".forecast-temp").textContent = 
            "Temp: " + Math.round(day1Data.main.temp) + "°C";
        updateForecastIcon(document.querySelectorAll(".forecast-day")[0].querySelector(".forecast-icon"), day1Data.weather[0].main);
        
        // Update Day 2 forecast
        const day2Data = forecastData.list[16]; // 48 hours from now
        document.querySelectorAll(".forecast-day")[1].querySelector(".forecast-temp").textContent = 
            "Temp: " + Math.round(day2Data.main.temp) + "°C";
        updateForecastIcon(document.querySelectorAll(".forecast-day")[1].querySelector(".forecast-icon"), day2Data.weather[0].main);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
function updateForecastIcon(iconElement, weatherCondition) {
    // Set the icon based on weather condition
    if (weatherCondition === "Clouds") {
        iconElement.src = "images/dri.webp";
    } else if (weatherCondition === "Clear") {
        iconElement.src = "images/sun.webp";
    } else if (weatherCondition === "Rain") {
        iconElement.src = "images/rainy.webp";
    } else if (weatherCondition === "Drizzle") {
        iconElement.src = "images/dri.webp";
    } else if (weatherCondition === "Mist") {
        iconElement.src = "images/mist.webp";
    } else {
        iconElement.src = "images/default.webp"; // Fallback icon
    }

}
searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value)
})
