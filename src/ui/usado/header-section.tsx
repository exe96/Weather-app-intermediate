import { useContext, useState } from 'react';
import Logo from '../assets/images/logo.svg';
import dropdown from '../assets/images/icon-dropdown.svg';
import unitsIcon from '../assets/images/icon-units.svg';
import { WeatherContext } from '../context/WeatherContext';
import { searchWeather } from '../fetch/fetch';
import '../assets/style/header-section/header.css';

const HeaderSection = () => {
    const context = useContext(WeatherContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!context) {
        return <div>Error: WeatherContext not provided</div>;
    }

    const { weatherData, units, setUnits } = context;

    const toggleUnit = async (type: 'temperature' | 'windSpeed' | 'precipitation') => {
        const newUnits = { ...units };

        if (type === 'temperature') {
            newUnits.temperature = units.temperature === 'celsius' ? 'fahrenheit' : 'celsius';
        } else if (type === 'windSpeed') {
            newUnits.windSpeed = units.windSpeed === 'kmh' ? 'mph' : 'kmh';
        } else if (type === 'precipitation') {
            newUnits.precipitation = units.precipitation === 'mm' ? 'inch' : 'mm';
        }

        setUnits(newUnits);

        // Refetch weather data if location is selected
        if (weatherData) {
            setIsLoading(true);
            try {
                const updatedWeather = await searchWeather(
                    weatherData.location.latitude,
                    weatherData.location.longitude,
                    newUnits
                );
                // Update context with new weather data
                context.setWeatherData(updatedWeather);
            } catch (error) {
                console.error('Error fetching weather with new units:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <header>
            <nav>
                <picture>
                    <img src={Logo} alt="Logo weather" />
                </picture> 
                
                <div className="select">
                    <div 
                        className="weather-options"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={unitsIcon} alt="Units icon" /> Units <img src={dropdown} alt="Dropdown icon" />
                    </div>
                    {isMenuOpen && (
                        <div className="options-menu-units">
                            <p>Temperature</p>
                            <ul className="menu">
                                <li>
                                    <button 
                                        onClick={() => toggleUnit('temperature')}
                                        disabled={isLoading}
                                        style={{
                                            fontWeight: units.temperature === 'celsius' ? 'bold' : 'normal'
                                        }}
                                    >
                                        Celsius (°C)
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => toggleUnit('temperature')}
                                        disabled={isLoading}
                                        style={{
                                            fontWeight: units.temperature === 'fahrenheit' ? 'bold' : 'normal'
                                        }}
                                    >
                                        Fahrenheit (°F)
                                    </button>
                                </li>
                            </ul>
                            <hr />
                            <p>Wind Speed</p>
                            <ul className="menu">
                                <li>
                                    <button 
                                        onClick={() => toggleUnit('windSpeed')}
                                        disabled={isLoading}
                                        style={{
                                            fontWeight: units.windSpeed === 'kmh' ? 'bold' : 'normal'
                                        }}
                                    >
                                        km/h
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => toggleUnit('windSpeed')}
                                        disabled={isLoading}
                                        style={{
                                            fontWeight: units.windSpeed === 'mph' ? 'bold' : 'normal'
                                        }}
                                    >
                                        mph
                                    </button>
                                </li>
                            </ul>
                            <hr />
                            <p>Precipitation</p>
                            <ul className="menu">
                                <li>
                                    <button 
                                        onClick={() => toggleUnit('precipitation')}
                                        disabled={isLoading}
                                        style={{
                                            fontWeight: units.precipitation === 'mm' ? 'bold' : 'normal'
                                        }}
                                    >
                                        Millimeters (mm)
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => toggleUnit('precipitation')}
                                        disabled={isLoading}
                                        style={{
                                            fontWeight: units.precipitation === 'inch' ? 'bold' : 'normal'
                                        }}
                                    >
                                        Inches (in)
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

            </nav>
        </header>
    );
}

export default HeaderSection;
