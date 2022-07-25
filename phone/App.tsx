import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity,Pressable, View,Image,ImageBackground} from 'react-native';
import { Keyboard } from 'react-native'
import {APICALL,BACKENDINPUT,BACKENDOUTPUT} from'./.config'
import btn from './assets/btn.png'

const DEFAULT_IMAGE = Image.resolveAssetSource(btn).uri;
export default function App() {
    const dummy_meal = {code:0,product:{product_name:"name of meal",images:[],nutriments:{energy:0,energy_unit:""}}}
    const dummy_image = {uri:DEFAULT_IMAGE}

    const [barcode,setBarcode] = useState("")
    const [meal,setMeal]=useState(dummy_meal)
    const [image_main,setImage_Main]=useState(dummy_image)
    const [image_ingredients,setImage_Ingredients]=useState(dummy_image)
    const [image_nutrition,setImage_Nutrition]=useState(dummy_image)
    const [totals,set_totals]=useState({calories:0})
    const [focus,set_focus]=useState({} as any)
    const handleInput=(bc:string)=>{
            if(bc.length>=12){
                console.log("barcode is", bc)
                const API:any = APICALL(bc)
                console.log(API)
                fetch(API)
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.status==0){
                            setMeal({...data,product:{product_name:"not found",images:[]}})
                            setImage_Main(dummy_image)
                            setImage_Ingredients(dummy_image)
                            setImage_Nutrition(dummy_image)
                        }
                        else{
                            const product=data.product;
                            console.log(Object.entries(data.product.nutriments))
                            setMeal(data)
                            const image_uri = parse_for_image_uri(product,"main")
                            const image_uri2 = parse_for_image_uri(product,"ingredients")
                            const image_uri3 = parse_for_image_uri(product,"nutrition")
                            
                            setImage_Main({uri:image_uri})
                            setImage_Ingredients({uri:image_uri2})
                            setImage_Nutrition({uri:image_uri3})
                        }
                    })
            }
            setBarcode(bc)
        
    }
    const submitMeal=(meal:any)=>{
        console.log("meal is: ",meal);
        const options ={
            method: 'POST',

            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(meal)
        }
        console.log("options are:")
        console.log(options);
        fetch(BACKENDINPUT,options)
            .then(res=>res.json())
            .then(data=>{
                data.status=="success"?handleClear():console.log(data)
                
            })



    }
    const fetch_day_report=()=>{
        const options:any = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }
        fetch(BACKENDOUTPUT, options)
        .then(r=>r.json())
        .then(res=>{set_totals(res)
            console.log("yay!")
            console.log(res);

        })
    }
    const handleClear=()=>{
        setBarcode("")
        setMeal(dummy_meal)
        setImage_Main(dummy_image);
        setImage_Ingredients(dummy_image);
        setImage_Nutrition(dummy_image);
    }
    useEffect(()=>{
        Keyboard.dismiss()
        fetch_day_report()
    },[])
    useEffect(()=>{
        fetch_day_report()
    },[image_main,image_ingredients,image_nutrition])
    const get_energy=(meal:any)=>{
        const n = meal.product.nutriments;
        let energy=0;
        let sucess=false;
        const key=['energy-kcal_serving','energy-kcal','energy']
        let i=0;
        while(!sucess){
            try{
                energy=n[key[i]]
                sucess=true;
                return energy;
                }catch(e){
                    i++
                    if(i>3){
                        return 0;
                    }
                }
            }
        }
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text>bc: {barcode}</Text>
            <View style={styles.rows}>

            <TextInput 
                onChangeText={barcode=>handleInput(barcode)} 
                value={barcode}
                autoFocus={true}
                style={styles.textinput}
                clearTextOnFocus={true}
                showSoftInputOnFocus={false}
                ref={ref=>set_focus(ref)}
                
            />
            <Pressable 
                onPress={handleClear}
                style={{...styles.button,backgroundColor:'#ff0'}} 
                >
                    <Text>clear</Text>
            </Pressable>
            </View>

        </View>
        <View style={styles.body}>
        <View style={styles.rows}>
        <View style={styles.body}>
            <Text>{meal?.product?.product_name}</Text>
        </View>
        <View style={{...styles.body,flex:10}}>
        <Text> total energy of meal: {get_energy(meal)} kcal</Text>
        <Text> total energy of day: {totals.calories} kcal</Text>
        </View>
        </View>
        <Image style={styles.image}source={image_main}/>        
        <Image style={styles.image}source={image_ingredients}/>        
        <Image style={styles.image}source={image_nutrition}/>        
        </View>

        <View style={styles.footer}>
            <TouchableOpacity
                    style={{display:'flex'}} 
                    onPress={()=>submitMeal(meal)}
       
            >
                <ImageBackground 
                    style={{...styles.image,zIndex:-1}}
                source={dummy_image}>
                                    <Text style={{marginBottom:20,fontSize:18,fontWeight:"bold"}}> submit</Text>

                </ImageBackground>

            </TouchableOpacity>
        </View>


    </View>
  );
}

const parse_for_image_uri=(product:any,type:string)=>{
    switch(type){
        case "main":
            return product.selected_images.front.display.fr||
            product.image_front_small_url||
            product.image_front_url || 
            product.image_url||""
        case "ingredients":
            return product.selected_images.ingredients.display.fr||
            product.image_ingredients_small_url||""
        case "nutrition":
            return product.selected_images.nutrition.display.fr||
            product.image_nutrition_small_url||
            "";

        }
    
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch',
        height:120,
        width:120,
        padding:5,
        margin:4,
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width:"100%",
    paddingLeft:10,
    margin:10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:25,
    width:"100%"

  },
  textinput: {
    backgroundColor: '#defede',
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:'90%',
    paddingStart:10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    padding:10,
    resizeMode: 'stretch',
    
  },
  header:{
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:150,
    width:'100%',
    padding:25
  },
  rows:{
    backgroundColor: '#fff',
    flexDirection:'row',
    
  }

});
