import './weatherLoading.css';

const WeatherLoading = () => {
    return (
         <div className="main-section">
              <section className="current-weather "> 
      
                <article className="main-weather main-weather-loader">
                  <div className="loading-circle-loader">
                    <span className='circle-loader-1' ></span>
                    <span className='circle-loader-2' ></span>
                    <span className='circle-loader-3' ></span>
                  </div>       
                    <p>Loading...</p>
                </article>                     
                <section className="additional-info">
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Feels Like</p>
                        <span>-</span>
                    </article> 
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Humidity</p>
                        <span>-</span>
                    </article>
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Wind</p>
                        <span>-</span>
                    </article> 
                    <article className="bg-neutral-800 animation-fade-in">
                        <p>Precipitation</p>
                        <span>-</span>
                    </article>    
                </section>           
      
      
      
               </section>  

                 <div className="hourly-forecast-article">
                                               <div className="hourly-specific-day">
                                                   <h3>Hourly forecast</h3>
                                                   <div className="hourly-day-selector">
                                                       <button 
                                                           className='btn-specific-day'
                                                       >
                                                           
                                                       </button>
                                                       
                                                           <ul  className="hourly-days-dropdown" >
                                                           
                                                               {Array.from({length: 7})?.map((date, index) => {
                                                                   return (
                                                                       <li key={index}>
                                                                       </li>
                                                                   );
                                                               })}
                                                           </ul>
                                                       
                                                   </div>
                                               </div>
                                               <div className='hourly-items-content'>
                                               <ul className="hourly-items">               
                                                    {Array.from({ length: 7 }).map((_, index) => (
                                                    <li key={index} className="hour-specific">
                                                        <div>
                                                        <picture className="hour-specific-picture"></picture>
                                                        <span></span>
                                                        </div>
                                                        <span></span>
                                                    </li>
                                                    ))}

                                               </ul>
                                               </div>
                                           </div>


                        <div className="daily-forecast-article">
                                <h3>Daily forecast</h3>
                                <div className="daily-items">
                            
                                    {Array.from({ length: 7 }).map((date, index) => {
                                    
                                        return (
                                            <div key={index} className="day-specific animation-daily">
                                               
                                            </div>
                                        );
                                    })}
                                </div>
                        </div>
                    </div>
    );
}


export default WeatherLoading;
