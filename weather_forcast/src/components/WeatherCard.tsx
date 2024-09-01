import React from 'react';

interface WeatherCardProps {
  weather: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Current Weather in {weather.name}</h2>
      <p className="text-6xl mb-4">{weather.main.temp.toFixed(1)}°C</p>
      <p className="text-xl mb-2">{weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind speed: {weather.wind.speed.toFixed(1)} km/h</p>
      <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p>
    </div>
  );
};

export default WeatherCard;