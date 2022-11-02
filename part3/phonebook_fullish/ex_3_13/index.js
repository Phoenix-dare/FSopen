const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post-data', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

//// mongoose -mongodb connection



const url = process.env.MONGO_URI

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')
    }).catch(error => console.log(error.message))



personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

////

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
            error: 'No contact information provided'
        })
    } else if (persons.some(person => person.name === newPerson.name)) {
        return response.status(400).json({
            error: 'Name already added to phonebook'
        })
    }

    const contact = {
        ...newPerson,
        id: generateId(),
    }

    persons = persons.concat(contact)
    return response.status(201).json(persons).end()
})


app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)
    persons = persons.filter(person => person.id !== personId)
    return response.status(204).json({ 'message': 'Contact deleted' }).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
