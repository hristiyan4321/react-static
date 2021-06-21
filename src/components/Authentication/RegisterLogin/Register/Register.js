import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import FetchData from '../../../FetchRestAPI/FetchData';
import { POST } from '../../../RequestMethods/Methods';
import PushToRoute from '../../../RouteSwitcher/PushToRoute';
import { Redirect } from 'react-router';
import { REGISTER_USER_URL } from '../../../QueryLinks/QueryLinks';

class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			userName: "",
			buttonPushed: false,
		}
	}

	signUpFunc = async (e) => {
		e.preventDefault();
		this.setState({
			buttonPushed: true,
		});
		let error = document.getElementById('errors');
		error.innerHTML = "";
		const email = e.target.email.value;
		const userName = e.target.userName.value;
		const password = e.target.password.value;
		const confirmPassword = e.target.confirmPassword.value;
		
		if (password === confirmPassword) {
			error.innerHTML = "Processing...";

			let payload = {
				email,
				userName,
				password,
				confirmPassword,
			}

			try {
				const result = await FetchData(REGISTER_USER_URL, payload, POST);
				if (await result === 'User created') {
					error.innerHTML = "Successfully registered";

					this.setState({
						buttonPushed: false,
						isRegistered: true,
					});
				} else if (await result?.errors) {
					this.setState({
						buttonPushed: false,
					});

					error.innerHTML = "";

					let arrayOfErrors = Object.values(result.errors);

					arrayOfErrors.forEach((item, index) => {
						error.innerHTML += item + "<br />";
					});
				} else {
					this.setState({
						buttonPushed: false,
					});

					error.innerHTML = "Invalid data";

				}

			} catch (e) {
				console.log(e);
			}
		} else {
			this.setState({
				buttonPushed: false,
			});
		}
	}

	userHandler = (e) => {
		const user = e.target.value;
		const error = document.getElementById('userError');
		error.innerHTML = null;
		if (user.length < 3) {
			error.innerHTML = "User name length must be at least 3 symbols";
		} else {
			this.setState({ userName: user });
		}
	}

	emailHandler = (e) => {
		let errorEmail = document.getElementById('emailError');
		const email = e.target.value;
		errorEmail.innerHTML = null;
		if (email.length < 7) {
			if (email.length < 7) {
				errorEmail.innerHTML = "Length must at least 6 symbols";
			} else {
				errorEmail.innerHTML = "Invalid email";
			}
		}
	}

	passwordHandler = (e) => {
		const pass = e.target.value;
		const error = document.getElementById('passError');
		error.innerHTML = null;
		if (pass.length < 6) {
			error.innerHTML = "Password length must be at least 6 symbols";
		} else {
			this.setState({ password: pass });
		}
	}

	confirmPassHandler = (e) => {
		const pass = e.target.value;
		const error = document.getElementById('confirmPassword');
		error.innerHTML = null;
		if (pass !== this.state.password) {
			error.innerHTML = "Passwords does not match";
		}
	}

	render() {
		if (this.state.isRegistered) {
			console.log('Redirecting..')
			return <Redirect to='/login' />
		}

		return (
			<div className="container">

				<h4 className="text-primary">Register</h4>

				<span id="errors" className="text-danger"></span>

				<div className="container d-flex justify-content-center">

					<form className="registerForm text-center" onSubmit={this.signUpFunc}>

						<h3 className="text-white shadow-box">Email</h3>
						<FormControl className="userInput m-auto" onChange={this.emailHandler} type="email" name="email" maxLength="50" required placeholder="Email" />
						<span id="emailError"></span>

						<h3 className="text-white shadow-box">User name</h3>
						<FormControl onChange={this.userHandler} type="text" className="passwordInput m-auto" maxLength="60" placeholder="User name" id="user" name="userName" />
						<span id="userError"></span>

						<h3 className="text-white shadow-box">Password</h3>
						<FormControl onChange={this.passwordHandler} type="password" className="passwordInput m-auto" maxLength="60" placeholder="Password" id="password" name="password" />
						<span id="passError"></span>

						<h3 className="text-white shadow-box">Confirm password</h3>
						<FormControl onChange={this.confirmPassHandler} type="password" className="passwordInput m-auto" maxLength="60" placeholder="Confirm password" name="confirmPassword" />
						<span id="confirmPassword"></span>

						<h3></h3>
						{this.state.buttonPushed ?
							<em>Loading...</em> :
							<input type="submit" value="Submit to register" className="btn btn-primary buttons" />}

					</form>

					<div className="spacer"></div>
				</div>



			</div>
		)
	}
}

export default Register;