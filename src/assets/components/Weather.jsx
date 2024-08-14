import "../styles/weather.css";
import searchIcon from "../images/search-icon-png-5.png";
import clearIcon from "../images/clear.png";
import cloudIcon from "../images/cloud.png";
import rainIcon from "../images/rain.png";
import snowIcon from "../images/snow.png";
import windIcon from "../images/wind.png";
import drizzleIcon from "../images/drizzle.png";
import humidityIcon from "../images/humid.png";
import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const inputRef = useRef();
  // const apiKey = import.meta.env.WEATHER_API_KEY || "";
  const apiKey = "0c2ef975dea04072a6f04d1d1db210f6";
  // const apiUrl = import.meta.env.WEATHER_API_URL || "";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async (city) => {
    if (!city) return alert("Please enter a city name");
    try {
      const weatherApiUrl = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(weatherApiUrl);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        hudmidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error Fetching Data", error);
    }
  };
  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search..." ref={inputRef} />
        <img
          src={searchIcon}
          alt="Search Icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          {" "}
          <img
            src={weatherData.icon}
            alt="Clear Icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{weatherData.hudmidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="humidity" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="not-found-city">City Not Found</h3>
        </>
      )}
    </div>
  );
};

export default Weather;
