import { useState } from 'react';
import { getWeatherIcon } from '../utils/weatherUtils';
import { getDayName, isToday } from '../utils/dateUtils';
import dropdown from '../assets/images/icon-dropdown.svg';

interface DailyData {
    time: Date[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
}

interface HourlyData {
    time: Date[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation: number[];
    wind_speed_10m: number[];
}

interface DailyForecastProps {
    dailyData?: DailyData;
    hourlyData?: HourlyData;
}

const DailyForecast = ({ dailyData, hourlyData }: DailyForecastProps) => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [isHourlyDropdownOpen, setIsHourlyDropdownOpen] = useState(false);

    // Mostrar placeholder si no hay datos
    if (!dailyData || dailyData.time.length === 0) {
        return (
            <div>
                <div className="daily-forecast-article">
                    <h3>Daily forecast</h3>
                    <div className="daily-items">
                        <p style={{ textAlign: 'center', padding: '20px' }}>Cargando pronóstico...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="daily-forecast-article">
                <h3>Daily forecast</h3>
                <div className="daily-items">
                    {dailyData.time.map((date, index) => {
                        const iconPath = getWeatherIcon(dailyData.weather_code[index]);
                        const dayName = isToday(date) ? 'Today' : getDayName(date).slice(0, 3);
                        const maxTemp = Math.round(dailyData.temperature_2m_max[index]);
                        const minTemp = Math.round(dailyData.temperature_2m_min[index]);

                        return (
                            <div 
                                key={index} 
                                className={`bg-neutral-800 daily-item ${index === selectedDay ? 'active' : ''}`}
                                onClick={() => setSelectedDay(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <p>{dayName}</p>
                                <picture className='picture-day'>
                                    <img src={iconPath} alt="Weather Icon" />
                                </picture>
                                <div id='weather-temp-day'>
                                    <span>{maxTemp}°</span>
                                    <span>{minTemp}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

           
        </>
    );
};

export default DailyForecast;
