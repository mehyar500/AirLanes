/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let MONGODB_URI;

const MONGO_LOCAL_URL = 'mongodb://localhost/airlane'

// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
mongoose.connect(process.env.MONGODB_URI || MONGO_LOCAL_URL, { useMongoClient: true });


// should mongoose.connection be put in the call back of mongoose.connect???
const db = mongoose.connection
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once("open", () => {
  console.log(`You have successfully connected to your mongo database: ${MONGODB_URI || MONGO_LOCAL_URL}`);
});

module.exports = db
