import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    const added = {
      name: newName
    }
    setPersons(persons.concat(added))
  }


  const inputName = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={inputName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <h3>
          Info
        </h3>
        {persons.map(item => <p key={item.name}>{item.name}</p>)}

      </div>
    </div>
  )
}

export default App