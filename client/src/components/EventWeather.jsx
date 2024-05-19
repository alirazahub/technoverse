import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

const EventWeather = ({ coords }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coords) {
      const fetchForecastData = async () => {
        try {
          const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${coords.latitude}&lon=${coords.longitude}&key=YOUR_API_KEY`);
          setForecastData(response.data);
        } catch (err) {
          setError('Error fetching forecast data');
        }
      };

      fetchForecastData();
    }
  }, [coords]);

  if (!coords) return <p>Getting the location data...</p>;
  if (error) return <p>{error}</p>;
  if (!forecastData) return <p>Loading forecast data...</p>;

  return (
    <div>
      <h2>Weather Forecast for Events</h2>
      {forecastData.data.slice(0, 7).map((day, index) => (
        <div key={index}>
          <p>Date: {day.datetime}</p>
          <p>Temperature: {day.temp} °C</p>
          <p>Weather: {day.weather.description}</p>
        </div>
      ))}
    </div>
  );
};

export default geolocated()(EventWeather);
