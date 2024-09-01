import React from 'react';

interface ForecastCardProps {
  forecast: any;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const dailyForecast = forecast.list.filter((item: any) => item.dt_txt.includes('12:00:00'));

  return (
    <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">5 Days Weather Forecast</h2>
      <div className="grid grid-cols-5 gap-4">
        {dailyForecast.slice(0, 5).map((day: any, index: number) => (
          <div key={index} className="text-center">
            <p className="font-bold">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p className="text-2xl my-2">{day.main.temp.toFixed(1)}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="mx-auto"
            />
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;