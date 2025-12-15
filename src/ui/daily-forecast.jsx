import '@assets/style/daily-forecast/daily-forecast.css';

const DailyForecast = ({dailyData, selectedDay, setSelectedDay, getWeatherIcon, getWeather}) => {
/*             dailyData={dailyDays} selectedDay= {dailyDays[0].date} getWeatherIcon={iconWeatherSvg} getWeather={weatherData}
 */
 console.log('Daily Data:', dailyData);
    return (
        <>
            <div className="daily-forecast-article">
                <h3>Daily forecast</h3>
                <div className="daily-items">
               
                    {dailyData.map((date, index) => {
                        console.log('Processing daily data for index:', index);
                        
                        const code=getWeather?.daily?.weather_code[index];
                        console.log('code Data :', code);
                        const iconPath = getWeatherIcon[code] || 'null';
                        console.log('Icon Path:', iconPath);
                        const dayName = dailyData[index].dayName;
                        const maxTemp = Math.round(getWeather.daily.temperature_2m_max[index]);
                        const minTemp = Math.round(getWeather.daily.temperature_2m_min[index]);

                        return (
                            <div 
                                key={index} 

                                onClick={() => setSelectedDay(index)}
                                className={`bg-neutral-800 daily-item animation-daily ${index === selectedDay ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                            >
                                <p>{dayName}</p>
                                <picture className='picture-day'>
                                    <img src={iconPath.url||''} alt={iconPath.name || ''} />
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
}

export default DailyForecast;
