import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartItems } from '../../../components/Services/Cart/CartService'
import CartDetails from '../CartItems/CartDetails'

export class LoadCart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subTotal: 0,
            cart: [],
            reDisplayCart: false,
        }
    }

    // On load to get the cart items.
    componentDidMount = () => {
        const { user, basket } = this.props;
        if (basket != null && basket.length > 0) {
                
            this.setState({
                subTotal: 0, 
            });
            
            if (!this.state.isLoaded) {
                this.setState({
                    isLoded: true,
                })
                setTimeout(async () => {
                    // TODO catch if there is error/s.
                    const cart = await getCartItems(basket);
                }, 100);
            }
        }
    }

    getCart = async (basket) => {
        let cart = [];
        const { setSubTotal } = this.props;
        if (cart[0] == null) {
            cart = await getCartItems(basket);
            console.log(cart)
            if (cart.length > 0) {

                cart = this.addQuantity(cart, basket);
                
                // Calculate cart current amount.
                const total = cart?.reduce((amount, item) =>
                (item.price * item.PurchaseQuantity) + amount, 0).toFixed("2");
                this.setState({
                    cart,
                    subTotal: total,
                });

                setSubTotal(total);
            }
        }
    }

    // TODO change logic ( ordered quantity to be included in back end )
    // This is O(n*n) complexity.
    addQuantity = (cart, basket) => {
        for (let i = 0; i < cart.length; i++) {
            const cartItem = cart[i];
            for (let j = 0; j < basket.length; j++) {
                const basketItem = basket[j];
                if (cartItem.id == basketItem.id) {
                    cartItem.PurchaseQuantity = basketItem.quantity;
                }
            }
        }

        return cart;
    }

    // Redisplay the items and the idea is to recalculate the subtotal price and quantity if changed.
    reDisplay = () => {
        this.setState({
            reDisplayCart: true,
        });
        setTimeout(() => {
            const { basket } = this.props;
            this.getCart(basket);
                this.setState({
                    reDisplayCart: false,
                });
        }, 100);
    }

    render() {
        const { basket, isInCart } = this.props;
        
        if (this.state.cart.length <= 0) {
            this.getCart(basket);
        }

        return (
            <div>
                {this.state.cart.map(item => (
                <div key={item.id}>
                <CartDetails
                    isInCart={isInCart}
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.imageUrl}
                    price={item.price}
                    quantityInStock={item.quantityInStock}
                    purchaseQuantity={item.PurchaseQuantity}
                    reDisplaycart={this.reDisplay}
                    />
                <hr />
            </div>
            ))}

            <text>total: {this.state.subTotal} $</text>

            {this.props.children}             
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    basket: state.basketReducer.basket,
});

export default connect(mapStateToProps)(LoadCart);
