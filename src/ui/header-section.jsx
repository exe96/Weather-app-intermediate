import {iconsSystem} from '@/utils/iconsSystem';
import {IconSystem} from '@/utils/iconsSystemComponent';
import '@assets/style/header-section/header.css';
import  {useRef} from 'react';
import Toggle from '@/utils/toggle';
import { useContext } from 'react';
import { UserContext } from '@utils/useContext';    
import FetchCity from '../utils/fetchCity';
const HeaderSection = () => {
    const unitsMenuRef = useRef(null);
    const { switchUnits, setSwitchUnits, weatherData ,setWeatherData, setLoadingWeather, cityData} = useContext(UserContext);
    return (
        <header>
            <nav>
              
                <IconSystem
                    iconSrc={iconsSystem.logo.src}
                    iconName={iconsSystem.logo.name}
                    ClassNamePicture="logo-picture"
                    ClassNameImg="logo-img"
                />

                <div className="select">
                    <div 
                        className="weather-options  "
                        onClick={() => {
                            
                            Toggle(unitsMenuRef.current)
                           
                            }}
                        style={{ cursor: 'pointer' }}
                    >
                        <IconSystem
                            iconSrc={iconsSystem.iconUnits.src}
                            iconName={iconsSystem.iconUnits.name}
                            ClassNamePicture="nav-units-picture"
                            ClassNameImg="nav-units-img"
                        />
                        <span className='weather-options-span'> Units</span>
                        <IconSystem
                            iconSrc={iconsSystem.iconDropdown.src}
                            iconName={iconsSystem.iconDropdown.name}
                            ClassNamePicture="nav-dropdown-picture"
                            ClassNameImg="nav-dropdown-img"
                        />
                    </div>
                    
                        
                        <div ref={unitsMenuRef} className="options-menu-units  ">
                        <div> <button onClick={
                            async() => {
                                const Switch=!switchUnits;
                            setSwitchUnits(Switch);
                            localStorage.setItem('switchUnits', Switch);
                            if(weatherData){
                                let data = await FetchCity(parseFloat(cityData.latitude), parseFloat(cityData.longitude), setLoadingWeather, Switch);
                                if(data){
                                setWeatherData(data);
                                }
                                /*lat ,lon, setLoadingWeather, fahrenheit*/
                            }    
                            }

                        } className='btn-menu-units'>{switchUnits ? 'Switch to Metric' : 'Switch to Imperial'}</button>  </div>
                            <p className='title-temperature'>Temperature</p>
                            <ul className="menu options-menu-units-list">
                                <li className={!switchUnits ? 'option-selected-celsius' : ''}>
                                   
                                        Celsius (°C)
                                    
                                </li>
   
                                <li className={!switchUnits ? '' : 'option-selected-fahrenheit'}>
                                    
                                        Fahrenheit (°F)
                                    
                                </li>
                            </ul>
                            <hr />
                            <p className='title-wind-speed'>Wind Speed</p>
                            <ul className="menu">
                                <li className={!switchUnits ? 'option-selected-kmh' : ''}>
                                    
                                        km/h
                                   
                                </li>
                                <li className={switchUnits ? 'option-selected-mph' : ''}>
                                    
                                        mph
                                   
                                </li>
                            </ul>
                            <hr />
                            <p className='title-precipitation'>Precipitation</p>
                            <ul className="menu">
                                <li className={!switchUnits ? 'option-selected-mm' : ''}>
                                   
                                        Millimeters (mm)
                                    
                                </li>
                                <li className={switchUnits ? 'option-selected-in' : ''}>
                                    
                                        Inches (in)
                                    
                                </li>
                            </ul>
                        </div>
                    
                </div>

            </nav>
        </header>
    );
}

export default HeaderSection;
