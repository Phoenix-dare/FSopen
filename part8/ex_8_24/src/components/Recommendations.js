import { useQuery } from "@apollo/client"
import { useState,useEffect } from 'react'
import { USER,ALL_BOOKS }from '../queries'

const Recommendations = (props) => {
    const user = useQuery(USER)
    const [favouriteGenre,setFavouiteGenre] = useState('')

    const books = useQuery(ALL_BOOKS,{variables:{genre:favouriteGenre}})

    useEffect(() => {
        if(user.data){
            setFavouiteGenre(user.data.me?.favouriteGenre)
        } 
    }, [user.data])
    

    
    if (!props.show) {
        return null
      }
    if (user.loading || books.loading)  {
        return <div>loading...</div>
      }
    return(
        <div>
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


export default Recommendations