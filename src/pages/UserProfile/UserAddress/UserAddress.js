import React, { useState } from 'react';
import { useHistory } from 'react-router';

const UserAddress = ({back, addresses, updateAddress, getAddress}) => {
    const history = useHistory();
    const primaryAddress = addresses.filter(x => x.primaryAddress === true)[0];
       
    const [address, setAddress] = useState({
        id: primaryAddress?.id,
        country: primaryAddress?.country,
        city: primaryAddress?.city,
        addressLocation: primaryAddress?.addressLocation,
    });

    const addressHandler = async (e) => {
        e.preventDefault();
        const payload = {
            id: primaryAddress?.id,
            country: e.target.country.value,
            city: e.target.city.value,
            addressLocation: e.target.addressLocation.value,
            primaryAddress: primaryAddress?.primaryAddress,
        }

        const result = await updateAddress(payload);
        if (await result?.errors) {
            // TODO errors.
        } else {

            setAddress({
                id: await result?.id,
                country: await result?.country,
                city: await result?.city,
                addressLocation: await result?.addressLocation,
            });

            history.push("/profile")
            back({addressClick: true});
        }
    }

    return <div className="container">
        <button className="btn btn-secondary" onClick={() => back({addressClick: false})} >Back</button>
        
        <hr />
        Address
        <div className="row">
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