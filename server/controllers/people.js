const People = require('../models/People.js')

exports.getPeople = (req, res) => {
    
    People.find()
    .then(data => {
        
        res.send(data)
    })
}

exports.addPeople = (req, res) => {

    const Person = new People({
        name: req.body.name,
        DOB: req.body.DOB
    })

    Person.save()
    .then(data => {
        res.send(data)
    })
}