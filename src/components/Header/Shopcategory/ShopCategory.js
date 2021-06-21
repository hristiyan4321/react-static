import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, FormControl, Form, Dropdown } from 'react-bootstrap';
import { Collapse, Container, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FetchData from '../../FetchRestAPI/FetchData';
import Loader from '../../Loader/Loader';
import { getCategories } from '../../QueryLinks/QueryLinks';
import store from '../../Redux/store';
import { GET } from '../../RequestMethods/Methods';
import CategoryService from '../../Services/Category/CategoryService';
import CategoryList from './CategoryList';
import './ShopCategory.css';
import { setReload } from '../../Redux/Actions/ReloadPage/Reload';
import ParentCategoryService from '../../Services/ParentCategory/ParentCategoryService';

class ShopCategory extends Component {
	constructor(props) {
		super(props)

		this.state = {
			parentCategories: [],
			id: null,
			loadAgain: false,
			redirectToProduct: false,
			categoryInstance: new ParentCategoryService(),
		}
	}

	componentDidMount = async () => {
		await this.getCate();
	}

	getCate = async () => {
		const result = await this.state.categoryInstance.getCategories();
		if (result.error) {
			// TODO catch error.
		} else {
			if (result?.perantCategories) {
				console.log(result);
				this.setState({
					parentCategories: result.perantCategories,
				})
			}
		}
	}

	render() {

		if (this.state.loadAgain) {
			this.getCate();
			this.setState({
				loadAgain: false,
			});
		}

		const { reload } = this.props;
		if (reload) {
			this.getCate();
			store.dispatch(setReload(false))
		}
		
		return (
			<Dropdown>
				<Dropdown.Toggle  variant="" id="dropdown-basic">
					Shop by category
  </Dropdown.Toggle>

				<Dropdown.Menu className="drop-menu-items">
				{!this.state.loadAgain ? this.state?.parentCategories.map((data, index) => (
					
					<div className="parent-drop-items pl-2" key={index}>
						<text className="text-primary">{data.name}</text>
						{data?.categories.map((categories, catIndex) => (
							
							!categories.isDeleted ?<CategoryList categories={categories} /> : null
							//<Link className="d-block pl-3 text-secondary" to={"/product?id=" + categories.id}>{categories.name}</Link>
						))}
					</div>
					
					)) : <Loader />}
					
				</Dropdown.Menu>
				

			</Dropdown>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		reload: state.reloadReducer.reload
	}
}

export default connect(mapStateToProps)(ShopCategory);