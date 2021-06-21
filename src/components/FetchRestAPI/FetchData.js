import react from 'react';
import getCookie from '../Cookies/GetCookie';
import url from '../BaseUrl/BaseUrl';
import { GET, POST } from '../RequestMethods/Methods';

// Fetch data from back end with all crud operations.
const FetchData = async (apiController, payload, method) => {
    try {
        // Get from local storage auth token.
        const token = localStorage.getItem('token');

        let second_parametar = {};

        const first__parametar = url(apiController).toString();
        if (method === POST) {
            second_parametar = {
                "method": `${method}`,
                "headers": {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }, body: JSON.stringify(payload)
            };
        } else if (method === GET) {
            second_parametar = {
                "method": `${method}`,
                "headers": {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            };
        }

        const result = await fetch(first__parametar, second_parametar)
            .then(res => {
                return res.json();
            }).catch(err => {
                const error = {
                    error: err
                }
                return error;
            });

        if (await result) {
            //console.log(result);
            return result;
        }

    } catch (e) {
        const error = {
            error: e
        }
        return error;
    }
}

export default FetchData;