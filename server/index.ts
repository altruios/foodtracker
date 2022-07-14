import { Request, Response } from "express"
import express from 'express'
import {Meal,Product} from './interface' 
import importMeal,{connDb} from './models'
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

//once a day - enter a summation entry into daily stats table
//writing it out here
/*
query the data for the day's range
reduce counts of vitamins calories and other interesting features


*/
connDb().then(async () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })  
});