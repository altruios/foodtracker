import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputComponent from './components/InputComponent/InputComponent';
import DisplayComponent from './components/DisplayComponent/DisplayComponent'
function App() {
    
    const [barcode,setBarcode] = useState("")
    const [json_data,setJson_data]=useState()
    const handleChange = (e: any) => {
            setBarcode(e.target.value);
        }
    const handleSubmit = (e:any)=>{
        if(e.code ==="Enter"){
            console.log("barcode is",barcode)
            fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
            .then((data)=>data.json())
            .then((d:any)=>setJson_data(d))
        }
    }
    useEffect(()=>{
        console.log("data changed",json_data)
    },[json_data])
  return (
    <div className="App">
      <header className="App-header">
        food tracker
      </header>
      <InputComponent props={{handleChange,handleSubmit,barcode}} 
      />
      <DisplayComponent props={json_data} />
    </div>
  );
}

export default App;
