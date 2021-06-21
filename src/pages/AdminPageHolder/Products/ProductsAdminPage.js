import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaginationComponent from '../../../components/Pagination/PaginationComponent';
import ProductService from '../../../components/Services/Products/ProductService';
import SortOptions from '../../../components/SortComponent/SortOptions';
import CreateCategory from '../Category/Create/CreateCategory';
import OptionsComponent from '../Category/Options/OptionsComponent';
import CreateProductComponent from './Create/CreateProductComponent';

class ProductsAdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productService: new ProductService(),
            createButton: false,
            reloadReconrds: false,
            currentPage: "1",
            composeLink: "/admin/products?targetPage=",
            sort: "",
        }
    }

    componentDidMount = () => {
        this.getProducts();
    }

    getProducts = async () => {
        const result = await this.state.productService.getAdminProducts(this.state.sort);
        
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
                products: await result,
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
            this.getProducts();
        }, 100);
    }

    reloadRecords = () => {
        this.getProducts();
    }
    
    sortHandle = (e) => {
        e.preventDefault();
        const sort = e.target.value;

        this.setState({
            sort,
        });

        setTimeout(() => {
            this.getProducts();
        }, 100);
    }
    
    render() {

        if (this.state.createButton) {
            return <CreateProductComponent
            reloadRecords={this.reloadRecords} 
            back={this.back}
            categories={this.state.products.categories}
            />;
        }

        return (
            <div  className="container-fluid w-100">
                <span id="errorCategories" className="text-danger"></span>
                
                <SortOptions 
                    sortHandle={this.sortHandle}
                    showPrice={true}
                />

                <div className="text-right mr-sm-5 pr-sm-4 pt-sm-1 pb-sm-1">
                    <button onClick={() => this.setState({ createButton: true })} className="btn btn-outline-primary">Create</button>
                </div>

                <div className="table-responsive w-100">
                    <table className="table-responcive w-100" id="tabul">
                        <thead>
                            <tr>
                                <th id="hide-on-mobile">
                                    Name.
                                </th>
                                <th id="hide-on-mobile">
                                    Description.
                                </th>
                                <th id="hide-on-mobile">
                                    ImageUrl.
                                </th>
                                <th id="hide-on-mobile">
                                    quantityInStock.
                                </th>
                                <th id="hide-on-mobile">
                                    Price.
                                </th>
                                <th id="hide-on-mobile">
                                    IsActive.
                                </th>
                                <th id="hide-on-mobile">
                                    IsDeleted.
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
                            </tr>
                        </thead>
                        <tbody>
                                 {this.state.products[0] !== null ?
                                  this.state.products?.products?.map((data, index) => {
                                     return <OptionsComponent 
                                     reloadReconrds={this.reloadRecords}
                                     key={index}
                                     index={index}
                                     data={data}
                                     show={"yea"}
                                     service={this.state.productService}
                                     />
                                 }):null}
                        </tbody>
                    </table>
                </div>
                                <PaginationComponent
                                    currentPageNavigation={this.state.products?.currentPage}
                                    setCurrentPage={this.setPage}
                                    itemsPerPage={this.state.products?.pagesCount}
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

export default connect(mapStateToProps)(ProductsAdminPage);