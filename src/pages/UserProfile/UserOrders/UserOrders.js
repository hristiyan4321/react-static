import React, { Component } from 'react';
import { connect } from 'react-redux';
import FetchData from '../../../components/FetchRestAPI/FetchData';
import PaginationComponent from '../../../components/Pagination/PaginationComponent';
import { GET } from '../../../components/RequestMethods/Methods';
import UserService from '../../../components/Services/User/UserService';
import BackToProfile from './BackToProfile';
import OrdersTable from './OrdersTable';
import './UserOrders.css';

export class UserOrders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userService: new UserService(),
            targetPage: 1,
            currentPage: 1,
            pagesCount: 1,
            composeLink: "/orders?a=a&targetPage=",
        }
    }

    getOrdersForCurrentUser = async () => {
        const result = await this.state.userService.getOrders();
        
        const error = document.getElementById("errorUserOrders");
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
                orderCollection: await result,
                currentPage: await result.currentPage,
                pagesCount: await result.pagesCount,
            });
        }

    }

    setPage = (number) => {
        this.setState({
            currentPage: number,
        });

        setTimeout(() => {
            this.getOrdersForCurrentUser();
        }, 100);
    }

    render() {

        if (this.state.orderCollection === undefined || this.state.orderCollection === null) {
            this.getOrdersForCurrentUser();
        }

        console.log(this.state.orderCollection)
        const padding = "ml-2 pr-1";
        
        return (            
            <div className="container-fluid">

                <BackToProfile
                />

                <span id="errorUserOrders" className="text-danger"></span>

                <div className="table-responsive-sm table-hover table">
                    <table className="table" id="tabul">
                        <thead>
                            <tr>
                                <th id="hide-on-mobile">
                                    Delivery address.
                                </th>
                                <th id="hide-on-mobile">
                                    Status.
                                </th>
                                <th id="hide-on-mobile">
                                    Total price.
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* TODO: split to components. */}
                            {this.state?.orderCollection?.orders?.map((data, index) => {
                                return <OrdersTable 
                                    data={data}
                                    index={index}
                                    padding={padding}
                                />
                            })}
                            
                        </tbody>
                    </table>
                </div>
                            <PaginationComponent 
                                    currentPageNavigation={this.state?.currentPage}
                                    itemsPerPage={this.state?.pagesCount}
                                    setCurrentPage={this.setPage}
                                    composeLink={this.state?.composeLink}    
                            />
                

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
    basket: state.basketReducer.basket,
})

export default connect(mapStateToProps)(UserOrders)
