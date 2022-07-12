import React from 'react';
import './InputComponent.css';
function InputComponent(props:any) {
    console.log("props are ",props);
    
    return (
        <div className="InputComponent">
            <header className="InputComponent-header">
                scan
            </header>
            <input autoFocus 
                onChange={props.props.handleChange} 
                value={props.props.barcode} 
                onKeyDown={props.props.handleSubmit}
          />
        </div>
    );
}

export default InputComponent;
