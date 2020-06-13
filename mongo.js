const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password, name and number as argument')
  process.exit(1)
}
else{
    const password = process.argv[2]
    const url =
    `mongodb+srv://fullstack:${password}@cluster0-w3zq6.mongodb.net/phonebook?retryWrites=true&w=majority`
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
      date: Date,
    })
    
    const Person = mongoose.model('Person', personSchema)

    if(process.argv.length == 3){
        Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
        })
    }
    else if(process.argv.length == 5){
        const addName = process.argv[3]
        const addNumber = process.argv[4]
    
        const person = new Person({
        name: addName,
        number: addNumber,
        })
    
        person.save().then(response => {
        console.log(`added ${addName} number ${addNumber} to phonebook`)
        mongoose.connection.close()
        })
    }



}