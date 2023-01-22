//Feature #1
let date = document.querySelector("#date");
let currentDate = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = currentDate.getDay();
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();
date.innerHTML = `${weekDays[day]} ${hour}:${minute}`;

let apiKey = "a62bf47452d78ba41c221fd3cb539691";
let city = document.querySelector("#city");
let currentdegree = document.querySelector("#degree");
let description = document.querySelector("#description");
let icon = document.querySelector("#sticker");
let maxTemp = document.querySelector("#temp-max");
let minTemp = document.querySelector("#temp-low");
let speedWind = document.querySelector("#speed-wind");
let humidity = document.querySelector("#humidity");

function formatDay(timestamp){
  let date=new Date(timestamp*1000);
  let day=date.getDay();
  let days=["Sun","Mon", "Tue","Wed","Thu","Fri","Sat"];

  return days[day];
}
function showForecast(repsonse){
let forecastDaily=response.data.daily;
let forecast=document.querySelector(".forecast");
forecastDaily.forEach(function (days){
  forecast.innerHTML=`<div class="row">
          <div class="col-2 forecast-frame">
            <div class="day-forecast">${formatDay(days.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png">
            <div class="temp-forecat">
              <span class="max-temp">${Math.round(days.temp.max)}°</span>
              <span class="min-temp">${Math.round(days.temp.min)}°</span>
            </div>
          </div>
        </div>
        `;
})
}

function getForecast(coordinates){
  let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showForecast);
  
}

//current
function showWeather(response) {
  degree.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
}

function showPositin(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}


//search city
let serach = document.querySelector("#search");
serach.addEventListener("click", function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#serach-input");

  city.innerHTML = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    console.log(response.data);
    currentdegree.innerHTML = Math.round(response.data.main.temp);
    description.innerHTML = response.data.weather[0].description;
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", response.data.weather[0].description);
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    speedWind.innerHTML=Math.round(response.data.wind.speed);
    humidity.innerHTML=response.data.main.humidity;
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", function () {
      let fahrenheitTemperature = Math.round(
        (Math.round(response.data.main.temp) * 9) / 5 + 32
      );
      currentdegree.innerHTML = `${fahrenheitTemperature}`;
    });

    let celsius = document.querySelector("#celcius");
    celsius.addEventListener("click", function () {
      currentdegree.innerHTML = Math.round(response.data.main.temp);
    });

    getForecast(response.data.coord);
  });
});
