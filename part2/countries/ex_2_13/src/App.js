import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [countries, getCountries] = useState([])
  const [search, setSearch] = useState('')
  const [isHidden, setHidden] = useState(true)
  const [info, setInfo] = useState()
  const searchRegex = new RegExp(search, "gi")

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => getCountries([...res.data]))
      .catch(err => console.error(err))
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const showDetails = (item) => {
    setHidden(false)
    setInfo(item)

  }
  const results = countries.filter(country => searchRegex.test(country.name.common))

  const CountryInfo = ({ info }) => {

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
      </div>

    )

  }
  const SearchResult = () => {

    if (!search) {
      return <p>Please enter a keyword to search</p>
    } else if (results.length > 10) {
      return <p>Too many matches,specify another filter</p>
    } else if (results.length === 1) {

      return <CountryInfo info={results[0]} />

    } else {
      return (
        <>
          {results.map(item =>
            <div key={item.name.common}>
              <p>{item.name.common}</p>
              <button onClick={() => showDetails(item)
              }>show more info</button>
            </div>)}
          {
            !isHidden && <div>
              <CountryInfo info={info} />
              <button onClick={() => setHidden(true)} >show less</button>

            </div>}

        </>


      )
    }
  }



  return (
    <div className="App">
      <div id="search">
        Find countries<input onChange={handleSearch} />
      </div>

      <SearchResult />

    </div>
  );
}

export default App;
