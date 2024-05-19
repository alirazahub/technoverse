// src/components/ClimateData.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import server from '../utils/server';

const ClimateData = () => {
  const [climateData, setClimateData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        const response = await axios.get(`${server}/api/noaa`, {
          params: {
            locationid: 'FIPS:06', // Example location ID
            startdate: '2020-01-01',
            enddate: '2020-12-31',
          },
        });
        setClimateData(response.data);
      } catch (err) {
        setError('Error fetching climate data');
      }
    };

    fetchClimateData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!climateData) return <p>Loading climate data...</p>;

  return (
    <div>
      <h2>Historical Climate Data</h2>
      {climateData.results.map((data, index) => (
        <div key={index}>
          <p>Date: {data.date}</p>
          <p>Temperature: {data.value} °F</p>
        </div>
      ))}
    </div>
  );
};

export default ClimateData;
