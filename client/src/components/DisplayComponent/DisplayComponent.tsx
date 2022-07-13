import React, { useState } from 'react';
import './DisplayComponent.css';
function DisplayComponent(props:any) {
    const nutriments = props.props?.product?.nutriments;
    console.log("tlevel",props)
    console.log("results are",nutriments)
    return (
        <div className="DisplayComponent">
            <header className="DisplayComponent-header">
                {props.props?.product.product_name}
            </header>
            <table className="DisplayComponentNutriments">
                {nutriments?
                Object.entries(nutriments).map((x:any )=><tr><td>{x[0]}</td><td>{x[1]}</td></tr>)
                :null}
                
                
                </table>
        </div>
    );
}

export default DisplayComponent;
