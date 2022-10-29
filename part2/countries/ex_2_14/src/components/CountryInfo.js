import { useState, useEffect } from 'react';
import axios from 'axios'
import Weather from "./Weather"

const CountryInfo = ({ info }) => {
    const [weather,setWeather]=useState()
    const api_key = process.env.REACT_APP_API_KEY
  
      
      useEffect (() => {
          const url=`https://api.openweathermap.org/data/2.5/weather?q=${info.capital[0]}&appid=${api_key}`
        console.log(info.capital[0],api_key);
          axios.get(url)
          .then(res => setWeather(res.data))
          .catch(err => console.error(err))
    
        },[])
      
          
  
      return (
        <div>
          <h2>{info.name.common}</h2>
          <p>
            <span>capital : {info.capital[0]}</span><br></br>
            <span>area : {info.area}</span>
          </p>
          <h3>languages</h3>
          <div>{Object.values(info.languages)
            .map(items =>
              <ul key={items}>
                <li>{items}</li>
              </ul>)}
          </div>
          <img alt="flag" src={info.flags.png} />
        <Weather  weather={weather} />
  
        </div>
  
      )
  
    }
    export default CountryInfo;