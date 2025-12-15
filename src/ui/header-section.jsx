import {iconsSystem} from '@/utils/iconsSystem';
import {IconSystem} from '@/utils/iconsSystemComponent';
import '@assets/style/header-section/header.css';
const HeaderSection = () => {
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
                        className="weather-options"
                        style={{ cursor: 'pointer' }}
                    >
                        <IconSystem
                            iconSrc={iconsSystem.iconUnits.src}
                            iconName={iconsSystem.iconUnits.name}
                            ClassNamePicture="nav-units-picture"
                            ClassNameImg="nav-units-img"
                        />
                        Units
                        <IconSystem
                            iconSrc={iconsSystem.iconDropdown.src}
                            iconName={iconsSystem.iconDropdown.name}
                            ClassNamePicture="nav-dropdown-picture"
                            ClassNameImg="nav-dropdown-img"
                        />
                    </div>
                    { (
                        <div className="options-menu-units">
                            <p>Temperature</p>
                            <ul className="menu">
                                <li>
                                    <button 
                                       
                                    >
                                        Celsius (°C)
                                    </button>
                                </li>
                                <li>
                                    <button 
                                       
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
                                      
                                       
                                    >
                                        km/h
                                    </button>
                                </li>
                                <li>
                                    <button 
                                     
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
                                      
                                    >
                                        Millimeters (mm)
                                    </button>
                                </li>
                                <li>
                                    <button
                                    
                                    
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
