import React from 'react';

// set cookie name of the cookie + value of the cookie + days to expire.
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const setCookieUser = (value) => {
    setCookie("user", value, 5);
}

const setCookieToken = (value) => {
    setCookie("token", value, 5);
}

export {
    setCookieUser,
    setCookieToken
};
export default setCookie;