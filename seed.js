const axios = require("axios");
var Entry = require("./dataModel");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidmVuZXRhc3RlZmFub3ZhYUBnbWFpbC5jb20iLCJpYXQiOjE1NDk2NDM2MjJ9.giTNvsw7hxGAix4THRuAhDrkh5ilKQ1DeUTc_hs4UXA";
var eventsHeader = {
  headers: {
    Authorization: "Bearer " + accessToken
  }
};
function getEvent () {
    axios.get("https://opendata.hopefully.works/api/events", eventsHeader)
    .then(response=>{ 
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
  }

  module.exports.getEvent=getEvent;