

const FetchCity = async(lat ,lon, setLoadingWeather) => {
        // ...existing code...
const baseUrl = 'https://api.open-meteo.com/v1/forecast';

const url = new URL(baseUrl);
url.searchParams.set('latitude', lat.toFixed(2));
url.searchParams.set('longitude', lon.toFixed(2));
url.searchParams.set('daily', 'weather_code,temperature_2m_min,temperature_2m_max');
url.searchParams.set('hourly', 'temperature_2m,weather_code');
url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,apparent_temperature,wind_speed_10m,precipitation');
url.searchParams.set('timezone', 'auto');
history.replaceState(null, '', `?${url.searchParams.toString()}`);
try {
    setLoadingWeather(true);
    console.log('weather  true');
const response = await fetch(url);
const data = await response.json();
    setLoadingWeather(false);
    console.log('weather  false');
return data;
} catch (error) {
    console.error('Error fetching weather data:', error);
}
}
export default FetchCity;
