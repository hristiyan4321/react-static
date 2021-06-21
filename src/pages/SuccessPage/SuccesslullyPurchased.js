import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import FetchData from '../../components/FetchRestAPI/FetchData';
import { GET } from '../../components/RequestMethods/Methods';

export class SuccesslullyPurchased extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderDetails: {},
        };
    }

    componentDidMount = async () => {
        
        const { orderId } = this.props;
        const error = document.getElementById("errorSuccessPage");
        error.innerHTML = "";

        // TODO: move to service.
        const result = await FetchData(`successOrderPage?orderId=${orderId}`, null, GET);
        debugger
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
                orderDetails: await result,
            });
        }
    }

    render() {
        const { orderId } = this.props;
        return (
                <div className="container">
                    <span id="errorSuccessPage"></span>
                    <h1 className="text-success">Successfully purchase</h1>

                    <div>
                        <h4>Order with id {orderId}</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                Status.
                            </dt>
                            <dd className="col-sm-10">
                                {this.state.orderDetails?.orderStatuses?.statusName}   
                            </dd>
                            <dt className="col-sm-2">
                                Total price.
                            </dt>
                            <dd className="col-sm-10">
                                {this.state.orderDetails?.totalPrice} $
                            </dd>
                            <dt className="col-sm-2">
                                FirstName
                            </dt>
                            <dd className="col-sm-10">
                                {this.state.orderDetails?.orderContact?.firstName}
                            </dd>
                            <dt className="col-sm-2">
                                LastName
                            </dt>
                            <dd className="col-sm-10">
                                {this.state.orderDetails?.orderContact?.lastName}
                            </dd>
                            <dt className="col-sm-2">
                                Email
                            </dt>
                            <dd className="col-sm-10">
                                {this.state.orderDetails?.orderContact?.email}
                            </dd>

                            <dt className="col-sm-2">
                                DeliveryAddress
                            </dt>
                            <dd className="col-sm-10">
                                <p>Country: {this.state.orderDetails?.orderContact?.country}</p>
                                
                                <p>City: {this.state.orderDetails?.orderContact?.city}</p>
                                
                                <p>Address location: {this.state.orderDetails?.orderContact?.deliveryAddress}</p>
                            </dd>


                        </dl>
                        <Link to="/orders" className="btn btn-outline-success" >View orders</Link>
                    </div>

                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    basket: state.basketReducer.basket,
})

export default connect(mapStateToProps)(SuccesslullyPurchased);