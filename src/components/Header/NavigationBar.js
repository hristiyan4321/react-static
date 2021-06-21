import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, FormControl, Form } from 'react-bootstrap';
import { Collapse, Container, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { upPage } from '../UpPage/Uppage';
import SearchWidget from './SearchWidget/SearchWidget';
import ShopCategory from './Shopcategory/ShopCategory';
import './NavigationBar.css';
import { connect } from 'react-redux';
import store from '../Redux/store';
import { setUser } from '../Redux/Actions/User/addUser';
import setCookie from '../Cookies/SetCookie';
import getCookie from '../Cookies/GetCookie';
import BasketComponent from './Basket/BasketComponent';
import UserService from '../Services/User/UserService';

class NavigationBar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLogged: false,
			user: null,
			userService: new UserService(),
		}
	}

	logOutHandle = () => {
		localStorage.removeItem("token");
		setCookie('user', null, -1);
		setCookie('roles', null, -1);
		this.addUserToRedux(null);
	}

	componentDidMount = async () => {
		const loggedUser = getCookie('user');
		if (loggedUser !== null && loggedUser.length > 0 && this.state.user?.firstName === undefined) {
			this.setState({
				user: loggedUser
			});

			const profile = await this.state.userService.getUserProfile();
			if (profile.error || profile.errors) {
				
			} else {
				this.addUserToRedux(profile);
			}
		}
	}

	addUserToRedux = (user) => {
		store.dispatch(setUser(user));
	}

	render() {

		const { user } = this.props;

		return (
			<Navbar bg="light" className="d-flex sticky-top header mb-0" expand="lg">

				<Link
					onClick={upPage}
					to="/">
					<img
						className="header-logo text-left"
						src="https://th.bing.com/th/id/Rb521676e1c9e17118ca0223982b92323?rik=O0RU6nWwLRKk4g&pid=ImgRaw" alt="TODO"
					/>
				</Link>

				<Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
				<Navbar.Collapse id="basic-navbar-nav">

					<div
						className="d-lg-flex w-100 ">
						<Link
							className="ml-lg-3 search-fields"
							onClick={upPage}
							to="/">
							<ShopCategory />
						</Link>

						<SearchWidget />

						<BasketComponent />

						<div className="account-parent">

							{user?.email ?
								<div className="d-flex">
									<Link
										className="link-visuals text-secondary mr-md-4 pl-md-3 pt-md-1"
										onClick={upPage}
										to="/profile">
										{user?.email ? <div className="link-visuals">Profile</div> : null}
									</Link>

									<div className="pt-1 logout-button link-visuals" onClick={ this.logOutHandle }>Logout</div>

								</div>
								:
								
								<Link
								className="link-visuals text-secondary mr-md-4 pt-sm-1"
								onClick={upPage}
								to="/Login">
									Account
							</Link>
							}
						</div>

					</div>
				</Navbar.Collapse>
			</Navbar>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(NavigationBar);