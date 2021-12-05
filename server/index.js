const mongoose = require('mongoose');
const app = require('./app.js')

let uri = '';

const start = () => {

    if(process.env.NODE_ENV != 'TEST') {
        console.log('not in TEST')

        //if docker is running 
        if (process.env.MONGO_DB_APP) {
            uri = process.env.MONGO_DB_APP
        } else {
            uri = 'mongodb://localhost:27017/monoAppDB' 
        }
    } else {
        console.log('TEST')
        
        //if docker is running 
        if (process.env.MONGO_DB_TEST) {
            uri = process.env.MONGO_DB_TEST
        } else {
            uri = 'mongodb://localhost:27017/monoTestDB'
        }
        
    }
    
    const PORT = process.env.PORT || 5000;

    //exports.connect = () => {
    console.log('PORT before connection', PORT)
    console.log('URI before connection ', uri)
    mongoose.connect(uri, {useNewUrlParser: true})
        .then(() => {
            console.log('mongo connected')
            app.listen(PORT, () => console.log('server is running'))
        })
        .catch(err => console.log(err)
    );  
    //}
}

start();
module.exports = start;