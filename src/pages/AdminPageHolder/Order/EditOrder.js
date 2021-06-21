import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setReload } from '../../../components/Redux/Actions/ReloadPage/Reload';
import store from '../../../components/Redux/store';

const EditParentCategory = ({ back, isActive, id, reloadReconrds, service, allStatuses }) => {
    
    const [hideComponent, setHideComponent] = useState(false);
    // const state = useSelector(state => state); 

    const editParentHandler = async (e) => {
        e.preventDefault();

        const status = Number(e.target.status.value);
        const isActive = e.target.isActive.value;

        const payload = {
            id,
            status,
            isActive: isActive === "1" ? true: false,
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

    console.log(allStatuses)

    if (hideComponent) {
        return null;
    } else {
        
        return (           
            <div className="container-fluid edit-view" >
            <form onSubmit={editParentHandler} className="w-75 m-auto">

                <span id="alert" className="text-danger"></span>
                {/* TODO: status */}

                <div>
                    <div>Statuses</div>

                    <select name="status" className="custom-select-sm drop">

                    {allStatuses?.map((data, index) => {
                        return <option key={index} value={data.status}>{data.statusName}</option>
                        })}

                    </select>
                    </div>       
                
                <div className="mt-2 mb-2">
                    <label className="pr-2">isActive</label>
                    
                    <select name="isActive" className="custom-select-sm drop">
                        <option value={isActive ? "1": "0"}>{isActive ? "True": "False"}</option>
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