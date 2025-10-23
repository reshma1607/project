const apiKey = "YOUR_API_KEY_HERE";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("City not found!");
        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `🌡️ Temperature: ${data.main.temp} °C`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
        wind.textContent = `🌬️ Wind Speed: ${data.wind.speed} m/s`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (error) {
        cityName.textContent = "❌ " + error.message;
        temperature.textContent = "";
        humidity.textContent = "";
        wind.textContent = "";
        weatherIcon.src = "";
    }
}