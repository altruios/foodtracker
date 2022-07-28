import { Schema, model, connect,Mixed, Mongoose} from 'mongoose';
import {Meal,Product,Report,ReportItem,Nutriments} from './interface' 
import conn from './.config'

const mealSchema = new Schema<Meal>({
    code: { type: String, required: true },
    product: { type: {} as any, required: true },
    time_stamp: {type:Date, required: true}
  });

const reportItemSchema = new Schema<ReportItem>({
    label:{type:String,required:true},
    total:{type:Number,required:false},
    unit:{type:String,required:false},
    value:{type:Number,required:false},

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
        console.log(n,"is n")
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
    console.log(data.result,"is result");
    const totals = data.result.reduce((acc:any,x:any)=>{
        const n = x.product.nutriments;
        const values_array=[
            {"calcium":[
                n.calcium||0,
                n.calcium_unit||"?",
                n.calcium_value||0]
            },
            {"carbohydrates":[
                n.carbohydrates||0,
                n.carbohydrates_unit||"?",
                n.carbohydrates_value||0]
            },
            {"fat":[
                n.fat||0,
                n.fat_unit||"?",
                n.fat_value||0]
            },
            {"fiber":[
                n.fiber||
                0,n.fiber_unit||"?",
                n.fiber_value||0]
            },
            {"iron":[
                n.iron||0,
                n.iron_unit||"?",
                n.iron_value||0]
            },
            {"potassium":[
                n.potassium||0,
                n.potassium_unit||"?",
                n.potassium_value||0]
            },
            {"proteins":[
                n.proteins||0,
                n.proteins_unit||"?",
                n.proteins_value||0]
            },
            {"salt":[n.salt||0,
                n.salt_unit||"?",
                n.salt_value||0]
            },
            {"saturated-fat":[
                n["saturated-fat"]||0,
                n['saturated-fat_unit']||"",
                n["saturated-fat_value"]||0]
            },
            {"sodium":[
                n.sodium||0,
                n.sodium_unit||"",
                n.sodium_value||0]
            },
            {"sugars":[
                n.sugars||0,
                n.sugars_unit||"",
                n.sugars_value||0]
            },
        ]
        values_array.forEach(nutr=>{
            console.log(nutr,"is nutr")
            const key:string = Object.keys(nutr)[0]
            const values:any= Object.values(nutr)[0]
            console.log(values[0],"is vlaues");
            console.log(key,"is key");
            if(!acc[key]){
                console.log("no ",key,"in return yet")
                acc[key]=values
            }else{
                console.log("else")
                console.log(acc[key])
                const merged = values.map((x:any,i:number)=>{
                    if(i%2==0&&i!=0){
                        console.log(x,i,"is x", acc[key],"is acc key",x+acc[key],"is result");
                        return x+acc[key][i]

                    }
                    console.log("x,acci",x,acc[key][i])
                    return x
                })
                acc[key]=merged
            }
        })
        return acc;
        },{}
    )
    console.log(totals,"is totals");
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
        if(result.length==0){ 
            console.error("no report to make");
            return
        }   
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