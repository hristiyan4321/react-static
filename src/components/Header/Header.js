import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, setUser } from '../Redux/Actions/User/addUser';
import store from '../Redux/store';
import NavigationBar from './NavigationBar';

class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	addUserToRedux = () => {
		store.dispatch(setUser({ name: "ico" }));
		
		setTimeout(() => {
			const { user } = this.props;
			//console.log(user.name);
		}, 200);
	}

	render() {
		return (
			<div>
				<NavigationBar />


				{/*<button className="btn btn-success" onClick={this.addUserToRedux}>*/}
				{/*	Add user test*/}
				{/*</button>*/}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(Header);