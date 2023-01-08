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

let current = document.querySelector("#current");
current.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPositin);
});

//search city
let serach = document.querySelector("#search");
serach.addEventListener("click", function () {
  let searchInput = document.querySelector("#serach-input");

  city.innerHTML = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    console.log(response.data.weather[0].description);
    currentdegree.innerHTML = Math.round(response.data.main.temp);
    description.innerHTML = response.data.weather[0].description;
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
