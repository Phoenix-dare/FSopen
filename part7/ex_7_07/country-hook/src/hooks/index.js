import { useEffect,useState } from "axios"
import { axios } from 'axios'

export const useCountry = (name) => {
  const[countries,setCountries] = useState(null)
    
  const baseUrl=`https://restcountries.com/v3.1/name/${name}?fullText=true`

  useEffect( () =>{
  axios.get(baseUrl)
  .then(response => response.data[0])
  .then(data=>setCountries(data))
  .catch(error=>console.error(error))
    },[baseUrl])

return countries


}
