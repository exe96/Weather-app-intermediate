const FetchCity = async(lat ,lon, setLoadingWeather, fahrenheit) => {

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

const url = new URL(baseUrl);
url.searchParams.set('latitude', lat.toFixed(2));
url.searchParams.set('longitude', lon.toFixed(2));
url.searchParams.set('daily', 'weather_code,temperature_2m_min,temperature_2m_max');
url.searchParams.set('hourly', 'temperature_2m,weather_code');
url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,apparent_temperature,wind_speed_10m,precipitation');
url.searchParams.set('timezone', 'auto');
if (fahrenheit) {
    url.searchParams.set('temperature_unit', 'fahrenheit');
    url.searchParams.set('windspeed_unit', 'mph');
    url.searchParams.set('precipitation_unit', 'inch');
}
history.replaceState(null, '', `?${url.searchParams.toString()}`);
    
try {
    setLoadingWeather(true);
    
    // Crear promesa de timeout como fallback (10 segundos)
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - La solicitud tardó demasiado')), 10000);
    });
    
    // Fetch con timeout
    const fetchPromise = fetch(url).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: No se pudo conectar al servidor`);
        }
        return response.json();
    });
    
    // Race entre el fetch y el timeout
    const data = await Promise.race([fetchPromise, timeoutPromise]);
    
    localStorage.setItem('weatherData', JSON.stringify(data));
    return data;
    
} catch (error) {
    console.warn('Error fetching weather data:');
    setLoadingWeather(false);
    // Re-lanzar el error para que pueda ser manejado en el componente
    throw error;
}finally{
    setLoadingWeather(false);   
}
};
export default FetchCity;
