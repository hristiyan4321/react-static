import React, { Component } from 'react';

class Layout extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<div className="container-fluid pl-0 pr-0">
				{this.props.children}
			</div>
		)
	}
}

export default Layout;