import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userReducer';
import basketReducer from './basketReducer';
import reloadReducer from './reloadReducer';

// to combine all reducers together
const appReducer = combineReducers({
	userReducer,
	basketReducer,
	reloadReducer,
});

export default appReducer;