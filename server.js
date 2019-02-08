const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
// var tokenUrl = "https://opendata.hopefully.works/api/signup";
// var requestTokenUser = {
//   "email": "venetastefanovaa@gmail.com", 
//   "password": "cookieDough*"
// }
// var requestTokenHeaders ={
//     headers: {
//       "Content-type": "application/json"
//     } 
// }

//register and gets a token
// axios.post(tokenUrl,requestTokenUser, requestTokenHeaders)
//   .then(response => {
//     console.log(response);   
//   })
//   .catch(error => {
//     console.log(error);
// });

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidmVuZXRhc3RlZmFub3ZhYUBnbWFpbC5jb20iLCJpYXQiOjE1NDk2NDM2MjJ9.giTNvsw7hxGAix4THRuAhDrkh5ilKQ1DeUTc_hs4UXA";
var eventsHeader = {
    headers: {
      "Authorization":"Bearer " + accessToken
    } 
}

//gets the data from events API every 1h
setInterval(function() {
    axios.get("https://opendata.hopefully.works/api/events", eventsHeader)
    .then(response=>{
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error)
    })
},1000 * 60 * 60);


app.get('/', (req, res) => res.send('working!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))