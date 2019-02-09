const express = require('express');
const app = express();
const port = 3000
const axios = require('axios');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidmVuZXRhc3RlZmFub3ZhYUBnbWFpbC5jb20iLCJpYXQiOjE1NDk2NDM2MjJ9.giTNvsw7hxGAix4THRuAhDrkh5ilKQ1DeUTc_hs4UXA";
var eventsHeader = {
    headers: {
      "Authorization":"Bearer " + accessToken
    } 
}

//database connection setup
var mongoDB = 'mongodb://mongo/sensors_data';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//Bind connection to error event (to get notification of connection errors)

// database schema
const dataEntrySchema = new mongoose.Schema({
  date: String,
  sensor1: Number,
  sensor2: Number,
  sensor3: Number,
  sensor4: Number
});

// Compile model from schema
var Entry = mongoose.model('SomeEntry', dataEntrySchema);

//gets the data from events API every 1h and save it to the database
setInterval(function() {
    axios.get("https://opendata.hopefully.works/api/events", eventsHeader)
    .then(response=>{ 
      console.log(response.data);
      //save the respose to DB
      new Entry({
        date: response.data.date,
        sensor1: response.data.sensor1,
        sensor2: response.data.sensor2,
        sensor3: response.data.sensor3,
        sensor4: response.data.sensor4
      }).save(function (error) {
        if (error){
          console.log(error)
        }
      });
    })
    .catch(error=>{
      console.log(error)
    })
},1000 * 60 * 60);
//},1000 * 60 * 60);

app.get('/sensors-data', (req,res)=>{
  Entry.find({}).exec(function(error, allEntries){
    if(error){
      console.log("didn't find anything :(");
    }
    else{
      res.json(allEntries)
    }
  })
})
app.listen(port, () => console.log(`The surver is running on port ${port}!`))