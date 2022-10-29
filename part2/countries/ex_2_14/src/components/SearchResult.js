import { useState } from 'react';
import CountryInfo from "./CountryInfo"

const SearchResult = ({ countries,search }) => {
    const [isHidden, setHidden] = useState(true)
    const [info, setInfo] = useState()
    const searchRegex = new RegExp(search, "gi")
    
    
    
    const showDetails = (item) => {
        setHidden(false)
        setInfo(item)

    }
    const results = countries.filter(country => searchRegex.test(country.name.common))



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
export default SearchResult;