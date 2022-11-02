const express = require('express')
const app = express()

app.use(express.json())

const persons = [
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

app.get('/api/info', (request, response) => {
    const current= Date()
    response.send(`<p>Phone book has info for ${persons.length} people</p>
    <p>${current}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const personId =Number(request.params.id) 
    const foundPerson = persons.find(person => person.id===personId)
    return foundPerson ? response.status(200).json(foundPerson) : response.status(404).json({'message':'User not found'}).end
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
