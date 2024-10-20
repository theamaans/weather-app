import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search_icon.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import "./Weather_main.css";
import FavCities from "./FavCities";

const Weather_main = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=31155b0dbde9e9ed5117856072550a14`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=31155b0dbde9e9ed5117856072550a14`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (!forecastResponse.ok) {
        alert(forecastData.message);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: data.weather[0].icon
      });

      setForecastData(forecastData.list);
    } catch (error) {
      alert("Error in loading data: API not working");
    }
  };

  const handleSelectCity = (cityName) => {
    search(cityName);
  };

  useEffect(() => {
    search("Indore"); 
  }, []);

  return (
    <div className="main">
      <div className="search">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <div className="details">
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="" />
            <p className="temp">
              {isFahrenheit ? ((weatherData.temperature * 9) / 5 + 32).toFixed(0) : weatherData.temperature.toFixed(0)}°
              {isFahrenheit ? "F" : "C"}
            </p>
            <p className="location">{weatherData.location}</p>
          </div>

          <div className="deg-button">
            <button className="degree-button" onClick={() => setIsFahrenheit(!isFahrenheit)}>
              TO {isFahrenheit ? "°C" : "°F"}
            </button>
          </div>

          <div className="details-2">
            <div className="col">
              <img src={humidity} alt="" />
              <p>{weatherData.humidity}% Humidity</p>
            </div>

            <div className="col">
              <img src={wind} alt="" />
              <p>Wind speed {weatherData.windSpeed} km/h</p>
            </div>
          </div>

          <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-list">
              {forecastData &&
                forecastData.filter((item) => item.dt_txt.includes("12:00:00")).map((item, index) => (
                  <div key={index} className="forecast-data">
                    <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <p>
                      {isFahrenheit ? ((item.main.temp * 9) / 5 + 32).toFixed(0) : item.main.temp.toFixed(0)}°
                      {isFahrenheit ? "F" : "C"}
                    </p>
                    <p>{item.weather[0].description}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      <FavCities onSelectCity={handleSelectCity} />
    </div>
  );
};

export default Weather_main;
