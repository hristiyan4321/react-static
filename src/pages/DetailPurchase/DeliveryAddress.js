import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import getCookie from '../../components/Cookies/GetCookie';
import FetchData from '../../components/FetchRestAPI/FetchData';
import Loader from '../../components/Loader/Loader';
import { DELIVERY_ADDRESS_CHECK_URL } from '../../components/QueryLinks/QueryLinks';
import { POST } from '../../components/RequestMethods/Methods';
import './DeliveryAddress.css';
import PurcahseComponent from './Purchase/PurchaseComponent';

class DeliveryAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            address: {},
            continueWithCheckout: false,
        };
    }

    validateDeliveryAddress = async (e) => {
        e.preventDefault();
        
        const error = document.getElementById("addressValidation");
        error.innerHTML = "";

        // TODO: Move to service.
        const payload = {
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            phoneNumber: this.state.user.phoneNumber,
            deliveryAddress: this.state.address.addressLocation,
            country: this.state.address.country,
            city: this.state.address.city,
            email: this.state.user.email,
        }

        const result = await FetchData(DELIVERY_ADDRESS_CHECK_URL, payload, POST);

                
        if (result?.error) {
            error.innerHTML = result.error;
        } else if (result?.errors) {
            
			error.innerHTML = "";

			let arrayOfErrors = Object.values(result.errors);

			arrayOfErrors.forEach((item, index) => {
				error.innerHTML += item + "<br />";
			});
        } else {
            // DO something ike send to success page.
            error.innerHTML = "";
            
            this.setState({
                continueWithCheckout: true,
                deliveryAddress: payload,
            });
        }


    }

    handleEmail = (e) => {
        let user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user,
        });
    }
    
    handleFirstName = (e) => {
        let user = this.state.user;
        user.firstName = e.target.value;
        this.setState({
            user,
        });
    }

    handleLastName = (e) => {
        let user = this.state.user;
        user.lastName = e.target.value;
        this.setState({
            user,
        });
    }

    handlePhoneNumber = (e) => {
        let user = this.state.user;
        user.phoneNumber = e.target.value;
        this.setState({
            user,
        });
    }

    handleCountry = (e) => {
        let address = this.state.address;
        address.country = e.target.value;
        this.setState({
            address,
        });
    }
    
    handleCity = (e) => {
        let address = this.state.address;
        address.city = e.target.value;
        this.setState({
            address,
        });
    }
    
    handleAddressLocation = (e) => {
        let address = this.state.address;
        address.addressLocation = e.target.value;
        this.setState({
            address,
        });
    }

    back = (isPressed) => {
        this.setState({
            continueWithCheckout: isPressed,
        });
    }

    render() {
        const { user, basket } = this.props;
        const loggedUser = getCookie('user');
        if (this.state.user === null || this.state.user === undefined) {
            this.setState({
                user,
            });
        }
        if (user?.id === undefined && loggedUser === null && loggedUser.length <= 0) {
            return <Redirect to="/Login" />
        } else if(this.state.continueWithCheckout) {
            
            return <PurcahseComponent
                user={this.state.user}
                address={this.state.deliveryAddress}
                back={this.back}
            />;
        } else {
            if (user.addresses !== undefined) {
                
                const address = user.addresses[0];
                
                if (this.state.user === null && address !== null && address !== undefined) {
                    this.setState({
                        user,
                        address,
                    });    
                }
                
            }
            return (
                <div className="container">
                <h4>Delivery address</h4>
                <span id="addressValidation" className="text-danger"></span>
                <hr />

                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={this.validateDeliveryAddress}>
                            <div  className="text-danger"></div>

                            <div className="form-group">
                                <label className="control-label">Email.</label>
                                <input required className="form-control" onChange={this.handleEmail} value={this.state.user?.email} />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group">
                                <label className="control-label">First name.</label>
                                <input required className="form-control" onChange={this.handleFirstName} value={this.state.user?.firstName} />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Last name.</label>
                                <input required className="form-control" onChange={this.handleLastName} value={this.state.user?.lastName} />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Phone number example +359-0222-222-222.</label>
                                <input required className="form-control" onChange={this.handlePhoneNumber} value={this.state.user?.phoneNumber} />
                                <span className="text-danger"></span>
                            </div>
                            <input type="hidden"  />
                            <p className="mt-3 text-primary">Address.</p>
                            <div className="form-group">
                                <label className="control-label">Country.</label>
                                <input required className="form-control" onChange={this.handleCountry} value={this.state.address?.country} />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group">
                                <label className="control-label">City.</label>
                                <input required className="form-control" onChange={this.handleCity} value={this.state.address?.city} />
                                <span className="text-danger"></span>
                            </div>
                            
                            <div className="form-group">
                                <label className="control-label">Address location.</label>
                                <input required className="form-control" onChange={this.handleAddressLocation} value={this.state.address?.addressLocation} />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Continiue with this address." className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        basket: state.basketReducer.basket,
	}
}

export default connect(mapStateToProps)(DeliveryAddress);