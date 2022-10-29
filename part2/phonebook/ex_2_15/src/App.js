import { useState,useEffect } from 'react'
import axios  from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(res=>setPersons(res.data))

  },[])


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
      axios.post('http://localhost:3001/persons', added)
      .then(response => {
          setPersons(persons.concat(response.data))
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