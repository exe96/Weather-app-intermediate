import FetchCity from "@utils/fetchCity";
 
const HandleSubmit = async({event, setLoadingWeather, setWeatherData, switchUnits, setError}) => {
    event.preventDefault();
    const form = event.currentTarget;
    const latitudeInput = form.elements.latitude?.value;
    const longitudeInput = form.elements.longitude?.value;
    
    // Verificar si los campos están vacíos o no existen
    if (!latitudeInput || !longitudeInput || latitudeInput.trim() === '' || longitudeInput.trim() === '') {
        setError('Please select a location from the search list.');
        return;
    }
    
    const latitudeValue = parseFloat(latitudeInput);
    const longitudeValue = parseFloat(longitudeInput);
    
    // Verificar si los valores son números válidos
    if (Number.isNaN(latitudeValue) || Number.isNaN(longitudeValue)) {
        setError('Invalid latitude or longitude');
        return;
    }

    if (latitudeValue === 0 && longitudeValue === 0) {
        setError('Coordinates not set');
        return;
    }

    try {
        setError(null); // Limpiar errores previos
        const weatherData = await FetchCity(latitudeValue, longitudeValue, setLoadingWeather, switchUnits);
        setWeatherData(weatherData);
    } catch (error) {
        setError( 'Error loading weather data. Please try again.');
    }
};

export { HandleSubmit };