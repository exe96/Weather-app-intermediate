import React from 'react';
import { iconsSystem } from '@/utils/iconsSystem';
import {IconSystem} from '@utils/iconsSystemComponent';
import hourlyMenu from '@utils/hourlyMenu';
const HourlyForecast = ({selectedDay,setSelectedDay,weatherData,iconWeather}) => {
    const dailyResult =
    weatherData?.daily?.time?.map((isoDate) => ({
        date: isoDate,
        dayName: new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            timeZone: weatherData?.timezone ?? 'UTC',
        }).format(new Date(`${isoDate}T00:00:00`)),
    })) ?? [];

    const indexOfDay=[0,24,48,72,96,120,144];

    return (
        <>
            {weatherData?.hourly && weatherData?.hourly?.time.length > 0 && (
                            <div className="hourly-forecast-article">
                                <div className="hourly-specific-day">
                                    <h3>Hourly forecast</h3>
                                    <div className="hourly-day-selector">
                                        <button 
                                            className='btn-specific-day'
                                            onClick={() => hourlyMenu(document.querySelector('.hourly-days-dropdown'))}
                                        >
                                            {dailyResult[selectedDay]?.dayName || 'error day'}
                                            
                                            <IconSystem iconSrc={iconsSystem.iconDropdown.src} iconName={iconsSystem. iconDropdown.name} classNamePicture={""} classNameImg={""}></IconSystem>      
                                        </button>
                                        
                                            <ul  className="hourly-days-dropdown" >
                                            
                                                {dailyResult?.map((date, index) => {
                                                    return (
                                                        <li key={index} onClick={() => { setSelectedDay(index) 
                                                        hourlyMenu(document.querySelector('.hourly-days-dropdown'))
                                                        
                                                        }}>
                                                        {date.dayName}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        
                                    </div>
                                </div>
                                <div className='hourly-items-content'>
                                <ul className="hourly-items">
                                            
                                        {weatherData?.hourly?.time.slice(indexOfDay[selectedDay], indexOfDay[selectedDay] + 24).map((time, index) => {  
                                                    const weather_code= weatherData?.hourly.weather_code.slice(indexOfDay[selectedDay], indexOfDay[selectedDay] + 24);
                                                    const temperature= weatherData?.hourly.temperature_2m.slice(indexOfDay[selectedDay], indexOfDay[selectedDay] + 24);
                                                console.log('Processing hourly data for index:', index);
                                                console.log('time Data :', time);
                                                const displayHour = new Intl.DateTimeFormat('en-US', {
                                                    hour: 'numeric',
                                                    hour12: true,
                                                    timeZone: weatherData?.timezone ?? 'UTC',
                                                }).format(new Date(time));
                                                return (
                                                <li key={index} className="hour-specific">

                                                    <div>
                                                        <picture className="hour-specific-picture">
                                                            <img className='img-hour' src={iconWeather[weather_code[index]].url} alt={iconWeather[weather_code[index]].name} />
                                                        </picture>
                                                        <span>{displayHour}</span>
                                                    </div>
                                                    <span>{Math.round(temperature[index])}°</span>
                                                </li>
                                                );
                                           })}
                                </ul>
                                </div>

                            </div>
                        )}
        </>
    );
}

export default HourlyForecast;
