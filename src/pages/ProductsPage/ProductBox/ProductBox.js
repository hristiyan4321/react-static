import React, { Component } from 'react'
import { AddToCartProduct } from '../../../components/Services/Cart/CartService';
import './ProductBox.css';

export default class ProductBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productId: null,
            quantity: 1,
            quantityInStockInArray: [],
        }
    }

    // componentDidMount = () => {
    //     const quantityInStockInArray = [];
    //     const product = this.props.props;
    //     if (product !== null) {
            
    //         for (let i = 0; i < product.quantityInStock; i++) {
    //             quantityInStockInArray.push(i + 1);
    //         }
    //         this.setState({
    //             quantityInStockInArray,
    //         })
    //     }
    // }

    addToCart = () => {
        
        const id = this.props.props.id;
        const currentQuantity = Number(this.state.quantity);
        
        // local storage object.
        const payload = {
            id: this.props.props.id,
            quantity: Number(this.state.quantity),
        };

        AddToCartProduct(payload, currentQuantity, id);
        
        setTimeout(() => {
            this.setState({
                quantity: 1,
            })
        }, 100);
    }
    
    render() {
        console.log(this.props.props);
        const product = this.props.props;
        if (this.state.product === null) {
            
            this.setState({
                product: product,
                productId: product.id,
            });
        }

        return (
            <div className="product-container">
                <span id="result"></span>
                <img className="product-image" src={product.imageUrl} />
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.price} $</p>
                
                <input className="w-25" type="number" min="1" max={product.quantityInStock} onChange={(e) => this.setState({ quantity: e.target.value})}  value={this.state.quantity} />

                <strong>Quantity {product.quantityInStock}</strong>
                <br />
                <button onClick={() => this.addToCart()}>Add to cart.</button>
            </div>
        )
    }
}