import { ADD_USER } from "../actionTypes";

export const addUser = () => ({ type: ADD_USER });

export const setUser = user => {
    return {
        type: ADD_USER,
        payload: {
            user: user
        }
    }
}