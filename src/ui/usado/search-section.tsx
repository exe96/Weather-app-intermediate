import '../assets/style/search-section/search.css';
import search from '../assets/images/icon-search.svg';
import { searchWeather } from '../fetch/fetch.ts';
import { useState, useEffect, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

interface CityResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
    admin2?: string;
}

interface GeocodeCity {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
    admin2?: string;
}

async function searchCities(query: string): Promise<CityResult[]> {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=30&language=es&format=json`
    );
    
    const data = await response.json();
    
    if (!data.results) {
        return [];
    }
    
    return data.results.map((city: GeocodeCity) => ({
        id: city.id,
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country,
        admin1: city.admin1,
        admin2: city.admin2,
    }));
}

const SearchSection = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CityResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const weatherContext = useContext(WeatherContext);
    if (!weatherContext) {
        throw new Error('SearchSection debe estar dentro de WeatherProvider');
    }
    const { setWeatherData, setLocationName, units } = weatherContext;

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            const cities = await searchCities(query);
            setResults(cities);
            setIsOpen(cities.length > 0);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleCitySelect = async (city: CityResult) => {
        const fullName = [
            city.name,
            city.admin1,
            city.country
        ].filter(Boolean).join(', ');
        
        setQuery(fullName);
        setIsOpen(false);
        setLoading(true);

        try {
            const weather = await searchWeather(
                city.latitude,
                city.longitude,
                units
            );
            setWeatherData(weather);
            setLocationName(fullName);
            console.log('✅ Clima obtenido:', weather);
        } catch (error) {
            console.error('❌ Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (results.length > 0) {
            handleCitySelect(results[0]);
        }
    };

    return (
        <div className="search-section">
            <form onSubmit={handleSubmit} method="get">
                <div className="input-search">
                <label htmlFor="search"><picture><img src={search} alt="" /></picture></label>
                <input type="text" autoComplete='off' name="search" id="search" placeholder="Search for a places..." 
                 value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
             <ul className={`search-suggest ${isOpen ? 'active' : ''}`}>
                {loading && (
                    <li className="search-loading">
                         Search in progress...
                    </li>
                )}
                
                {!loading && results.length === 0 && query.length >= 2 && (
                    <li className="search-empty">
                        ❌ No se encontraron resultados para "{query}"
                    </li>
                )}

                {!loading && results.map((city) => (
                    <li 
                        key={city.id}
                        onClick={() => handleCitySelect(city)}
                        className="search-result-item"
                    >
                        <div className="city-info">
                            <strong className="city-name">{city.name}</strong>
                            <span className="city-details">
                                {city.admin1 && <span> {city.admin1}, </span>}
                                {city.country}
                            </span>
                        </div>
                        <span className="city-coords">
                            📍 {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                        </span>
                    </li>
                ))}
            </ul>
                </div>
                <button className='btn-search-submit' type="submit" disabled={loading}>Search</button>
                
            </form>
           
        </div>
        
    );
}

export default SearchSection;
