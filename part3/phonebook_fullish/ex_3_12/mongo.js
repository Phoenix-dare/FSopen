const mongoose = require('mongoose')

if (process.argv.length <5) {
  console.log('usage :node mongo.js <password> <name> <number> as  arguments separated by space(use " " to enclose any white spaces present in between)')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


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
  
  Person
  .find({})
  .then(persons=> {
    const details=persons.map(items =>`${items.name} : ${items.number}`)
    console.log('Phonebook:' ,details)
    return mongoose.connection.close()
  })