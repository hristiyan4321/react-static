import React from 'react';
import { useHistory } from 'react-router';
import setCookie from '../../Cookies/SetCookie';

const Logout = (pressed) => {
	localStorage.removeItem("token");
	setCookie('user', null, -1);
	setCookie('roles', null, -1);
    const history = useHistory();
    if (pressed) {
        history.push('/');
    }
}

export default Logout;