import { useState, useEffect } from 'react';
import axios from 'axios'
import SearchResult from './components/SearchResult';
import SearchField from './components/SearchField';

function App() {
  const [countries, getCountries] = useState([])
  const [search, setSearch] = useState('')


  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => getCountries([...res.data]))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="App">
      <SearchField handleSearch={handleSearch} />
      <SearchResult
        search={search}
        countries={countries} />
    </div>
  );
}

export default App;
