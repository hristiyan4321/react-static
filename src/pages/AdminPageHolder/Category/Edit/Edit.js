import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setReload } from '../../../../components/Redux/Actions/ReloadPage/Reload';
import store from '../../../../components/Redux/store';
import CategoryService from '../../../../components/Services/Category/CategoryService';
import ParentCategoryService from '../../../../components/Services/ParentCategory/ParentCategoryService';
import EditOrder from '../../Order/EditOrder';
import './Edit.css';

const EditParentCategory = ({ back, name, description, isActive, isDeleted, id, reloadReconrds, service, show, imageUrls, quantityInStock, price, editOrder }) => {
    
    const [hideComponent, setHideComponent] = useState(false);
    // const state = useSelector(state => state); 
    
    const editParentHandler = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const description = e.target.description.value;
        const isActive = e.target.isActive.value;
        const isDeleted = e.target.isDeleted.value;

        let payload = {
            id,
            name,
            description,
            isActive: isActive === "1" ? true: false,
            isDeleted: isDeleted === "1" ? true: false,
        }
        debugger
        if (show !== undefined) {
            const imageUrl = e.target.imageUrl.value;
            const quantityInStock = e.target.quantityInStock.value;
            const price = e.target.price.value;
            payload["imageUrl"] = imageUrl;
            payload["quantityInStock"] = Number(quantityInStock);
            payload["price"] = Number(price);
        }
        
        let result = {};
        if (service !== undefined) {    
            result = await service.edit(payload);
        }

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

    if (hideComponent) {
        return null;
    } else if (editOrder !== undefined) {
        return <EditOrder 
            
        />
    } else {

        return (           
            <div className="container-fluid edit-view" >
            <form onSubmit={editParentHandler} className="w-75 m-auto">

                <span id="alert" className="text-danger"></span>

                <div>
                    <label>Name.</label>
                    <input name="name" className="form-control text-center" defaultValue={name} />
                    <span className="text-danger"></span>
                </div>

                <div>
                    <label>Description</label>
                    <textarea id="textValidate" className="form-control text-center" defaultValue={description} name="description"></textarea>
                    <span className="text-danger"></span>
                </div>

                {imageUrls !== undefined ? 
                    <div>
                        <label>ImageUrl.</label>
                        <textarea id="textValidate" className="form-control text-center" defaultValue={imageUrls} name="imageUrl"></textarea>
                        <span className="text-danger"></span>
                    </div>
                : null}

                {quantityInStock !== undefined ? 
                    <div>
                        <label>quantityInStock.</label>
                        <input id="textValidate" type="number" className="form-control text-center" defaultValue={quantityInStock} name="quantityInStock" />
                        <span className="text-danger"></span>
                    </div>
                : null}

                {price !== undefined ? 
                    <div>
                        <label>Price.</label>
                        <input id="textValidate" type="number" step="0.01" className="form-control text-center" defaultValue={price} name="price" />
                        <span className="text-danger"></span>
                    </div>
                : null}

                <div className="mt-2 mb-2">
                    <label className="pr-2">isActive</label>
                    
                    <select name="isActive" className="custom-select-sm drop">
                        <option value={isActive ? "1": "0"}>{isActive ? "True": "False"}</option>
                        <option value="1">True.</option>
                        <option value="0">False.</option>
                    </select>

                    <span className="text-danger"></span>
                </div>

                <div className="mt-2">
                    <label className="pr-2">isDeleted</label>
                    
                    <select name="isDeleted" className="custom-select-sm drop">
                        <option value={isDeleted ? "1": "0"}>{isDeleted ? "True": "False"}</option>
                        <option value="1">True.</option>
                        <option value="0">False.</option>
                    </select>

                    <span className="text-danger"></span>
                </div>

                <input className="btn btn-outline-primary mt-3" type="submit" value="Edit" />

                <div className="mt-2">
                    <button onClick={() => setHideComponent(!hideComponent)} className="btn btn-secondary btn-sm">Back to List</button>
                </div>
            </form>
        </div>
    )}
}

const mapStateToProps = (state) => {
	return {
		reload: state.userReducer.reload,
	}
}

export default connect(mapStateToProps)(EditParentCategory);