import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckLocalStorageAndAddTobasketProducts } from '../../Services/Cart/CartService';
import './BasketComponent.css';

class BasketComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
        }
    }

    componentDidMount = () => {
        CheckLocalStorageAndAddTobasketProducts();
    }

    showBasket = () => {
        const { basket } = this.props;
        console.log(basket)
    }

    render() {
        
        const { basket } = this.props;

        return  <Link
        to="/cart"
        className="mr-3 text-infos3"
        onClick={this.showBasket}>
        <i className="fa fa-shopping-basket basket-icon"></i>

        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-basket" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
        </svg>

        <span className="header__optionsLineTwo">{basket?.length}</span>
    </Link>
    }
}

const mapStateToProps = (state) => {
	return {
		basket: state.basketReducer.basket
	}
}

export default connect(mapStateToProps)(BasketComponent);