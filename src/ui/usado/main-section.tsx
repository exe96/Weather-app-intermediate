import { useContext } from 'react';
import DailyForecast from "../daily-forecast";
import { WeatherContext } from '../context/WeatherContext';
import { getWeatherIcon } from '../utils/weatherUtils';
import { getFormattedDate } from '../utils/dateUtils';
import '../assets/style/main-section/main.css';

const MainSection = () => {
    const context = useContext(WeatherContext);
    
    if (!context) {
        return <div>Error: WeatherContext not provided</div>;
    }

    const { weatherData, locationName, units } = context;

    // Mostrar placeholder si no hay datos
    if (!weatherData) {
        return (
            <div className="main-section">
                <section className="current-weather">
                    <article className="main-weather">
                        <div>
                            <h2>🔍 Busca una ciudad</h2>
                            <p>para ver el pronóstico del tiempo</p>
                        </div>
                    </article>
                </section>
            </div>
        );
    }

    const currentWeather = weatherData.current;
    const dailyData = weatherData.daily;
    const hourlyData = weatherData.hourly;
    const iconPath = getWeatherIcon(currentWeather.weather_code);
    const currentDate = new Date();
    const temperature = Math.round(currentWeather.temperature);
    const feelsLike = Math.round(currentWeather.apparent_temperature);
    const humidity = Math.round(currentWeather.relative_humidity);
    const windSpeed = Math.round(currentWeather.wind_speed);
    const precipitation = Math.round(currentWeather.precipitation * 10) / 10;

    return (
        <div className="main-section">
            <section className="current-weather">

                <article className="main-weather">
                    <div>
                        <h2>{locationName}</h2>    
                        <p>{getFormattedDate(currentDate)}</p>
                    </div>
                    <div className="weather-temp">
                        <picture className="weather-temp-picture">
                            <img src={iconPath} alt="Weather Icon" />
                        </picture>
                        <p>{temperature}°</p> 
                    </div>
                </article>   
                <section className="additional-info">
                    <article className="bg-neutral-800">
                        <p>Feels Like</p>
                        <span>{feelsLike}°</span>
                    </article> 
                    <article className="bg-neutral-800">
                        <p>Humidity</p>
                        <span>{humidity}%</span>
                    </article>
                    <article className="bg-neutral-800">
                        <p>Wind</p>
                        <span>{windSpeed} {units.windSpeed === 'kmh' ? 'km/h' : 'mph'}</span>
                    </article> 
                    <article className="bg-neutral-800">
                        <p>Precipitation</p>
                        <span>{precipitation} {units.precipitation === 'mm' ? 'mm' : 'in'}</span>
                    </article>    
                </section>   
            </section>

            <DailyForecast dailyData={dailyData} hourlyData={hourlyData} />

        </div>
    );
}

export default MainSection;

