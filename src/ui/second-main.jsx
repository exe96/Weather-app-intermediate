
import '@assets/style/second-main/second.css';
   const SecondMain = ({feelsLike, humidity, windSpeed, precipitation, units}) => {
    return (
        
              <section className="additional-info">
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Feels Like</p>
                        <span>{Math.round(feelsLike)}°</span>
                    </article> 
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Humidity</p>
                        <span>{humidity}%</span>
                    </article>
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Wind</p>
                        <span>{Math.round(windSpeed)} {units.wind_speed_10m === 'km/h' ? 'km/h' : 'mph'}</span>
                    </article> 
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Precipitation</p>
                        <span>{precipitation} {units.precipitation === 'mm' ? 'mm' : 'in'}</span>
                    </article>    
                </section>  
        
    );
   }
   
   export default SecondMain;
   