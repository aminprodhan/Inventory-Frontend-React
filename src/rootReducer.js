import { combineReducers } from 'redux';
import auth from './reducers/auth';
import products_admin from './reducers/products';
export default combineReducers({
    auth,
    products_admin,
});