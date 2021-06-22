import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import UserAddress from './UserAddress/UserAddress';

const Profile = ({ firstName, lastName, phoneNumber, email, addresses, updateProfile, updateAddress, getAddress }) => {
    const history = useHistory();    
    const [address, setAddress] = useState({
        addressLClick: false,
    });

    const [userProf, setUserProf] = useState({
        firstName,
        lastName,
        phoneNumber,
    });
    
    const [order, setOrder] = useState({
        orderClick: false,
    });

    if (address.addressLClick) {
        const error = document.getElementById("errorProfile");
        error.innerHTML = "";
        return <UserAddress 
            getAddress={getAddress}
            updateAddress={updateAddress}
            addresses={addresses}
            back={setAddress}
        />
    } else if (order.orderClick) {
        //TODO send to orders.
        history.push("/orders");
    }

    const profileUpdateHandler = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const phoneNumber = e.target.phoneNumber.value;
        // TODO validate in front end.

        const payload = {
            firstName,
            lastName,
            phoneNumber,
            email,
        }

        const result = await updateProfile(payload);
        if (result === "Successfully edited.") {
            history.push("/profile");
        }
    }

    return <div className="container">
        <div className="d-flex justify-content-start">
            <div className="">
                <h4>User information</h4>
            </div>

            <div className="pl-sm-2">
                <div className="btn btn-primary" onClick={() => setOrder({orderClick: true})}>View orders</div>
            </div>

            <div className="pl-sm-2">
                <div className="btn btn-primary" onClick={() => history.push("/address")}>Address</div>
            </div>

            <hr />
        </div>
        <hr />
        
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={profileUpdateHandler}>
                    <div className="text-danger"></div>

                    <div className="form-group">
                        <label className="control-label">FirstName</label>
                        <input className="form-control" onChange={(e) => setUserProf({ firstName: e.target.value })} name="firstName" value={userProf.firstName} />
                        <span className="text-danger"></span>
                    </div>

                    <div className="form-group">
                        <label className="control-label">LastName</label>
                        <input className="form-control" onChange={(e) => setUserProf({ lastName: e.target.value })} value={userProf.lastName} name="lastName" />
                        <span className="text-danger"></span>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Phone number example: +359-1234-123-125</label>
                        <input className="form-control" onChange={(e) => setUserProf({ phoneNumber: e.target.value })} value={userProf.phoneNumber} name="phoneNumber"/>
                        <span className="text-danger"></span>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-danger" />
                    </div>
                </form>

            </div>
        </div>
    </div>
}

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.userReducer.user,
// 	}
// }

export default (Profile);