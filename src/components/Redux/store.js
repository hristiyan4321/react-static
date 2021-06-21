import { createStore } from 'redux';
import appReducer from './Reducers/combineRed';

export default createStore(appReducer);