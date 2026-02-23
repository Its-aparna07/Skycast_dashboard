// 1. YOUR LIBRARY CARD (API KEY)
const apiKey = "24ad20d1144fadeb404f55c5ced6b4cf";

// 2. THE ACTORS
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// 3. THE TRIGGER (BUTTON CLICK)
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    weatherInfo.innerHTML = "<p>Consulting the clouds... ☁️</p>";

    try {
        // THE LONG-DISTANCE CALL (FETCH)
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();
        
        // UPDATE THE STAGE
        displayWeather(data);
        
        // UPDATE THE THEME
        updateTheme(data.weather[0].main);

    } catch (error) {
        weatherInfo.innerHTML = `<p style="color: #ff4d4d;">${error.message}</p>`;
    }
});

// 4. THE STAGE MANAGER (DISPLAY WEATHER)
function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const name = data.name;

    weatherInfo.innerHTML = `
        <h2 style="font-size: 2rem;">${name}</h2>
        <p style="font-size: 4rem; margin: 10px 0;">${temp}°C</p>
        <p style="text-transform: capitalize; font-size: 1.2rem;">${desc}</p>
    `;
}

// 5. THE DESIGNER (THEME SWITCHER)
function updateTheme(weatherCondition) {
    const body = document.body;
    
    // We check what the weather "Main" word is (e.g., "Clear", "Clouds", "Rain")
    if (weatherCondition === "Clear") {
        body.style.background = "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"; // Sunny Orange
    } else if (weatherCondition === "Clouds") {
        body.style.background = "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)"; // Cloudy Grey
    } else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
        body.style.background = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"; // Rainy Blue
    } else if (weatherCondition === "Snow") {
        body.style.background = "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)"; // Snowy White
    } else {
        body.style.background = "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"; // Default Blue
    }
}