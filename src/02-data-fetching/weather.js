import React, { useState, useEffect } from "react";

export default function Weather(props) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeatherData(city) {
      const response = await fetch(`wttr.in/${city}?format=j1`);
      setWeather(await response.json());
    }
    fetchWeatherData(props.city);
  }, [props.city]);

  if (!props.city) {
    return "No data";
  }

  if (!weather) {
    return "Loading...";
  }

  return (
    <div>
      <p className="city">{props.city}</p>
      <p>
        <span className="degrees">
          {weather.current_condition[0].FeelsLikeC}
        </span>
        °
      </p>
      <p className="description">
        {weather.current_condition[0].weatherDesc[0].value}
      </p>
    </div>
  );
}
