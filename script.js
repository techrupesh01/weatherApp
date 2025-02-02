const apiKey = '7653d4aef3212908f87a15ee5d16bdfb'; // Replace with your actual API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherResult = document.getElementById('weatherResult');
const icon = document.getElementById('icon');

// Button click event
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Fetch weather data
function fetchWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  weatherResult.classList.add('hidden'); // Hide result during fetch

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      // Display weather data
      cityName.textContent = `City: ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      description.textContent = `Condition: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      icon.alt = data.weather[0].description;

      weatherResult.classList.remove('hidden'); // Show result
    })
    .catch(error => {
      alert(error.message);
    });
}
