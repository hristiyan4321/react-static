import { ADD_TO_BASKET } from '../actionTypes';

export const setBasket = basket => {
    return {
        type: ADD_TO_BASKET,
        payload: {
            basket: basket,
        }
    }
}