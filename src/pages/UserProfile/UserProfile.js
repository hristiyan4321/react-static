import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import UserService from '../../components/Services/User/UserService';
import Profile from './Profile';

class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: null,
            userService: new UserService(),
        }
    }

    componentDidMount = async () => {
        this.getUserProf();
    }

    getUserProf = async () => {
        const prof = await this.state.userService.getUserProfile();
        console.log(prof);
        if (prof) {
            this.setState({
                profile: prof,
            });
        }
    }

    updateAddress = async (payload) => {
        const error = document.getElementById("errorProfile");
        error.innerHTML = "";
        const result = await this.state.userService.updateAddress(payload);
        
        if (result?.error) {
            error.innerHTML = result.error;
        } else if (result?.errors) {
            
			error.innerHTML = "";

			let arrayOfErrors = Object.values(result.errors);

			arrayOfErrors.forEach((item, index) => {
				error.innerHTML += item + "<br />";
			});
        } else {
            error.innerHTML = "Success."
        }

        this.setState({
            profile: null,
        });

        this.getUserProf();
    }

    updateProfile = async (payload) => {
        const result = await this.state.userService.updateProfile(payload);
        
        const error = document.getElementById("errorProfile");
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
            error.innerHTML = "Success."
        }
    }

    getAddress = async () => {
        const error = document.getElementById("errorProfile");
        error.innerHTML = "";
        const result = await this.state.userService.getAddress();
        
        if (result?.error) {
            error.innerHTML = result.error;
        } else if (result?.errors) {
            
			error.innerHTML = "";

			let arrayOfErrors = Object.values(result.errors);

			arrayOfErrors.forEach((item, index) => {
				error.innerHTML += item + "<br />";
			});
        } else {
            error.innerHTML = "Success."
        }

        return result;
    }

    render() {
        return(
            <div>
                {this.state.profile !== null ? <Profile
                    getAddress={this.getAddress}
                    updateAddress={this.updateAddress}
                    updateProfile={this.updateProfile}
                    email={this.state.profile.email} 
                    firstName={this.state.profile.firstName}
                    lastName={this.state.profile.lastName}
                    phoneNumber={this.state.profile.phoneNumber}
                    addresses={this.state.profile.addresses}
                    />
                    :
                    <Loader />
                }

                <span className="text-danger" id="errorProfile"></span>
            </div>
        )
    }
}

export default UserProfile;