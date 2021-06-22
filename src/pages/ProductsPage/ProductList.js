import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getParams } from '../../components/GetSearchedParams/Params';
import Loader from '../../components/Loader/Loader';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import { setReload } from '../../components/Redux/Actions/ReloadPage/Reload';
import store from '../../components/Redux/store';
import ProductService from '../../components/Services/Products/ProductService';
import SortOptions from '../../components/SortComponent/SortOptions';
import ProductBox from './ProductBox/ProductBox';

class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productService: new ProductService(),
            products: [],
            id: null,
            isLoaded: false,
            currentPage: 1,
            totalPages: 1,
            targetPage: "&targetPage=1",
            composeLink: "",
            sort: "",
            currentSearchQuery: "",
        }
    }

    getProd = async () => {
        let id = getParams("categoryId");
        let currentPage = getParams("targetPage");
        let sort = getParams("sort");
        if (sort === undefined || sort === null) {
            sort = "";
        }
        if (currentPage === undefined || currentPage === null) {
            currentPage = this.state.currentPage.toString();
        }
        if (id === null || id === undefined) {
            id = "";
        }

        const paramId = "?categoryId=";
        const targetPage = "&targetPage=";
        const sortParam = "&sort=";
        
        let composeLink = paramId + `${id}` + sortParam + sort;
          // Add search url query.
          const search = getParams("search");
          if (search !== undefined && search !== null) {
              composeLink += `&search=${search}`;
          }

          composeLink += targetPage;
  
        
        // TODO: Move to service.
        if (id !== null) {
            // check the url query string with the actual id.
            if (this.state.id !== null) {
                const result = await this.state.productService.getProducts(this.state.sort);

                console.log(result)
                
                this.setState({
                    products: result.products,
                    totalPages: result.pagesCount,
                    id: id,
                    isLoaded: false,
                    composeLink: "/product" + composeLink,
                });

            } else {
                const result = await this.state.productService.getProducts(this.state.sort);
                
                this.setState({
                    products: result.products,
                    totalPages: result.pagesCount,
                    id: id,
                    isLoaded: false,
                    composeLink: "/product" + composeLink,
                });
            }
        } else if (search !== undefined && search !== null) {
            
            const result = await this.state.productService.getProducts(this.state.sort);
                
                this.setState({
                    products: result.products,
                    totalPages: result.pagesCount,
                    id: id,
                    isLoaded: false,
                    composeLink: "/product" + composeLink,
                });
        }
    }

    componentDidMount = () => {
        const id = getParams("categoryId");
        let currentPage = getParams("targetPage");
        let sort = getParams("sort");
        if (sort === undefined || sort === null) {
            sort = "";
        }
        if (currentPage === undefined || currentPage === null) {
            currentPage = this.state.currentPage.toString();
        }

        const paramId = "?categoryId=";
        const targetPage = "&targetPage=";
        const sortParam = "&sort=";
        
        let composedLink = "/product" + paramId + `${id}` + sortParam + this.state.sort;
        
        // Add search url query.
        const search = getParams("search");
        if (search !== undefined && search !== null) {
            composedLink += `&search=${search}`;
        }

        composedLink += + targetPage;

        if (!this.state.isLoaded) {   
            this.getProd();

            this.setState({
                composedLink,
                currentPage: Number(currentPage),
            })
        }
        
        setTimeout(() => {
            this.getProd();
        }, 100);
    }

    setPage = (number) => {
        
        this.setState({
            currentPage: number,
        });
        setTimeout(() => {
            this.getProd();
        }, 100);
    }

    sortHandle = (e) => {
        e.preventDefault();
        const sort = e.target.value;

        this.setState({
            sort,
        });

        setTimeout(() => {
            this.getProd();
        }, 100);
    }

    componentDidUpdate = () => {
        const search = getParams("search");
        
        if (this.state.currentSearchQuery !== search) {
            this.getProd();

            this.setState({
                currentSearchQuery: search,
            })
        }
    }

    render() {
        
        const { reload } = this.props;
        if (reload) {
            this.getProd();
            
            store.dispatch(setReload(false));
        }

        return (
            <div className="products-container container">

                <SortOptions 
                    sortHandle={this.sortHandle}
                    showPrice={true}
                />

                <div className="row">

                    {this.state.products?.length > 0 ? 
                    this.state.products.map((data, index) => (
                        <div key={index} className="col-sm-4">
                            
                            <ProductBox
                            props={data}
                            />
                        </div>
                    ))
                    
                    :
                        <div className="text-center w-100 mt-5">

                            <h4>No results</h4>

                        </div>
                    }
                        {this.state.products?.length > 0 
                            ?
                                <div className="container">
                            <PaginationComponent
                                currentPageNavigation={this.state.currentPage}
                                itemsPerPage={this.state?.totalPages}
                                setCurrentPage={this.setPage}
                                composeLink={this.state.composeLink}
                            />
                            </div> : null}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		reload: state.reloadReducer.reload,
	}
}

export default connect(mapStateToProps)(ProductList);