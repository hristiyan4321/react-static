import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import FetchData from '../../../components/FetchRestAPI/FetchData';
import { POST } from '../../../components/RequestMethods/Methods';
import { getCartItems, resetCart, setCreateOrder } from '../../../components/Services/Cart/CartService';
import CartDetails from '../../CartPageHolder/CartItems/CartDetails';
import CartPage from '../../CartPageHolder/CartPage';
import { LoadCart } from '../../CartPageHolder/LoadCartItems/LoadCart';
import { SuccesslullyPurchased } from '../../SuccessPage/SuccesslullyPurchased';

class PurcahseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cart: [],
            total: 0,
            successPage: false,
        }
    }

    backToPrevios = () => {
        const { back } = this.props;
        back(false);
    }

    setSubTotal = (total) => {
        this.setState({
            total,
        });
    }

    purchase = async (e) => {
        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart'));
        const orderedProducts = [... cart];
        const { address } = this.props;

        const payload = {
            orderedProducts: orderedProducts,
            deliveryAddress: address,
        }
        
        const error = document.getElementById("errorPurchase");
        error.innerHTML = "";

        // Cart service method.
        const result = await setCreateOrder(payload);
        
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
            error.innerHTML = "Success.";
            
            this.setState({
                successPage: true,
                orderId: await result,
            });

            resetCart();
        }
    }

    render() {

        const { user, address } = this.props;
        const { basket } = this.props;
        if (this.state.successPage) {
            
            return <SuccesslullyPurchased 
                orderId={this.state.orderId}
            />

        } else {

            return (
                
                <div className="container d-flex">
                <span id="errorPurchase"></span>
                <button className="btn btn-outline-secondary" onClick={this.backToPrevios} >Back</button>           


                        <div className="container w-50">
                            <h4>User info</h4>
                            <br />
                            <label>First name</label>
                            <p>{user?.firstName}</p>

                            <label>Last name</label>
                            <p>{user?.lastName}</p>

                            <label>Phone number</label>
                            <p>{user?.phoneNumber}</p>

                            <br />
                            <h4>Delivery address</h4>
                            <br />
                            <label>Country</label>
                            <p>{address?.country}</p>
                            <label>City</label>
                            <p>{address?.City}</p>
                            <label>Address location</label>
                            <p>{address?.addressLocation}</p>
                        </div>

                            <div className="container w-50">
                                {/* {this.viewProductsInCart()}    */}
                                <LoadCart 
                                setSubTotal={this.setSubTotal}
                                basket={basket}/>

                                    
                                <form className="mt-3 mb-5"
                                    onSubmit={this.purchase}
                                    >

                                    <div className="form-group">
                                        <div>

                                            <button type="submit" className="btn btn-danger mr-1">Check out {this.state.total} $</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
            </div>
        )}
    }
}

const mapStateToProps = (state) => {
    return {
        basket: state.basketReducer.basket,
	}
}

export default connect(mapStateToProps)(PurcahseComponent);