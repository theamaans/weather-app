# Weather App

A simple weather application built with React that allows users to search for city weather, view forecasts, and manage favorite cities.

## Features

- **Search Weather**: Users can search for current weather by city name.
- **5-Day Forecast**: View a detailed 5-day weather forecast.
- **Favorite Cities**: Add, remove, and select favorite cities for quick access to weather data.
- **Temperature Conversion**: Toggle between Celsius and Fahrenheit for temperature readings.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Axios**: For making API requests to fetch weather data and manage favorite cities.
- **OpenWeatherMap API**: For retrieving weather data.
- **JSON Server**: For managing favorite cities with a simple RESTful API.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
Navigate to the project directory:
cd weather-app
Install the dependencies:
npm install
Start the JSON server
json-server --watch db.json --port 3001
Start the React application:
npm start
You need an API key from OpenWeatherMap to fetch weather data. Replace the API key in the Weather_main component with your own:
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`;

the API key is = 31155b0dbde9e9ed5117856072550a14


