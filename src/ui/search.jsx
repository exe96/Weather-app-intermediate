import {HandleSubmit} from '@utils/handleSubmit';
import '@assets/style/search-section/search.css';
import {useState,useRef} from 'react';
import HandleQuery from '@utils/handleQuery';
import { iconsSystem  } from '@utils/iconsSystem';
import { IconSystem } from '@utils/iconsSystemComponent';
import HandleCitySelect from '@utils/handleCitySelect';
import { useContext } from 'react';
import { UserContext } from '@/utils/useContext';

const Search = () => {
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const [loading, setLoading] = useState(false);
const latitude = useRef(0);
const longitude = useRef(0);
const formRef = useRef(null);
const listRef = useRef(null);
const { setLoadingWeather } = useContext(UserContext);      
const { setCityData } = useContext(UserContext);
const { setWeatherData } = useContext(UserContext);
    HandleQuery({query, setResults, setIsOpen, setLoading});
    return (
        <>
          <div className="search-section">
            <form  ref={formRef} onSubmit={
                (event) => HandleSubmit({event, setLoadingWeather,setWeatherData})} method="get">
                <div className="input-search">
                    <label htmlFor="search"><picture><img src={iconsSystem.iconSearch.src} alt={iconsSystem.iconSearch.name} /></picture></label>
                    <input type="text" autoComplete='off' name="search" id="search" placeholder="Search for a places..." 
                        value={query} onChange={(e) => setQuery(e.target.value)}
                        
                    />
                    <input ref={latitude} name='latitude' type="hidden" ></input>
                    <input ref={longitude} name='longitude' type="hidden" ></input>
                        {isOpen && (
                        <ul ref={listRef} className="search-suggest active">
                            {loading ? (
                                <li className="search-loading">
                                    <IconSystem
                                        iconSrc={iconsSystem.iconLoading.src}
                                        iconName={iconsSystem.iconLoading.name}
                                        pictureClassName="icon-loading-picture"
                                        imgClassName="icon-loading-img"
                                    />
                                    Search in progress
                                </li>
                            ) : (
                                results.map((city) => (
                       <li 
                        key={city.id}
                        onClick={() => HandleCitySelect({
                        city,
                        latitude: latitude,
                        longitude: longitude,
                        formRef,
                        setCityData,
                        listRef
                    })}
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
                        ))
                        
                            )}
                        </ul>
                    )}


                    {/* {isOpen && (
                    <ul className='search-suggest active'> 
                        
                        {loading && (
                        <li className="search-loading">
                            <IconSystem 
                                icon_src={iconsSystem.iconLoading.src} 
                                icon_name={iconsSystem.iconLoading.name} 
                                classNamePicture="icon-loading-picture"
                                classNameImg="icon-loading-img"
                            />
                                 Search in progress
                        </li>
                        )} */}
                        
        
                       
                    
                </div>
                        <button className='btn-search-submit' type="submit">Search</button>
                        
            </form>
                   
        </div>
        {results['error'] && ( 
        <div>No results found </div>)} 
         </>       
    );
};





export default Search;
