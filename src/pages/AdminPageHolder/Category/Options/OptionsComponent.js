import React, { useState } from 'react';
import ParentCategoryService from '../../../../components/Services/ParentCategory/ParentCategoryService';
import EditOrder from '../../Order/EditOrder';
import DeleteView from '../Delete/DeleteView';
import Edit from '../Edit/Edit';
import './OptionsComponent.css';

const OptionsComponent = ({ data, index, reloadReconrds, service, show, allStatuses }) => {
    const [editButton, setEditButton] = useState(false);
    const [deleteButton, setDeleteButton] = useState(false);
        
        const activateEditPopUp = () => {
            setEditButton(!editButton);                        
        }

        const activateDeletePopUp = () => {
            setDeleteButton(!deleteButton);                        
        }

        const setDeleteBtn = () => {
            setDeleteButton(!deleteButton);
        }

        if (show === "orders") {
            return <tr key={index}>
            <td id="hide-on-mobile">
                {data?.client.userName}
            </td>
            <td id="hide-on-mobile">
                <label>Country: </label>
                {data?.orderContact?.country}
                <br />

                <label>City:</label>
                {data?.orderContact?.city}
                <br />

                <label>Address location:</label>
                {data?.orderContact?.deliveryAddress}
                <br />
                
                <label>Full name:</label>
                {data?.orderContact?.firstName + " " + data?.orderContact?.lastName}
                <br />

                <label>Phone number</label>
                {data?.orderContact?.phoneNumber}
                <br />

                <label>Email</label>
                {data?.orderContact?.email}

            </td>
                
            <td id="hide-on-mobile">
            <input type="checkbox" defaultChecked={data?.isActive}/>
            </td>

            <td id="hide-on-mobile">
            <input type="checkbox" defaultChecked={data?.isDeleted}/>
            </td>

            <td id="hide-on-mobile">
                {data?.orderStatuses?.statusName}
            </td>

            <td id="hide-on-mobile">
                {new Date(data?.createdAt).toLocaleString()}
            </td>
            <td id="hide-on-mobile">
                {data?.createdBy?.email}
            </td>
            <td id="hide-on-mobile">
                {new Date(data?.modifiedAt).toLocaleString()}
            </td>
            <td id="hide-on-mobile">
                {data?.modifiedBy?.email}
            </td>
            
        <td>
            {EditOrder && editButton ?
            <EditOrder 
            reloadReconrds={reloadReconrds}
            id={data.id}
            isActive={data?.isActive}
            service={service}
            allStatuses={allStatuses}
            />
            :
        editButton ? 
                <Edit 
                reloadReconrds={reloadReconrds}
                id={data.id}
                name={data?.name}
                description={data?.description}
                imageUrls={data?.imageUrl}
                quantityInStock={data?.quantityInStock}
                price={data?.price}
                isActive={data?.isActive}
                isDeleted={data?.isDeleted}
                service={service}
                show={show}
                />
            : null}

        {deleteButton ? 
            <DeleteView 
            setDeleteButton={setDeleteButton}
            reloadReconrds={reloadReconrds}
            id={data.id}
            service={service}
            />
        : null}
        </td>

        <td className="d-flex">
            <button onClick={activateEditPopUp} className="btn btn-outline-primary">Edit</button>
            <button onClick={activateDeletePopUp} className="btn btn-outline-danger ml-2">Delete</button>
             <br />
        </td>
        
            </tr>
        }

        return (
            <tr key={index}>
        <td id="hide-on-mobile">
            {data?.name}
        </td>

        <td id="hide-on-mobile">
            {data?.description}
        </td>
        
        {show ?
            <td id="hide-on-mobile">
                <img className="admin-product-image" src={data?.imageUrl} />
            </td>
        : null}

        {show ?
            <td id="hide-on-mobile">
                {data?.quantityInStock}
            </td>
        : null}

        {show ?
            <td id="hide-on-mobile">
                {data?.price}
            </td>
        : null}

        <td id="hide-on-mobile">
           <input type="checkbox" defaultChecked={data?.isActive}/>
        </td>

        <td id="hide-on-mobile">
           <input type="checkbox" defaultChecked={data?.isDeleted}/>
        </td>
        
        <td id="hide-on-mobile">
            {new Date(data?.createdAt).toLocaleString()}
        </td>
        
        <td id="hide-on-mobile">
            {data?.createdBy?.email}
        </td>

        <td id="hide-on-mobile">
            {new Date(data?.modifiedAt).toLocaleString()}
        </td>
        
        <td id="hide-on-mobile">
            {data?.modifiedBy?.email}
        </td>

        <td>
        {editButton ? 
                <Edit 
                reloadReconrds={reloadReconrds}
                id={data.id}
                name={data?.name}
                description={data?.description}
                imageUrls={data?.imageUrl}
                quantityInStock={data?.quantityInStock}
                price={data?.price}
                isActive={data?.isActive}
                isDeleted={data?.isDeleted}
                service={service}
                show={show}
                />
            : null}

        {deleteButton ? 
            <DeleteView 
            setDeleteButton={setDeleteButton}
            reloadReconrds={reloadReconrds}
            id={data.id}
            service={service}
            />
        : null}
        </td>

        <td className="d-flex">
            <button onClick={activateEditPopUp} className="btn btn-outline-primary">Edit</button>
            <button onClick={activateDeletePopUp} className="btn btn-outline-danger ml-2">Delete</button>
             <br />
        </td>
        
     </tr>
    )
}

export default OptionsComponent;