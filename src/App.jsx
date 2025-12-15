import HeaderSection from '@ui/header-section';
import SearchSection from '@ui/search';
import Weather from '@/component/container/weather';
import '@assets/style/default-config.css';
import '@assets/style/global-config.css';
import '@assets/style/reset.css';
import { useState } from 'react';
import { UserContext } from '@utils/useContext';
import WeatherLoading from '@/component/container/weatherLoading'; 
import '@/App.css'; 
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [cityData, setCityData] = useState(null);
  return (
    <UserContext.Provider value={{ weatherData, setWeatherData ,loadingWeather, setLoadingWeather, cityData, setCityData }}>
    <div className="App">
      <HeaderSection/>
      <h1>Weather App</h1>
      <SearchSection/>
     {/*  {weatherData && cityData && <Weather></Weather>|| loadingWeather && <WeatherLoading/>} */}
      <Weather/>
    </div>
    </UserContext.Provider>
  );

}

export default App
