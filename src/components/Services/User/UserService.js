import React, { Component } from 'react';
import FetchData from '../../FetchRestAPI/FetchData';
import { getParams } from '../../GetSearchedParams/Params';
import { EDIT_USER_PROFILE_URL, GET_USER_PROFILE_URL, EDIT_USER_ADDRESS_URL, GET_USER_ADDRESS_URL, GET_USER_ORDERS_URL } from '../../QueryLinks/QueryLinks';
import { GET, POST } from '../../RequestMethods/Methods';

class UserService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            address: null,
        }
    }
    
    getOrders = async (targetPage) => {
        let page = "1";
        if (targetPage !== undefined) {
            page = targetPage
        } else {
            page = getParams("targetPage");
        }

        const composeLink = GET_USER_ORDERS_URL + "?targetPage=" + Number(page);
        const result = await FetchData(composeLink,null, GET);
        return await result;
    }

    updateAddress = async (payload) => {
        
        const result = await FetchData(EDIT_USER_ADDRESS_URL, payload, POST);
        // console.log(result.errors);
        if (await result) {
            this.setState({
                profile: result,
            });
            return result;
        }

        return null;
    }

    getAddress = async () => {
        
        const result = await FetchData(GET_USER_ADDRESS_URL, null, GET);
        
        if (await result) {
            this.setState({
                address: result,
            });
            return result;
        }

        return this.state.address;
    }

    updateUserAddress = async (payload) => {
        
        const result = await FetchData(EDIT_USER_ADDRESS_URL, payload, POST);

        if (await result) {
            this.setState({
                profile: result,
            });
            return result;
        }

        return null;
    }

    updateProfile = async (payload) => {
        
        const result = await FetchData(EDIT_USER_PROFILE_URL, payload, POST);
        // console.log(result.errors);
        if (await result) {
            this.setState({
                profile: result,
            });
            return result;
        }

        return this.state.profile;
    }

    getUserProfile = async () => {
        
        const result = await FetchData(GET_USER_PROFILE_URL, null, GET);

        if (await result) {
            this.setState({
                profile: result,
            });
            return result;
        }

        return this.state.profile;   
    }
}

export default UserService;