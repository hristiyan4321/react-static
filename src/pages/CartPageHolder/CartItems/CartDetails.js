import React from 'react';
import { Component } from 'react';
import Loader from '../../../components/Loader/Loader';
import { AddToCartProduct, removeFromCart } from '../../../components/Services/Cart/CartService';
import './CartDetails.css';

class CartDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            quantity: 1,
        }
    }

    componentDidMount = () => {
        const { purchaseQuantity } = this.props;
        this.setState({
            quantity: purchaseQuantity,
        })        
    }

    removeFormBasket = () => {
        this.setState({
            loading: true,
        });

        const { id, reDisplaycart } = this.props;
        const result = removeFromCart(id);
        if (result) {
            reDisplaycart();
        }
    }

    render() {
        const { id, name, quantityInStock, purchaseQuantity, image, price, isInCart } = this.props;
        
        if (this.state.loading) {
            return <Loader />
        } else {

            return (
                <div className="ChaeckoutProduct text-left">
                
                <hr />

                <img src={image} />

                <div className="ChaeckoutProduct__info">
                    <h4><p className="ChaeckoutProduct__title">
                        {name}
                    </p></h4>

                    <h4><p className="ChaeckoutProduct__price">
                        <strong>{price}</strong>
                        <small> $</small>
                    </p></h4>

                    <h4><p className="ChaeckoutProduct__price">
                        <small>in stock </small>
                        <strong>{quantityInStock}/
                         <small>ordered: </small>
                         {this.state.quantity}

                        </strong>
                    </p></h4>
        
                    {isInCart ? 
                    <button onClick={this.removeFormBasket} className="btn button__remove m-auto btn-warning">remove from basket</button>
                    : null}
                    
                </div>
            </div>
        )}
    }
}

export default CartDetails;