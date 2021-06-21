import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaginationComponent from '../../../components/Pagination/PaginationComponent';
import ParentCategoryService from '../../../components/Services/ParentCategory/ParentCategoryService';
import SortOptions from '../../../components/SortComponent/SortOptions';
import CreateParentCategory from './Create/CreateParentCategory';
import OptionsComponent from './Options/OptionsComponent';

class ParentCategoryAdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parentCategories: [],
            parentCategoryService: new ParentCategoryService(),
            createButton: false,
            reloadReconrds: false,
            currentPage: "1",
            composeLink: "/admin/parentCategories?targetPage=",
            sort: "",
        }
    }

    componentDidMount = () => {
        this.getCategories();
    }

    getCategories = async () => {
        const result = await this.state.parentCategoryService.getCategoriesAdmin(this.state.sort);
        
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
                parentCategories: await result,
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
            this.getCategories();
        }, 100);
    }

    reloadRecords = () => {
        this.getCategories();
    }
    
    sortHandle = (e) => {
        e.preventDefault();
        const sort = e.target.value;

        this.setState({
            sort,
        });

        setTimeout(() => {
            this.getCategories();
        }, 100);
    }
    
    render() {

        if (this.state.createButton) {
            return <CreateParentCategory
            reloadRecords={this.reloadRecords} 
            back={this.back}
            />;
        }

        return (
            <div  className="container-fluid w-100">
                <span id="errorCategories" className="text-danger"></span>
                
                <SortOptions 
                    sortHandle={this.sortHandle}
                    showName={true}
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
                                 {this.state.parentCategories[0] !== null ?
                                  this.state.parentCategories?.parentCategories?.map((data, index) => {
                                     return <OptionsComponent 
                                     reloadReconrds={this.reloadRecords}
                                     key={index}
                                     index={index}
                                     data={data}
                                     service={this.state.parentCategoryService}
                                     />
                                 }):null}
                        </tbody>
                    </table>
                </div>
                                <PaginationComponent
                                    currentPageNavigation={this.state.parentCategories?.currentPage}
                                    setCurrentPage={this.setPage}
                                    itemsPerPage={this.state.parentCategories?.pagesCount}
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

export default connect(mapStateToProps)(ParentCategoryAdminPage);