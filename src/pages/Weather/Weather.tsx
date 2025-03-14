import { useState, useEffect } from 'react';
import './Weather.css';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Austin,US&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="weather-container">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Current Weather in {weather.name}</h2>
        <div className="weather-main">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            {Math.round(weather.main.temp)}°F
          </div>
        </div>
        <div className="weather-description">
          {weather.weather[0].description.charAt(0).toUpperCase() + 
           weather.weather[0].description.slice(1)}
        </div>
        <div className="weather-details">
          <div className="detail">
            <span className="label">Feels like:</span>
            <span className="value">{Math.round(weather.main.feels_like)}°F</span>
          </div>
          <div className="detail">
            <span className="label">Humidity:</span>
            <span className="value">{weather.main.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind Speed:</span>
            <span className="value">{Math.round(weather.wind.speed)} mph</span>
          </div>
          <div className="detail">
            <span className="label">Pressure:</span>
            <span className="value">{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 