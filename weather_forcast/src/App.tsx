import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import { API_KEY, UNSPLASH_API_KEY } from './constants';

const API_URL = 'https://api.openweathermap.org/data/2.5';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

function App() {
  const [city, setCity] = useState('Paris');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [photographer, setPhotographer] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
    fetchBackgroundImage();
  }, [city]);

  const fetchWeather = async () => {
    setError(null);
    try {
      const currentResponse = await fetch(`${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const forecastResponse = await fetch(`${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (error) {
      setError('City not found. Please try again.');
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchBackgroundImage = async () => {
    try {
      const response = await fetch(`${UNSPLASH_API_URL}?query=${city}&client_id=${UNSPLASH_API_KEY}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setBackgroundImage(data.results[0].urls.regular);
        setPhotographer(data.results[0].user.name);
      }
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto p-4">
        <SearchBar onCitySelect={handleCitySelect} />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {currentWeather && <WeatherCard weather={currentWeather} />}
          {forecast && <ForecastCard forecast={forecast} />}
        </div>

        {photographer && (
          <div className="text-white text-sm mt-4">
            Photo by <a href={`https://unsplash.com/@${photographer}?utm_source=your_app_name&utm_medium=referral`} target="_blank" rel="noopener noreferrer">{photographer}</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;