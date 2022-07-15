import React, { useState } from 'react';
import './DisplayNutriments.css';
function DisplayNutriments(props:any) {
    const nutriments = props.props?.product?.nutriments;
    console.log("tlevel",props)
    console.log("results are",nutriments)
    return (
        <div className="DisplayNutriments">
            <header className="DisplayNutriments-header">
                {props.props?.product.product_name}
            </header>
            <table className="DisplayNutrimentsTable">
                {nutriments?
                Object.entries(nutriments).map((x:any )=><tr><td>{x[0].slice(0,22)} {x[0].length>22?"...":""}</td><td>{Number(x[1])?x[1].toFixed(2):x[1]}</td></tr>)
                :null}
            </table>
        </div>
    );
}

export default DisplayNutriments;
