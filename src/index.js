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
let sunrise=document.querySelector("#sunrise");
let sunset=document.querySelector("#sunset");




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

    //sunset and sunrise conversion
    let timezone = response.data.main.timezone;
    let sunriseData = response.data.sys.sunrise;
    let sunsetData = response.data.sys.sunset;

    sunrise.innerHTML=moment.utc(sunriseData,'X').add(timezone,'seconds').format('HH:mm a');
    sunset.innerHTML=moment.utc(sunsetData,'X').add(timezone,'seconds').format('HH:mm a');

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

  });
});


