import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import FetchData from '../../components/FetchRestAPI/FetchData';
import Loader from '../../components/Loader/Loader';
import { GET, POST } from '../../components/RequestMethods/Methods';
import { getCartItems } from '../../components/Services/Cart/CartService';
import CartDetails from './CartItems/CartDetails';
import './CartPage.css';
import ContinueComponent from './ContinueToDetails/ContinueComponent';
import { LoadCart } from './LoadCartItems/LoadCart';

class CartPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subTotal: 0,
            cart: [],
            reDisplayCart: false,
        }
    }

    setSubTotal = (subTotalsPrice) => {
        this.setState({
            subTotal: subTotalsPrice,
        })
    }
        
    render() {

        const { user, basket } = this.props;

        if (this.state.reDisplayCart) {
            return <Loader />
        } else {        
            return(
                <div >
                <div className="container-fluid pl-0 pr-0 checkout">

                    <img className="checkout__headerImage" src="https://th.bing.com/th/id/R4c5da5371d37ebf841ca1e83f9b3055a?rik=QnE7dBrvjiNjiw&riu=http%3a%2f%2fwww.linathinfotech.com%2fwp-content%2fuploads%2f2014%2f03%2febay-store-design-and-development2.jpg&ehk=N0mUc3UveJdWDptgq0sKjbQBvi7u420nu%2bHXx4%2f9%2bUI%3d&risl=&pid=ImgRaw" alt="." />

                    <div className="row w-100">
                        {basket?.length === 0 ? (
                            <div className="empty__basket">
                                <h4 className="ml-sm-5 mt-3 empty__basket">
                                    {user?.email ?
                                        user.email :
                                        "Guest"} Your Shoping basket is empty
                            </h4>
                                <p className="ml-sm-5 empty__basket">
                                    {user?.email ?
                                        user?.email :
                                        "Guest"} You have no items in your basket. To buy one or more, click "Add to basket" next to the item
                            </p>
                            </div>
                        ) : (
                            <div className="ml-sm-5 ">
                                    <h4 className="ml-sm-5 chekcout__title">
                                        {user?.email ? user?.email : "Guest"} Your Shoping basket
                                </h4>
                                    {/* {this.viewProductsInCart()} */}
                                    <LoadCart 
                                    isInCart={true}
                                    setSubTotal={this.setSubTotal}
                                    basket={basket} />

                                </div>
                            )}
                            
                        {basket?.length > 0 ? 
                            <div className="checkout__right m-md-auto text-left shadow-box col-4">
                                <h3 className="subtotal__container pl-sm-3">
                                    
                                    {this.state.subTotal} $

                                    <ContinueComponent
                                    subTotal={this.state.subTotal}
                                    />
                                </h3>
                            </div>
                            :
                            null
                        }

                    </div>

                    <hr />

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

export default connect(mapStateToProps)(CartPage);