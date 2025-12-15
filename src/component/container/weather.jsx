import SectionMain from "@ui/section-main";
import SecondMain from "@ui/second-main";
import HourlyForecast from "@ui/hourly-forecast";
import DailyForecast from "@ui/daily-forecast";
import { UserContext } from "@/utils/useContext";  
import { useContext } from "react"; 
import { iconWeatherSvg } from "@/utils/iconWeather";
import '@assets/style/main-section/main.css';
import { useState } from "react";

const Weather = () => {
    const { weatherData, cityData } = useContext(UserContext); 
    console.log('Weather Data:');
    console.log(weatherData); 
    console.log('Current Weather Data:');
    console.log(weatherData?.current);  
    console.log('City Data:');
    console.log(cityData);
   const code = weatherData?.current?.weather_code;
    const { name, url } = iconWeatherSvg[code] ?? iconWeatherSvg[0];
    const currentTemperature = weatherData?.current?.temperature_2m ?? '--';
    console.log('Current Temperature:', currentTemperature);
    const city = cityData?.admin3 ||cityData?.admin2 || 'Unknown City';
    const country = cityData?.country || 'Unknown Country';
    const department = cityData?.admin1 || 'Unknown Department';
    const today = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const units = weatherData?.current_units || {
        windSpeed: 'kmh',
        precipitation: 'mm'
    };
   const dailyDays =
    weatherData?.daily?.time?.map((isoDate) => ({
        date: isoDate,
        dayName: new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            timeZone: weatherData?.timezone ?? 'UTC',
        }).format(new Date(`${isoDate}T00:00:00`)),
    })) ?? [];

const [selectedDay,setSelectedDay] = useState(0);


    console.log('Daily Days:', dailyDays);
    
    return (
        <div className="main-section">
        <section className="current-weather">

            <SectionMain city={city} department={department} country={country} today={today} month={month} year={year} iconWeather={{name, url}} temperature={currentTemperature}>   </SectionMain>
            
            <SecondMain feelsLike={weatherData?.current?.apparent_temperature} humidity={weatherData?.current?.relative_humidity_2m} windSpeed={weatherData?.current?.wind_speed_10m} precipitation={weatherData?.current?.precipitation} units={units} ></SecondMain>
    



         </section>   
            <HourlyForecast selectedDay={selectedDay} setSelectedDay={setSelectedDay} weatherData={weatherData} iconWeather={iconWeatherSvg} days={dailyDays} > </HourlyForecast>
            <DailyForecast dailyData={dailyDays} selectedDay= {selectedDay} setSelectedDay={setSelectedDay} getWeatherIcon={iconWeatherSvg} getWeather={weatherData}/> 
             
        </div>
    );
}


export default Weather;
