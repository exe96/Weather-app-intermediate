import FetchCity from "@utils/fetchCity";
 
const HandleSubmit = async({event, setLoadingWeather,setWeatherData}) => {
    event.preventDefault();
    const form = event.currentTarget;
    const latitudeValue = parseFloat(form.elements.latitude?.value ?? '');
    const longitudeValue = parseFloat(form.elements.longitude?.value ?? '');
    console.log('Latitude:', latitudeValue);
    console.log('Longitude:', longitudeValue);
    if (Number.isNaN(latitudeValue) || Number.isNaN(longitudeValue)) {
        console.warn('Latitud o longitud inválidas');
        return;
    }

    if (latitudeValue === 0 && longitudeValue === 0) {
        console.warn('Coordenadas no establecidas');
        return;
    }

    const weatherData = await FetchCity(latitudeValue, longitudeValue, setLoadingWeather);
    console.log('Weather Data:', weatherData);
    setWeatherData(weatherData);

};

export { HandleSubmit };