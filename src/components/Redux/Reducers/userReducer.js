import { ADD_USER } from "../Actions/actionTypes";


// define initial state of user.
const initialState = {
    user: {}
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
	console.log(action.payload);
    switch (action.type) {
        case ADD_USER:
            const { user } = action.payload;
            return {
                ...state,
                user: user
            };
        //case DECREMENT:
        //    return {
        //        ...state,
        //        count: state.count - 1
        //    };
        //case RESET:
        //    return {
        //        ...state,
        //        count: 0
        //    };
        //case SET_COUNTER_TITLE:
        //    const { title } = action.payload;
        //    return {
        //        ...state,
        //        counterTitle: title
        //    }
        default:
            return state
    }
}