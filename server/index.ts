import { Request, Response } from "express"
import express from 'express'
import {Meal,Product,Report} from './interface' 
import {importMeal,
    Report_maker,
    connDb,
    get_date_filter,
    exportReport,
    mealModel} from './models'
const app = express()
const port:number = 5000
import cors from 'cors'
app.use(cors())
app.use(express.json());
app.get('/', (req:Request, res:Response) => {
   console.log("got root")
})
app.post('/get_report', async (req:Request, res:Response) => {
    console.log("heard");
    const then:Date = req.body.then;
    const now:Date = req.body.now;
    const dateFilter = get_date_filter(then,now);

    const report = await mealModel.find(dateFilter)
    const r_now:Date = new Date()
    console.log(report,"is report")
    res.send(exportReport({report_type:"day",result:[...report],now:r_now}))    

})

app.post('/input', (req:Request, res:Response) => {
    const status = {status:"failure"};

    try{
    const d:any = req.body;
    importMeal(d)
    console.log("success!")
    status.status="success"
    res.send(status)
    }
    catch{
        res.send(status)
    }
})

const one_day:number = 1000*60*60*24
const one_week:number = one_day*7;
const one_fortnight:number = one_week*2;


connDb().then(async (DB) => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })         
    setInterval(()=>{Report_maker(1,DB)},one_day)
    setInterval(()=>{Report_maker(7,DB)},one_week)
    setInterval(()=>{Report_maker(14,DB)},one_fortnight)

},(err)=>{
    console.log("error hit")
    console.log(err);
});