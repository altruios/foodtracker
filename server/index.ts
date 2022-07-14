import { Request, Response } from "express"
import express from 'express'
import {Meal,Product} from './interface' 
import {importMeal,Report_maker,connDb} from './models'
const app = express()
const port:number = 5000
import cors from 'cors'
app.use(cors())
app.use(express.json());

app.get('/', (req:Request, res:Response) => {

    res.send('Hello World!')
})
app.post('/input', (req:Request, res:Response) => {
    console.log("heard");
    const d:any = req.body;
    importMeal(d)

})
const one_day:number = 1000*60*60*24
const one_week:number = one_day*7;
const one_fortnight:number = one_week*2;
const one_octnight:number = one_fortnight*2;
const one_year:number = one_day *365


//once a day - enter a summation entry into daily stats table
//writing it out here
/*
query the data for the day's range
reduce counts of vitamins calories and other interesting features


*/
connDb().then(async (DB) => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })         
    setInterval(()=>{Report_maker(1,DB)},one_day)
    setInterval(()=>{Report_maker(7,DB)},one_week)
    setInterval(()=>{Report_maker(14,DB)},one_fortnight)
    setInterval(()=>{Report_maker(28,DB)},one_octnight)
    setInterval(()=>{Report_maker(365,DB)},one_year)

});