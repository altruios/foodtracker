import { Request, Response } from "express"
import express from 'express'
import {Meal,Product,Report} from './interface' 
import {importMeal,
    Report_maker,
    connDb,
    get_date_filter,
    exportReport} from './models'
const app = express()
const port:number = 5000
import cors from 'cors'
app.use(cors())
app.use(express.json());
let _db_ref:any;
app.get('/', (req:Request, res:Response) => {
    const now:Date = new Date()
    const then:Date = new Date()
    then.setDate(now.getDate()-1);    
    const dateFilter = get_date_filter(then,now);
    _db_ref.collection("meals").find(dateFilter).toArray((err:Error,result:any)=>{
        if(err)throw err;
        console.log("daily")
        res.send(exportReport({report_type:"day",result,now}))    
    })
    
})
app.post('/get_report"', (req:Request, res:Response) => {
    console.log("heard");
    const then:Date = req.body.then;
    const now:Date = req.body.now;
    const dateFilter = get_date_filter(then,now);
    _db_ref.collection("meals").find(dateFilter).toArray((err:Error,result:any)=>{
        if(err)throw err;
        const r_now:Date = new Date()
        res.send(exportReport({report_type:"day",result,now:r_now}))    

    })
})

app.post('/input', (req:Request, res:Response) => {
    console.log("heard");
    const d:any = req.body;
    exportReport(d)

})

const one_day:number = 1000*60*60*24
const one_week:number = one_day*7;
const one_fortnight:number = one_week*2;


connDb().then(async (DB) => {
    _db_ref=DB;
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