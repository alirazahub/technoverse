// src/components/AirQuality.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import server from '../utils/server';

const AirQuality = () => {
  const [airQualityData, setAirQualityData] = useState(null);
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
      const fetchAirQualityData = async () => {
        try {
          const response = await axios.get(`${server}/api/openaq`, {
            params: {
              lat: coords.latitude,
              lon: coords.longitude,
            },
          });
          setAirQualityData(response.data);
        } catch (err) {
          setError('Error fetching air quality data');
        }
      };

      fetchAirQualityData();
    }
  }, [coords]);

  if (!coords.latitude || !coords.longitude) return <div>Getting the location data…</div>;
  if (error) return <p>{error}</p>;
  if (!airQualityData) return <p>Loading air quality data...</p>;

  return (
    <div>
      <h2>Air Quality</h2>
      {airQualityData.results.map((result, index) => (
        <div key={index}>
          <p>City: {result.city}</p>
          <p>Location: {result.location}</p>
          {result.measurements.map((measurement, idx) => (
            <div key={idx}>
              <p>{measurement.parameter}: {measurement.value} {measurement.unit}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AirQuality;
