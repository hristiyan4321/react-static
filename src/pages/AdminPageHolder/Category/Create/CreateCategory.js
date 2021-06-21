import React from 'react'
import { connect } from 'react-redux';
import { setReload } from '../../../../components/Redux/Actions/ReloadPage/Reload';
import store from '../../../../components/Redux/store';
import CategoryService from '../../../../components/Services/Category/CategoryService';

const CreateCategory = ({ back, parentCategories, reloadRecords }) => {
    const service = new CategoryService();
    // const state = useSelector(state => state); 

    const createParentHandler = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const description = e.target.description.value;
        const categoryPerantId = e.target.parent.value.toString();

        const payload = {
            name,
            description,
            categoryPerantId,
        }

        debugger
        const result = await service.create(payload);

        const error = document.getElementById("createParentCategoryAlert");
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

            // Reload shopByCategory component.
            store.dispatch(setReload(true));   
        }
    }

    return (           
        <div className="container-fluid d-block">
            <form onSubmit={createParentHandler} className="w-75 m-auto">

                <span id="createParentCategoryAlert" className="text-danger"></span>

                <div className="">
                    <div>Parent categories</div>

                    <select name="parent" className="custom-select-sm drop">

                    {parentCategories?.map((data, index) => {
                        return <option key={index} value={data.id}>{data.name}</option>
                        })}

                    </select>
                    </div>

                <div>
                    <label>Name.</label>
                    <input name="name" className="form-control" />
                    <span className="text-danger"></span>
                </div>

                <div>
                    <label>Description</label>
                    <textarea id="textValidate" className="form-control" name="description"></textarea>
                    <span className="text-danger"></span>
                </div>

                <input className="btn btn-outline-primary mt-3" type="submit" value="Create" />

                <div className="mt-2">
                    <button onClick={() => back()} className="btn btn-secondary btn-sm">Back to List</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		reload: state.userReducer.reload,
	}
}

export default connect(mapStateToProps)(CreateCategory);