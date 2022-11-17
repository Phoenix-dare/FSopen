import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre,setGenre]=useState("")
  
  
  const books = useQuery(ALL_BOOKS,{variables:{genre:genre}})
  const genres = useQuery(ALL_BOOKS)

  const getGenres = genres.data?.allBooks.flatMap(book=> book.genres)
  const availableGenres= getGenres?.filter((item,index) => getGenres.indexOf(item) ===index)

                                        
                                        
  if (!props.show) {
    return null
  }
  if (books.loading)  {
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>books</h2>
      <label>filter by genre : {' '}</label>
      <select onChange={({target}) => {
      setGenre((target.value))
}}>
        <option value=""> All </option>
        {availableGenres?.map(genres=>
        <option key= {genres} value={genres}>{genres}</option>
)}
      </select>
  

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data?.allBooks.map((a) =>
           (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author? a.author.name : null}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
  )
}

export default Books
