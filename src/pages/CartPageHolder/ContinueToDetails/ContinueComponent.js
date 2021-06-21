import React from 'react';
import { useHistory } from 'react-router';

const ContinueComponent = ({ subTotal }) => {
    const history = useHistory();

    const continueToPurchase = () => {
        history.push('/deliverydetails')
    }
        
    return <div className="parent-continue">

        <button onClick={continueToPurchase} className="btn button__remove m-auto btn-primary">Continue to checkout {subTotal} $</button>    
    </div> 
}

export default ContinueComponent;