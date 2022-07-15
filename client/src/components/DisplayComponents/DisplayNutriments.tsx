import React, { useState } from 'react';
import './DisplayNutriments.css';
function DisplayNutriments(props:any) {
    console.log("tlevel",props)
    return (
        <div className="DisplayNutriments">
            <header className="DisplayNutriments-header">
                {props.calories}
            </header>
            <table className="DisplayNutrimentsTable">
                {
                Object.entries(props.totals).map((x:any )=><tr><td>{x[0].slice(0,22)} {x[0].length>22?"...":""}</td><td>{Number(x[1])?x[1].toFixed(2):x[1]}</td></tr>)
                }
            </table>
        </div>
    );

}

export default DisplayNutriments;
