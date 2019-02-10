const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
var Entry = require("./dataModel");
var feedDB = require("./seed");

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//feet the db on server start
feedDB.getEvent();

//gets the data from events API every 1h and save it to the database
setInterval(function() {
  feedDB.getEvent();
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
