const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello World!')
})
app.post('/input', (req, res) => {
    console.log("heard");
    console.log("req",req.body)
    //so... we pull out what we want
    //const data = format(req.body)
    //then we save the data to a DB.
    //model model would work well - mongo db - would not even need to reformat - just add timestamp basically?
})

//once a day - enter a summation entry into daily stats table
//writing it out here
/*
query the data for the day's range
reduce counts of vitamins calories and other interesting features


*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})