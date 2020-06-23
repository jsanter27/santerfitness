import React from 'react';
import { Alert } from 'react-bootstrap';

const SFAlert = (props) => {

    let variant;
    if (props.isEmergency === true){
        variant = "danger";
    }
    else {
        variant = "light";
    }

    return (
        <Alert className="sf-home-alert" variant={variant}>
            {props.message}
        </Alert>
    )
}

export default SFAlert;