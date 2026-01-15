
const SectionMain = ({city,department,country,formattedDate,iconWeather,temperature}) => {
    return (
            
                <article className="main-weather">
                    <div>
                        <h2 className="main-weather-h2">{city}{/*, {department} */}, {country}</h2>    
                        <p className="main-weather-date-p">{formattedDate}</p>
                    </div>
                    <div className="weather-temp">
                        <picture className="weather-temp-picture">
                            <img src={iconWeather.url} alt={iconWeather.name} />
                        </picture>
                        <p>{Math.round(temperature)}°</p> 
                    </div>
                </article>   
    


    );
}

export default SectionMain;
