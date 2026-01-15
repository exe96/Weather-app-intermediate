
import '@assets/style/second-main/second.css';
   const SecondMain = ({feelsLike, humidity, windSpeed, precipitation, units}) => {
    
    const getWindUnit = () => {
        if(units.wind_speed_10m === 'km/h'){
            return 'km/h';
        }else if(units.wind_speed_10m === 'mp/h'){
            return 'mph';
        }else{
            return '-';
                            }
    }
    const getPrecipitationUnit = () => {
        if(units.precipitation === 'mm'){
            return 'mm';
        }else if(units.precipitation === 'inch'){
            return 'in';
        }else{
            return '-';
        }   
    }
    return (
        
              <section className="additional-info">
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Feels Like</p>
                        <span>{(Math.round(feelsLike))}°</span>
                    </article> 
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Humidity</p>
                        <span>{humidity}%</span>
                    </article>
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Wind</p>
                        <span>{Math.round(windSpeed)} {getWindUnit()}</span>
                    </article> 
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Precipitation</p>
                        <span>{precipitation} {getPrecipitationUnit()}</span>
                    </article>    
                </section>  
        
    );
   }
   
   export default SecondMain;
   