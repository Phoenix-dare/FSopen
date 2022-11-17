import { ADD_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
  
  
const Authors = (props) => {
  const [name,setName] = useState('')
  const [year,setYear]= useState('')

const authors = useQuery(ALL_AUTHORS)
const [ updateYear ] = useMutation(ADD_YEAR,{refetchQueries: [ { query: ALL_AUTHORS} ] })

const handleYears= (e) =>{
  e.preventDefault()
  updateYear({variables:{ name, year}})
  setName('')
  setYear('')

}

  if (!props.show) {
    return null
  }
  if (authors.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set BirthYear</h3>
        <form onSubmit={handleYears}>
          <select onChange={({target}) => setName((target.value))}>
          {authors.data?.allAuthors.map((a) =>(
          <option key={a.name} value={a.name} >{a.name} </option> )

          )}
          </select>
          <input value={year} type="number" onChange={({target}) => setYear(parseInt(target.value))} />
          <button type='submit'>
            update
            </button>     
            </form>
      </div>
    </div>
  )
}

export default Authors
