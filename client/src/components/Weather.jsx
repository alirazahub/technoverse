// src/components/WeatherbitWeather.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import server from '../utils/server';

const WeatherbitWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`${server}/api/weatherbit`, {
            params: {
              lat: coords.latitude,
              lon: coords.longitude,
            },
          });
          setWeatherData(response.data);
        } catch (err) {
          setError('Error fetching weather data');
        }
      };

      fetchWeatherData();
    }
  }, [coords]);

  if (!coords.latitude || !coords.longitude) return <div>Getting the location data…</div>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return <p>Loading weather data...</p>;

  return (
    <div>
      <h2>Current Weather from Weatherbit</h2>
      <p>Temperature: {weatherData.data[0].temp} °C</p>
      <p>Weather: {weatherData.data[0].weather.description}</p>
      <p>Humidity: {weatherData.data[0].rh} %</p>
    </div>
  );
};

export default WeatherbitWeather;
