document.addEventListener("DOMContentLoaded", () => {
	const cityInput = document.getElementById("city-input");
	const getWeatherBtn = document.getElementById("get-weather-btn");
	const weatherCard = document.getElementById("weather-card");
	const loading = document.getElementById("loading");
	const cityNameDisplay = document.getElementById("city-name");
	const countryDisplay = document.getElementById("country");
	const temperatureDisplay = document.getElementById("temperature");
	const descriptionDisplay = document.getElementById("description");
	const weatherIconImg = document.getElementById("weather-icon-img");
	const humidityDisplay = document.getElementById("humidity");
	const windSpeedDisplay = document.getElementById("wind-speed");
	const visibilityDisplay = document.getElementById("visibility");
	const feelsLikeDisplay = document.getElementById("feels-like");
	const pressureDisplay = document.getElementById("pressure");
	const errorMessage = document.getElementById("error-message");
	const errorText = document.getElementById("error-text");
	const retryBtn = document.getElementById("retry-btn");
	const themeToggle = document.getElementById("theme-toggle");
	const weatherAnimation = document.getElementById("weather-animation");

	// Dark mode functionality
	function initializeTheme() {
		const savedTheme = localStorage.getItem("theme") || "light";
		document.documentElement.setAttribute("data-theme", savedTheme);
		updateThemeIcon(savedTheme);
	}

	function toggleTheme() {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		updateThemeIcon(newTheme);
	}

	function updateThemeIcon(theme) {
		const icon = themeToggle.querySelector("i");
		if (theme === "dark") {
			icon.className = "fas fa-sun";
		} else {
			icon.className = "fas fa-moon";
		}
	}
	
	// Add click event listener to theme toggle button
	themeToggle.addEventListener("click", toggleTheme);

	// Weather animation functionality
	function createRainAnimation() {
		weatherAnimation.innerHTML = "";
		for (let i = 0; i < 100; i++) {
			const drop = document.createElement("div");
			drop.className = "rain-drop";
			drop.style.left = Math.random() * 100 + "%";
			drop.style.animationDuration = Math.random() * 0.5 + 0.5 + "s";
			drop.style.animationDelay = Math.random() * 2 + "s";
			weatherAnimation.appendChild(drop);
		}
	}

	function createSnowAnimation() {
		weatherAnimation.innerHTML = "";
		for (let i = 0; i < 50; i++) {
			const flake = document.createElement("div");
			flake.className = "snow-flake";
			flake.style.left = Math.random() * 100 + "%";
			flake.style.animationDuration = Math.random() * 3 + 2 + "s";
			flake.style.animationDelay = Math.random() * 2 + "s";
			weatherAnimation.appendChild(flake);
		}
	}

	function createCloudAnimation() {
		weatherAnimation.innerHTML = "";
		for (let i = 0; i < 5; i++) {
			const cloud = document.createElement("div");
			cloud.className = "cloud";
			cloud.style.top = Math.random() * 30 + "%";
			cloud.style.animationDuration = Math.random() * 10 + 15 + "s";
			cloud.style.animationDelay = Math.random() * 5 + "s";
			weatherAnimation.appendChild(cloud);
		}
	}

	function createThunderAnimation() {
		const thunder = document.createElement("div");
		thunder.className = "thunder";
		weatherAnimation.appendChild(thunder);
		setTimeout(() => {
			thunder.remove();
		}, 200);
	}

	function startWeatherAnimation(weatherMain) {
		weatherAnimation.classList.remove("active");
		setTimeout(() => {
			switch (weatherMain.toLowerCase()) {
				case "rain":
				case "drizzle":
					createRainAnimation();
					weatherAnimation.classList.add("active");
					break;
				case "snow":
					createSnowAnimation();
					weatherAnimation.classList.add("active");
					break;
				case "clouds":
					createCloudAnimation();
					weatherAnimation.classList.add("active");
					break;
				case "thunderstorm":
					createRainAnimation();
					weatherAnimation.classList.add("active");
					// Add thunder effects periodically
					setInterval(() => {
						if (Math.random() < 0.3) {
							createThunderAnimation();
						}
					}, 3000);
					break;
				default:
					weatherAnimation.classList.remove("active");
					weatherAnimation.innerHTML = "";
			}
		}, 300);
	}

	function stopWeatherAnimation() {
		weatherAnimation.classList.remove("active");
		weatherAnimation.innerHTML = "";
	}

	// Weather background images
	const weatherBackgrounds = {
		clear:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		clouds:
			"https://images.unsplash.com/photo-1516912481808-3406841bd33c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		rain: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		drizzle:
			"https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		thunderstorm:
			"https://images.unsplash.com/photo-1507925921958-8f62bf8a5f06?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		snow: "https://images.unsplash.com/photo-1483728642387-6c3bdd6de93a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		mist: "https://images.unsplash.com/photo-1504253163759-c23fccaebb55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		smoke:
			"https://images.unsplash.com/photo-1507608443039-bfde2fb5b50f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		haze: "https://images.unsplash.com/photo-1507608616759-54d48d236e7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		dust: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		fog: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		sand: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		ash: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		squall:
			"https://images.unsplash.com/photo-1501691223380-cb8f4d7c8e2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		tornado:
			"https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		default:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	};

	// Function to update background based on weather condition
	function updateWeatherBackground(weatherMain) {
		const weatherBackground = document.getElementById("weather-background");
		const condition = weatherMain.toLowerCase();
		const backgroundUrl =
			weatherBackgrounds[condition] || weatherBackgrounds["default"];

		// Fade out current background
		weatherBackground.style.opacity = "0";

		// After fade out, change the background and fade in
		setTimeout(() => {
			weatherBackground.style.backgroundImage = `url('${backgroundUrl}')`;
			weatherBackground.style.opacity = "0.8";
		}, 300);
	}

	// Initialize theme
	initializeTheme();

	// Handle search button click
	getWeatherBtn.addEventListener("click", handleWeatherSearch);

	// Handle Enter key press in input field
	cityInput.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			handleWeatherSearch();
		}
	});

	// Handle theme toggle click
	themeToggle.addEventListener("click", toggleTheme);

	// Handle retry button click
	retryBtn.addEventListener("click", () => {
		errorMessage.classList.add("hidden");
		cityInput.value = "";
		cityInput.focus();
		stopWeatherAnimation();
	});

	async function handleWeatherSearch() {
		const city = cityInput.value.trim();
		if (!city) {
			showError("Please enter a city name.");
			return;
		}

		try {
			// Show loading and hide other elements
			errorMessage.classList.add("hidden");
			weatherCard.classList.add("hidden");
			loading.classList.remove("hidden");

			const weatherData = await fetchWeatherData(city);
			displayWeatherData(weatherData);
		} catch (error) {
			loading.classList.add("hidden");
			if (error.message.includes("City not found")) {
				showError("City not found. Please check the spelling and try again.");
			} else {
				showError(error.message);
			}
		}
	}

	async function fetchWeatherData(city) {
		// You'll need to replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
		const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

		const response = await fetch(url);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("City not found. Please try again.");
			} else if (response.status === 401) {
				throw new Error("Invalid API key. Please check your configuration.");
			}
			throw new Error("Could not fetch weather data. Please try again later.");
		}
		const data = await response.json();
		return data;
	}

	function displayWeatherData(weatherData) {
		try {
			// Hide loading
			loading.classList.add("hidden");

			// Extract data
			const city = weatherData.name;
			const country = weatherData.sys.country;
			const temperature = Math.round(weatherData.main.temp);
			const description = weatherData.weather[0].description;
			const iconCode = weatherData.weather[0].icon;
			const weatherMain = weatherData.weather[0].main;
			const humidity = weatherData.main.humidity;
			const windSpeed = weatherData.wind.speed;
			const visibility = weatherData.visibility;

			// Update UI elements
			cityNameDisplay.textContent = city;
			countryDisplay.textContent = country;
			temperatureDisplay.textContent = temperature;
			descriptionDisplay.textContent =
				description.charAt(0).toUpperCase() + description.slice(1);
			weatherIconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			weatherIconImg.alt = description;
			humidityDisplay.textContent = `${humidity}%`;
			windSpeedDisplay.textContent = `${windSpeed} m/s`;
			visibilityDisplay.textContent = `${(visibility / 1000).toFixed(1)} km`;
			feelsLikeDisplay.textContent = `${Math.round(
				weatherData.main.feels_like
			)}°C`;
			pressureDisplay.textContent = `${weatherData.main.pressure} hPa`;

			// Update background based on weather condition
			updateWeatherBackground(weatherMain);

			// Start weather animation based on weather condition
			startWeatherAnimation(weatherMain);

			// Show weather card
			weatherCard.classList.remove("hidden");
			errorContainer.classList.add("hidden");
		} catch (error) {
			console.error("Error displaying weather data:", error);
			showError("Error displaying weather data");
		}
	}

	function showError(message) {
		errorText.textContent = message;
		errorMessage.classList.remove("hidden");
	}

});
