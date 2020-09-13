const api = {
  key: "5a03d725cbe074961054dbf1dbf55ce4",
  baseurl: "https://api.openweathermap.org/data/2.5/weather/"
}

// search
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    // console.log(searchbox.value);
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}?q=${query}&units=imperial&APPID=${api.key}`)
    .catch((error) => {
      console.error('Error: ', error);
    })
    .then((weather) => {return weather.json()})
    .then(displayResults);
}

function displayResults(weather) {
  // console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temperature');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder(d) {
  let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}