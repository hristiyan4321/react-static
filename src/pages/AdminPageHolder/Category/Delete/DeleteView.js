import React from 'react'
import { setReload } from '../../../../components/Redux/Actions/ReloadPage/Reload';
import store from '../../../../components/Redux/store';
import ParentCategoryService from '../../../../components/Services/ParentCategory/ParentCategoryService';

const DeleteView = ({ id, reloadReconrds, setDeleteButton, service }) => {

    const deleteParent = async () => {

        const payload = {
            id,
        }

        const result = await service.delete(payload);

        const error = document.getElementById("alert");
        error.innerHTML = "";
        
        if (result?.error) {
            error.innerHTML = result.error;
        } else if (result?.errors) {
            
			error.innerHTML = "";

			let arrayOfErrors = Object.values(result.errors);

			arrayOfErrors.forEach((item, index) => {
				error.innerHTML += item + "<br />";
			});

        } else {
            // DO something.
            error.innerHTML = "Success";

            reloadReconrds();

            // Reload shopByCategory component.
            store.dispatch(setReload(true));
        }
    }

    return (
        <div>
            <span id="alert" className="text-danger"></span>
            <h4 className="text-danger">Delete</h4>
            <p className="text-danger">are you sure you wont to delete this record?</p>
            <button onClick={deleteParent} className="btn btn-danger mb-2">Confirm delete</button>
            <button onClick={() => setDeleteButton(false)} className="btn btn-secondary">Back</button>
        </div>
    )
}

export default DeleteView;