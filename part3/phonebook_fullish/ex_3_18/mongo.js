const mongoose = require('mongoose')

password=process.argv[2]
const url = `mongodb+srv://sarath_sundaresan:${password}@cluster0.65sj8.mongodb.net/Phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number:String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name,
      number
    })

    return person.save()
  })
  .then(() => {
    console.log('Contact saved!')
  })
  .catch((err) => console.log(err))
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  