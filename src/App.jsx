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
import SearchFirst from '@/ui/searchFirst';
import VerifyApi from '@/ui/verifyApi';
import { useOnlineStatus } from '@utils/useOnlineStatus';
function App() {
  const [weatherData, setWeatherData] = useState( localStorage.getItem('weatherData') ?  JSON.parse(localStorage.getItem('weatherData')) : null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [cityData, setCityData] = useState( localStorage.getItem('cityData') ?  JSON.parse(localStorage.getItem('cityData')) : null);
  const [switchUnits, setSwitchUnits] = useState( localStorage.getItem('switchUnits') === 'true' || false );
  const [error, setError] = useState(null);
const isOnline = useOnlineStatus();
    return (
    <UserContext.Provider value={{ weatherData, setWeatherData ,loadingWeather, setLoadingWeather, cityData, setCityData, switchUnits, setSwitchUnits, error, setError}}>
    <div className="App">
      <HeaderSection/>
      
      { (!isOnline && !weatherData )||( error && !weatherData) ? <VerifyApi /> : 
      
      <>  
        <h1 className='h1-title-App'>How’s the sky looking today?</h1>
        <SearchSection/>
        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div className="error-message" style={{
            padding: '1rem',
            margin: '1rem',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {/* Estado inicial: sin datos */}
        {!weatherData && !cityData && !loadingWeather && !error && <SearchFirst />}
      {/*  {!weatherData&& error && <Error />} */}
        {/* Cargando datos */}
        {loadingWeather && !error && <WeatherLoading/> }
        
        {/* Datos cargados correctamente */}
        {weatherData && cityData && !loadingWeather && !error && <Weather />} 
      
      </>
      }

      <footer>
      </footer> 
    </div>
    </UserContext.Provider>
  );

}

export default App
