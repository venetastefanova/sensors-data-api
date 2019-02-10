const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
var Entry = require("./dataModel");

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidmVuZXRhc3RlZmFub3ZhYUBnbWFpbC5jb20iLCJpYXQiOjE1NDk2NDM2MjJ9.giTNvsw7hxGAix4THRuAhDrkh5ilKQ1DeUTc_hs4UXA";
var eventsHeader = {
  headers: {
    Authorization: "Bearer " + accessToken
  }
};

//gets the data from events API every 1h and save it to the database
setInterval(function() {
  axios.get("https://opendata.hopefully.works/api/events", eventsHeader)
    .then(response => {
      //save the respose to DB
      new Entry({
        date: response.data.date,
        sensor1: response.data.sensor1,
        sensor2: response.data.sensor2,
        sensor3: response.data.sensor3,
        sensor4: response.data.sensor4
      }).save(function(error) {
        if (error) {
          console.log(error);
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
}, 1000 * 60 * 60);

app.get("/sensors-data", (req, res) => {
  Entry.find({}).exec(function(error, allEntries) {
    if (error) {
      console.log("didn't find anything :(");
    } else {
      res.json(allEntries);
    }
  });
});
app.listen(port, () => console.log(`The surver is running on port ${port}!`));
