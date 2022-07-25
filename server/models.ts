import { Schema, model, connect,Mixed, Mongoose} from 'mongoose';
import {Meal,Product,Report,ReportItem,Nutriments} from './interface' 
import conn from './.config'

const mealSchema = new Schema<Meal>({
    code: { type: String, required: true },
    product: { type: {} as any, required: true },
    time_stamp: {type:Date, required: true}
  });

const reportItemSchema = new Schema<ReportItem>({
    value:{type:Number,required:true},
    unit:{type:String,required:true},
    percentage:{type:String,required:true},
})

const ReportSchema = new Schema<Report>({
    type:String,
    calories: { type: Number, required: true },
    totals: [reportItemSchema],
    time:{type: Date, required: true}
  });

const ReportModel = model<Report>('Report',ReportSchema)
const mealModel = model<Meal>('Meal',mealSchema)
export {mealModel}
export {ReportModel}
export function get_date_filter (then:Date,now:Date){
    if(!now){
        now = new Date()
        now.setDate(now.getDate()+1)
    }
    if(!then){
        then = new Date()
        then.setDate(then.getDate()-1)
    }//then when?
    return {
        time: {
            $gt: ( now.toISOString()),
            $lt: ( then.toISOString())
        }
    }
}



const exportReport = (data:any)=>{
    console.log("data is",data);
    const calories:number = data.result.reduce((acc:number,x:Meal)=>{
        const n:Nutriments = x.product.nutriments;
        let add = 0;
        try{
            add=n['energy-kcal_serving']
        }
        catch(e){    
            add=n.energy
        }

        acc+=add
        return acc;
    },0)
    const totals = data.result.reduce((acc:any,x:any)=>{
        const nutriments = x.product.nutriments;
        console.log("n",nutriments)
        for(const kp in nutriments){
            console.log(kp,":kp")
            if(!acc.hasOwnProperty(kp))
                acc[kp]=nutriments[kp]
            if(typeof nutriments[kp]=="number")
                acc[kp]+=nutriments[kp]
            }
        
            return acc
        },{}
    )
    const r:Report= {
        type:data.report_type,
        calories,
        totals,
        time:data.now}
        return r;
}
export {exportReport}
export async function Report_maker(range:number,db:any){
    //get data from server
    const now:Date = new Date()
    const then:Date = new Date()
    then.setDate(now.getDate()-range);
    const dateFilter:any = get_date_filter(then,now);
    const report_type:string=range==1?"day":range==7?"week":"fortnight"
    db.collection("meals").find(dateFilter).toArray((err:Error,result:any)=>{
        if(err) throw err
        console.log(result);        
        const report:Report = exportReport({report_type,result,now})
        const r = new ReportModel(report)
        r.save()
    })
}
export async function importMeal(data:any){
    const meal:Meal= {
        code:data.code,
        product:data.product,
        time_stamp:new Date()
    }as Meal;


    const m = new mealModel(meal)
    await m.save()
    console.log(meal)

}



const connDb = () => {
    return connect(conn)
  };
  export { connDb };