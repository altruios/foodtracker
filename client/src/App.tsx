import React, { useEffect, useState } from 'react';
import './App.css';
import InputComponent from './components/InputComponent/InputComponent';
import DisplayComponent from './components/DisplayComponents/DisplayNutriments'
import {APICALL,BACKENDINPUT,BACKENDOUTPUT} from './.config'
function App() {

    const [barcode, setBarcode] = useState("")
    const [has_submitted,set_has_submitted] = useState(true)
    const temp:any = {totals:[]}
    const [json_data, setJson_data] = useState(temp)
    const handleChange = (e: any) => {
        setBarcode(e.target.value);
    }
    const handle_json = (d: any) => {
        const options:any = {
                method: 'POST',

                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(d)
        }
        fetch(BACKENDINPUT, options).then(r=>r.json()).then(res=>console.log(res))
    }
    const handleSubmit = (e: any) => {
        if (e.code === "Enter") {
            console.log("barcode is", barcode)
            const API:any = APICALL(barcode)
            fetch(API)
                .then((data) => data.json())
                .then((d: any) => handle_json(d))
                .then(()=> set_has_submitted(prev=>!prev))
        }
    }
    useEffect(() => {
        console.log("data changed", json_data)
        const options:any = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }
        fetch(BACKENDOUTPUT, options)
        .then(r=>r.json())
        .then(res=>{setJson_data(res)
            console.log("yay!")
            console.log(res);
        })

    }, [has_submitted])
    return (
        <div className="App">
            <header className="App-header">
                food tracker
            </header>
            <InputComponent props={{ handleChange, handleSubmit, barcode }}
            />
            <DisplayComponent totals={json_data.totals} calories={json_data.calories}/>
        </div>
    );
}

export default App;
