const express = require('express')
const app = express(); 
const peopleController = require('./controllers/people.js');

const cors = require('cors');

app.use(cors());

//const db = require('./index.js')
//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
//connect to db 
//db.connect();

//fake test function 
exports.dummy = (x,y) => {
    let z = x + y;
    return z
}

app.get('/api1/getAll', peopleController.getPeople)

app.post('/api1/add', peopleController.addPeople)

module.exports = app;