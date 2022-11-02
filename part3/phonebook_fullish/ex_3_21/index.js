const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')



const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post-data', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))



app.get('/api/info', (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.send(
        `<p>Phonebook has info for ${person.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => response.status(200).json(persons).end())
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  Person.findById(personId)
    .then(person => {
      if (person) {
        response.status(200).json(person).end()
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
const newPerson = request.body
 
if (!newPerson.name || !newPerson.number) {
    return response.status(400).json({
      error: 'Contact information missing name/number'
    })

  }
  

  const contact = new Person({
    name: newPerson.name,
    number: newPerson.number

  })


  contact.save()
    .then(newContact => response.status(201).json(newContact))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  const { name, number } = request.body
  const contact = {
    name: name,
    number: number

  }

  Person.findByIdAndUpdate(personId, contact, { new: true, runValidators: true, context: 'query' })
    .then(person => {
      if (person) {
        response.status(200).json(person).end()
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id
  Person.findByIdAndRemove(personId)
    .then(() => response.status(204).json({ 'message': 'Contact deleted' }).end())
    .catch(error => next(error))
}
)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'MongoServerError'){
    return response.status(403).send({error:'User already exists'})
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}



app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
