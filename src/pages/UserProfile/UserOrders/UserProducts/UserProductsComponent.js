import React, { Component } from 'react'
import FetchData from '../../../../components/FetchRestAPI/FetchData';
import { getParams } from '../../../../components/GetSearchedParams/Params';
import { GET_ORDER_PRODUCTS_BY_ID } from '../../../../components/QueryLinks/QueryLinks';
import { GET } from '../../../../components/RequestMethods/Methods';
import ProductContainer from '../../../ProductsPage/ProductBox/ProductContainer/ProductContainer';
import BackToProfile from '../BackToProfile';

class UserProductsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = async () => {
        // TODO: move to service.
        const id = getParams('id');
        const composeLink = GET_ORDER_PRODUCTS_BY_ID + "?orderId=" + id;
        const result = await FetchData(composeLink, null, GET);

        const error = document.getElementById("errorUserProducts");
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
            this.setState({
                product: await result,
            });
        }
    }

    render() {
        return (
            <div>
                <div className="mb-3">
                    <BackToProfile
                    url={"/orders"}
                    />
                </div>
                
                <span id="errorUserProducts" className="text-danger"></span>
                {this.state?.product?.map((data, index) => {
                   return <ProductContainer
                    key={index}
                    product={data}
                    />
                })}
            </div>
        )
    }
}

export default UserProductsComponent;