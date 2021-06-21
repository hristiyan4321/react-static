import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FetchData from '../../../FetchRestAPI/FetchData';
import setCookie from '../../../Cookies/SetCookie';
import { LOGIN_USER_URL } from '../../../QueryLinks/QueryLinks';
import { setUser } from '../../../Redux/Actions/User/addUser';
import store from '../../../Redux/store';
import { POST } from '../../../RequestMethods/Methods';
import UserService from '../../../Services/User/UserService';

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			buttonPresed: false,
			passwordState: "",
			emailState: "",
			user: {},
			userService: new UserService(),
		}
	}

	addUserToRedux = () => {
		store.dispatch(setUser(this.state.user));
	}

	loginFunc = async (e) => {
		this.setState({
			buttonPresed: true,
		});


		console.log(this.props);

		e.preventDefault();
		let error = document.getElementById('errors');
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {

			if (email.length > 5 && password.length > 5) {

				error.innerHTML = "Processing...";

				let payload = {
					"email": email,
					"password": password
				}

				let notLoged = false;

				let user = await FetchData(LOGIN_USER_URL, payload, POST);
				
				if (await user?.email && await user?.token) {

					// Setting user token in local storage.
					localStorage.setItem("token", user.token);

					// Setting cookie user
					user.user ? setCookie("user", user.user) :
						setCookie("user", user.email);

					if (await user?.roles) {
						setCookie('roles', user.roles.map(data => data + ","), 5);						
					}

					error.innerHTML = "Success";
					this.setState({
						isLoggedIn: true,
						user: await this.state.userService.getUserProfile(),
					});

					setTimeout(() => {
						this.addUserToRedux();
					}, 100);

				} else if (user?.errors) {

					error.innerHTML = "";

					let arrayOfErrors = Object.values(user.errors);

					arrayOfErrors.forEach((item, index) => {
						error.innerHTML += item + "<br />";
					});

					this.setState({
						buttonPresed: false
					});


				} else if (user?.error) {
					this.setState({
						buttonPresed: false
					});

					error.innerHTML = "Wrong email or password";
				} else {
					this.setState({
						buttonPresed: false
					});

					error.innerHTML = "Wrong email or password";
				}

			} else {
				if (email.length < 6) {
					this.setState({
						buttonPresed: false
					});

					error.innerHTML = "Email addres lenght must be at least 6 symbols";

				} else if (password.length < 6) {
					this.setState({
						buttonPresed: false
					});

					error.innerHTML = "Password length must be at least 6 symbols";

				}
			}

		} catch (e) {
			this.setState({
				buttonPresed: false
			});

			console.log(e);
			error.innerHTML = "server error";

			//error.innerHTML = "server error";
		}
	}

	emailHandler = (e) => {
		const email = e.target.value;
		const error = document.getElementById('emailError');
		error.innerHTML = null;
		if (email.length < 6) {
			error.innerHTML = "Email addres lenght must be at least 6 symbols";
		}

		// add regex
		if (email.length <= 20) {
			this.setState({
				emailState: email,
			});
		}
	}

	passwordHandler = (e) => {
		const password = e.target.value;
		const pass = e.target.value;
		const error = document.getElementById('passError');
		error.innerHTML = null;
		if (pass.length < 6) {
			error.innerHTML = "Password length must be at least 6 symbols";
		}

		// add regex
		if (pass.length <= 40) {
			this.setState({
				passwordState: password,
			});
		}
	}

	render() {

		if (this.state.isLoggedIn) {
			console.log('Redirecting..')
			return <Redirect to='/' />
		}

		return (
			<div className="container">
				<h3 className="logo">Log in</h3>
				<h3 id="errors" className="text-danger text-center error" ></h3>

				<div className="container d-flex justify-content-center">

					<form className="registerForm text-center" onSubmit={this.loginFunc}>

						<h3 className="text-white shadow-box">Email</h3>
						<FormControl
							onChange={this.emailHandler}
							className="userInput m-auto"
							value={this.state.emailState}
							type="Email"
							name="email"
							maxLength="50"
							placeholder="Email"
						/>
						<span id="emailError"></span>

						<h3 className="text-white shadow-box">Password</h3>
						<FormControl
							type="password"
							onChange={this.passwordHandler}
							className="passwordInput m-auto"
							maxLength="60"
							value={this.state.passwordState}
							placeholder="Password"
							name="password"
						/>
						<span id="passError"></span>

						<h3></h3>
						{this.state.buttonPresed ? <em>Loading..</em> : <input
							type="submit"
							value="Log in"
							className="btn btn-primary buttons"
						/>}
						<br />
						<Link
							to="/register"
							className="text-infos">
							<div className="btn btn-primary mt-2">
								<span className="register__link  shadow-box">Create new account</span>
							</div>
						</Link>

					</form>



					<div className="spacer"></div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(Login);