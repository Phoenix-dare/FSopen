const Weather = ({weather}) =>{
    if(weather) return (
       
         <div>
           <h2>Weather Info :{weather.name}</h2>
           <h3>Todays forecast:{weather.weather[0].main},{weather.weather[0].description}</h3>
           <div>Temperature {(weather.main.temp-273.15).toFixed(2)}°C</div>
           <img
             alt="weather icon"
             src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
           />
           <div>Wind speed {weather.wind.speed} m/s</div>
     </div>
     )
     
 
 }
 export default Weather;