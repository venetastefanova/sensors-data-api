const mongoose = require("mongoose");

//database connection setup
var mongoDB = "mongodb://mongo/sensors_data";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Bind connection to error event (to get notification of connection errors)

// database schema
const dataEntrySchema = new mongoose.Schema({
  date: String,
  sensor1: Number,
  sensor2: Number,
  sensor3: Number,
  sensor4: Number
});

// Compile model from schema
module.exports=mongoose.model("SomeEntry", dataEntrySchema);
