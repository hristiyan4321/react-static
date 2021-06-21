import { RELOAD_PAGE } from "../Actions/actionTypes";


// define initial state.
const initialState = {
    reload: false,
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {

    switch (action.type) {
        case RELOAD_PAGE:
            const { reload } = action.payload;
            return {
                ...state,
                reload: reload,
            };
        default:
            return state
    }
}