import { useCallback, useState } from 'react';

import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleCityChange = useCallback((city) => {
    setError(false);
    setIsLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          setWeather({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          });
          setIsLoading(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);
  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {weather && !error && <WeatherSummary {...weather} />}
      {isLoading && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
