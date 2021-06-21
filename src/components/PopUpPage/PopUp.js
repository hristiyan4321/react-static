import React from 'react';
import { Component } from 'react';
import './PopUp.css';

class PopUp extends Component {

    render() {
        return (
            <div className="pop-ups">
            {this.props.children}
        </div>
    )}
}

export default PopUp;