const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Person =require('./models/person')



const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post-data', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))



app.get('/api/info', (request, response) => {
    const current = Date()
    response.send(`<p>Phone book has info for ${persons.length} people</p>
    <p>${current}</p>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => response.json(persons))
})


app.get('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)
    const foundPerson = persons.find(person => person.id === personId)
    return foundPerson ? response.status(200).json(foundPerson) : response.status(404).json({ 'message': 'Contact not found' }).end()
})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'Contact information missing name/number'
        })

     }

    const contact = new Person({
        name:newPerson.name,
        number:newPerson.number
        
    }) 

    
    contact.save()
    .then(newContact=>response.status(201).json(newContact))
    .catch(error=>console.log(error.message))
})


app.delete('/api/persons/:id', (request, response) => {
    const personId = request.params.id
    Person.findByIdAndRemove(personId)
          .then(()=> response.status(204).json({ 'message': 'Contact deleted' }).end())
          .catch(error=>console.log(error.message))
}
        )    

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
