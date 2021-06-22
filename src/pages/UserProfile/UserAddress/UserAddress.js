import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setUser } from '../../../components/Redux/Actions/User/addUser';
import store from '../../../components/Redux/store';
import UserService from '../../../components/Services/User/UserService';

const UserAddress = ({back, addresses, updateAddress, getAddress}) => {
    const history = useHistory();
    const userService = new UserService();

    const state = useSelector(state => state);
    let user = state.userReducer.user;

    const primaryAddress = user?.addresses?.filter(x => x.primaryAddress === true)[0];

    const [address, setAddress] = useState({
        id: primaryAddress?.id,
        country: primaryAddress?.country,
        city: primaryAddress?.city,
        addressLocation: primaryAddress?.addressLocation,
    });

    const getUserProfile = async () => {        
        const userProfile =  await userService.getUserProfile();
        debugger
        store.dispatch(setUser(userProfile));
        const address = await userProfile?.addresses?.filter(x => x.primaryAddress === true)[0];
        setAddress({
            id: address?.id,
            country: address?.country,
            city: address?.city,
            addressLocation: address?.addressLocation,
        });
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    const addressHandler = async (e) => {
        e.preventDefault();
        const country = e.target.country.value;
        const city = e.target.city.value;
        const addressLocation = e.target.addressLocation.value;
        
        const payload = {
            id: primaryAddress?.id !== undefined ? primaryAddress?.id : null,
            country,
            city,
            addressLocation,
            primaryAddress: primaryAddress?.primaryAddress,
        }
        
        const result = await userService.updateAddress(payload);

        const error = document.getElementById("error");
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
            error.innerHTML = "Success.";

            const ress = await userService.getUserProfile();
            
            setAddress({
                id: await result?.id,
                country: await result?.country,
                city: await result?.city,
                addressLocation: await result?.addressLocation,
            });

            // Add updated user to redux.
            store.dispatch(setUser(ress));
        }
        
    }

    return <div className="container">
        <button className="btn btn-secondary" onClick={() => history.push("/profile")} >Back</button>
        
        <hr />
        Address
        <div className="row">
            <span id="error" className="text-danger"></span>
            <div className="col-md-4">
                <form onSubmit={addressHandler}>
                    <div  className="text-danger"></div>
                    <div className="form-group">
                        <label className="control-label">Country</label>
                        <input className="form-control" name="country" onChange={(e) => setAddress({ country: e.target.value })} value={address.country} />
                        <span className="text-danger"></span>
                    </div>
                    <div className="form-group">
                        <label className="control-label">City</label>
                        <input className="form-control" name="city" onChange={(e) => setAddress({ city: e.target.value })} value={address.city}/>
                        <span className="text-danger"></span>
                    </div>
                        <input type="hidden" name="PrimaryAddress" value="1" className="form-control" />
                        
                    <div className="form-group">
                        <label className="control-label">AddressLocation</label>
                        <input className="form-control" name="addressLocation" onChange={(e) => setAddress({ addressLocation: e.target.value })} value={address.addressLocation}/>
                        <span className="text-danger"></span>
                    </div>

                    <input type="hidden" asp-for="Id" />

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-danger" />
                    </div>

                </form>
            </div>
        </div>
    </div>
}

export default UserAddress;