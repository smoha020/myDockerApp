const express = require('express')
const app = express(); 
const peopleController = require('./controllers/people.js');
const mongoose = require('mongoose');

/*Because client and backend are communicating 
from different ports*/
const cors = require('cors');

app.use(cors());

//parses (formats) the data so we can use it
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/api1/getAll', peopleController.getPeople)

app.post('/api1/add', peopleController.addPeople)

let uri = '';
const PORT = process.env.PORT || 5000;

if (process.env.MONGO_DB_APP) {
    //when running Docker
    uri = process.env.MONGO_DB_APP
} else {
    //no Docker
    uri = 'mongodb://localhost:27017/monoAppDB' 
}

mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => {
        console.log('mongo connected')
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT)
        })
    })
    .catch(err => console.log(err)
);

