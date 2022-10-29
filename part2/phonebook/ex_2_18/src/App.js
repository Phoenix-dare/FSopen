import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)



  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))

  }, [])


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
    const doesExist = persons.find(item => item.name === added.name)

    if (doesExist) {

      if (window.confirm(`${newName} is already added to phonebook.Do you want to replace old number with the new one`) && newNumber) {
        personService.update(doesExist.id, { ...added, number: newNumber })
          .then(updated => setPersons(
            persons.map((person) =>
              person.id !== doesExist.id ? person : updated
            )))
          .then(()=>{
            setMessage(`Updated contacts ${doesExist.name}:${newNumber}`)
            setNewName('')
            setNewNumber('')
          })
          .then(setTimeout(() => {
            setMessage(null);
          }, 4000))

          .catch(error => console.log(error))
      }

    } else if (!newNumber) {

      alert("Please provide a phone number")

    } else {
      personService.create(added)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(error))

    }
  }
  const [search, setSearch] = useState('')
  let regex = new RegExp(search, 'gi')



  const inputSearch = (e) => {
    setSearch(e.target.value)
  }
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from contacts`)) {
      personService
        .remove(id)
        .then(() => {
          const removePerson = persons.filter((person) => person.id !== id);
          setPersons(removePerson)
        })
        .then(setMessage(`Removed ${name} from contacts`))
        .then(setTimeout(() => {
          setMessage(null);
        }, 4000))
        .catch(error => console.log(error))

    }

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
      <Persons persons={persons} regex={regex} deleteUser={deleteUser} message={message} />
    </div>
  )
}

export default App