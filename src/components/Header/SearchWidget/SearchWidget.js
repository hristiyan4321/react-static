import React, { Component, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, FormControl, Form } from 'react-bootstrap';
import { Collapse, Container, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ProductList from '../../../pages/ProductsPage/ProductList';
import { setReload } from '../../Redux/Actions/ReloadPage/Reload';
import store from '../../Redux/store';

const SearchWidget = () => {
	const history = useHistory();
	
	const [state, setState] = useState({
		search: null,
	});

	const searchHandle = (e) => {
		e.preventDefault();
		const searchWord = e.target.search.value;
		if (searchWord !== undefined && searchWord !== null) {
			
			let redirect = `/product?search=${searchWord}`;
			history.push(redirect);

			store.dispatch(setReload(true));
		}
	}

	return (
		<Form style={{'width':'55%'}} className="d-flex pl-md-3 pr-md-3" onSubmit={searchHandle}>
			<div className="d-flex">
				<FormControl

					style={{ 'width': '540px', 'height':'45px' }}
					type="text"
					placeholder="Search"
					className="pr-sm-2  search-fields"
					onChange={(e) => setState({ search: e.target.value })}
					value={state.search}
					name="search"
				/>

				<Button
					style={{ 'height': '45px' }}
					type="submit"
					variant="primary"
					className="glyphicon glyphicon-search search__button ml-lg-2"
				>
					Search
				</Button>

			</div>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		reload: state.reloadReducer.reload
	}
}

export default connect(mapStateToProps)(SearchWidget);