import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (e) => {
    e.preventDefault()
    const added = {
      name: newName,
      number: newNumber
    }
    if (persons.find(item => item.name === added.name)) {

      alert(`${newName} is already added to phonebook`)

    } else if (!newNumber) {

      alert("Please provide a phone number")

    } else {

      setPersons(persons.concat(added))
    }
  }


  const inputName = (e) => {
    setNewName(e.target.value)
  }
  const inputNumber = (e) => {
    setNewNumber(e.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={inputName} />
  
        </div>
        <div>
          number: <input value={newNumber} onChange={inputNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <h3>
          Info
        </h3>
        {persons.map(item => <p key={item.name}>{item.name}:{item.number}</p>)}

      </div>
    </div>
  )
}

export default App