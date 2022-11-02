const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('post-data',function(req,res){
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
const generateId = () => {
    const randomId = Math.floor(Math.random() * 10000000)

    return randomId

}

app.get('/api/info', (request, response) => {
    const current = Date()
    response.send(`<p>Phone book has info for ${persons.length} people</p>
    <p>${current}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons).end()
})
app.get('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)
    const foundPerson = persons.find(person => person.id === personId)
    return foundPerson ? response.status(200).json(foundPerson) : response.status(404).json({ 'message': 'Contact not found' }).end()
})

app.post('/api/notes', (request, response) => {
    const newPerson = request.body
    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'No contact information provided'
        })
    }else if (persons.some(person => person.name===newPerson.name)) {
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


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
