let todayName = document.getElementById("nameToday")
let numberToday = document.getElementById("dateOfToday")
let monthToday = document.getElementById("monthOfToday")
let locationToday = document.getElementById("location")
let tempToday = document.getElementById("temp")
let ImgToday = document.getElementById("todayImg")
let Custom = document.getElementById("todayCustom")
let humidity = document.getElementById("todayhumidity")
let wind = document.getElementById("todaywind")
let wind_degree = document.getElementById("todaywind_degree")
// // 
let daytow = document.getElementsByClassName("daytow")
let imgTow = document.getElementsByClassName("imgTow")
let tempTow = document.getElementsByClassName("tempTow")
let degreeTow = document.getElementsByClassName("degreeTow")
let customTow = document.getElementsByClassName("customTow")
// // 
let submit=document.getElementById("submit")
let searchInput=document.getElementById("search")


// fetch ApI
async function getWeatherData(cityName) {
    let weatherRispons = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf2a294892844ba5a09125427241501&q=${cityName}&days=3`)
let weatherData = await weatherRispons.json()
return weatherData
}


function displayData(data) {
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-Us" ,{weekday:"long"})
  numberToday.innerHTML = todayDate.getDate()
    monthToday.innerHTML = todayDate.toLocaleDateString("en-Us" ,{month:"long"})

    locationToday.innerHTML = data.location.name
    tempToday.innerHTML = data.current.temp_c
    ImgToday.setAttribute("src" ,"https"+ data.current.condition.icon)
    Custom.innerText=data.current.condition.text
    todayhumidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"Km/h"
    wind_degree.innerHTML = data.current.wind_degree
}
// display next days
function displayNextData(data) {
    let forecastData = data.forecast.forecastday
  
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date (forecastData[i+1].date)
       daytow.innerHTML = nextDate.toLocaleDateString("en-Us" ,{weekday:"long"})
        tempTow[i].innerHTML = forecastData[i+1].day.maxtemp_c
       degreeTow[i].innerHTML = forecastData[i+1].day.mintemp_c
       imgTow[i].setAttribute("src" , forecastData[i+1].day.condition.icon )
       customTow[i].innerHTML = forecastData[i+1].day.condition.text
    }
}
// start app
async function startApp(city="cairo") {
  let weatherData = await getWeatherData(city)
  displayData(weatherData)
  displayNextData(weatherData)
}
startApp()


// search
searchInput.addEventListener("input", function () {
  startApp(searchInput.value)
 
})