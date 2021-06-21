import { ADD_TO_BASKET } from "../Actions/actionTypes";


// define initial state of user.
const initialState = {
    basket: [],
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
	console.log(action.payload);
    switch (action.type) {
        case ADD_TO_BASKET:
            const { basket } = action.payload;
            return {
                ...state,
                basket: basket,
            };
        default:
            return state
    }
}