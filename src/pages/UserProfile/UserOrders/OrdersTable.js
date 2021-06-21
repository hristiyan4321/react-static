import React from 'react'
import { useHistory } from 'react-router'

const OrdersTable = ({ data, index, padding}) => {
    const history = useHistory();

    const viewOrderProducts = () => {
        history.push(`/orderProducts?id=${data?.id}`);
    }

    return (
        <tr key={index} className="page-item" onClick={viewOrderProducts}>
        <td>
            <label className={padding}>Country:</label>
                {data?.orderContact?.country}, 

                <label className={padding}>City:</label>
                {data?.orderContact?.city}, 

                <label className={padding}>Address location:</label>
                {data?.orderContact?.deliveryAddress}, 

                <label className={padding}>Phone number:</label>
                {data?.orderContact?.phoneNumber}, 
                
                <label className={padding}>Email:</label>
                {data?.orderContact?.email}
        </td>
        <td>
                {data?.orderStatuses?.statusName}, 
        </td>
        <td>
                {data?.totalPrice} $, 
        </td>
        <td>
            <button onClick={viewOrderProducts} className="btn btn-outline-primary">View items</button>
        </td>
    </tr>
    )
}

export default OrdersTable;