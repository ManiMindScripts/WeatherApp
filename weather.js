const searchBox = document.querySelector(".search input ")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")


const apiEy = "715a364e34f2c0a00c900c2f5a561108"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

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
}
searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value)
})
