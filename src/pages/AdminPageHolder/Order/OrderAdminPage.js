import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaginationComponent from '../../../components/Pagination/PaginationComponent';
import OrderService from '../../../components/Services/Order/OrderService';
import ProductService from '../../../components/Services/Products/ProductService';
import SortOptions from '../../../components/SortComponent/SortOptions';
import CreateCategory from '../Category/Create/CreateCategory';
import OptionsComponent from '../Category/Options/OptionsComponent';
import EditOrder from './EditOrder';

class OrderAdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            service: new OrderService(),
            createButton: false,
            reloadReconrds: false,
            currentPage: "1",
            composeLink: "/admin/orders?targetPage=",
            sort: "",
        }
    }

    componentDidMount = () => {
        this.getOrders();
    }

    getOrders = async () => {

        const result = await this.state.service.getAdminOrders(this.state.sort);
        
        console.log(await result);

        const error = document.getElementById("errorCategories");
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
                orders: await result,
            });
        }
    }

    back = () => {
        this.setState({
            createButton: false,
        })
    }

    setPage = (number) => {
        
        this.setState({
            currentPage: number,
        });

        setTimeout(() => {
            this.getOrders();
        }, 100);
    }

    reloadRecords = () => {
        this.getOrders();
    }
    
    sortHandle = (e) => {
        e.preventDefault();
        const sort = e.target.value;

        this.setState({
            sort,
        });

        setTimeout(() => {
            this.getOrders();
        }, 100);
    }
    
    render() {

        return (
            <div  className="container-fluid w-100">
                <span id="errorCategories" className="text-danger"></span>
                
                <SortOptions 
                    sortHandle={this.sortHandle}
                    showName={true}
                />

                <div className="table-responsive w-100">
                    <table className="table-responcive w-100" id="tabul">
                        <thead>
                    `        <tr>
                                <th id="hide-on-mobile">
                                    Client user name.
                                </th>
                                <th id="hide-on-mobile">
                                    Delivery address.
                                </th>
                                <th id="hide-on-mobile">
                                    IsActive.
                                </th>
                                <th id="hide-on-mobile">
                                    IsDeleted.
                                </th>
                                <th id="hide-on-mobile">
                                    Status.
                                </th>
                                <th id="hide-on-mobile">
                                    CreatedAt.
                                </th>
                                <th id="hide-on-mobile">
                                    CreatedBy.
                                </th>
                                <th id="hide-on-mobile">
                                    ModfiedAt.
                                </th>
                                <th className="price-title" id="hide-on-mobile">
                                    ModifiedBy.
                                </th>
                                <th>
                                    Options.
                                </th>
                                <th></th>
                            </tr>`
                   </thead>
                        <tbody>
                                 {this.state.orders[0] !== null ?
                                  this.state.orders?.orders?.map((data, index) => {
                                     return <OptionsComponent 
                                     reloadReconrds={this.reloadRecords}
                                     key={index}
                                     index={index}
                                     data={data}
                                     service={this.state.service}
                                     show="orders"
                                     allStatuses={this.state.orders?.allStatuses}
                                     editOrder={EditOrder}
                                     />
                                 }):null}
                        </tbody>
                    </table>
                </div>
                                <PaginationComponent
                                    currentPageNavigation={this.state.orders?.currentPage}
                                    setCurrentPage={this.setPage}
                                    itemsPerPage={this.state.orders?.pagesCount}
                                    composeLink={this.state.composeLink}
                                 />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		reload: state.userReducer.reload,
	}
}

export default connect(mapStateToProps)(OrderAdminPage);