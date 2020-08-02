const mongoose = require('mongoose');

const URL = process.env.MONGO_DB_URI;

const connectDB = async() => {
  mongoose.connect(URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true }, (err) =>{
      if (err) {
        console.log(`Unable to connect to the database: ${err}`)
    } else {
        console.log(`Connected to the Database`);
    }
    });
}

module.exports = connectDB;