const express = require('express')
const app = express(); 
const peopleController = require('./controllers/people.js');
const mongoose = require('mongoose');

const cors = require('cors');

//Because of different ports
app.use(cors());

//const db = require('./index.js')
//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
//connect to db 
//db.connect();


app.get('/api1/getAll', peopleController.getPeople)

app.post('/api1/add', peopleController.addPeople)

let uri = '';
const PORT = process.env.PORT || 5000;

if (process.env.MONGO_DB_APP) {
    //
    uri = process.env.MONGO_DB_APP
} else {
    //
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

