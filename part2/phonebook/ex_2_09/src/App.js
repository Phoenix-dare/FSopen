import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  )

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const inputName = (e) => {
    setNewName(e.target.value)
  }
  const inputNumber = (e) => {
    setNewNumber(e.target.value)

  }

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
  const [search, setSearch] = useState('')
  let regex = new RegExp(search, "gi")



  const inputSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <span>
          Filter by : <input onChange={inputSearch} />

        </span>
      </div>
      <form onSubmit={addContact}>
        <h3>Add new contact</h3>
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
        {
          persons.filter(item => regex.test(item.name))
            .map(item => <p key={item.name}>{item.name}:{item.number}</p>)

        }

      </div>
    </div>
  )
}

export default App