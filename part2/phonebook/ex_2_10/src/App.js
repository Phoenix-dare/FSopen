import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'


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
      <Filter inputSearch={inputSearch} />
      <ContactForm 
          addContact={addContact} 
          inputName={inputName} 
          inputNumber={inputNumber} 
          newName={newName} 
          newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} regex={regex} />
      </div>
  )
}

export default App