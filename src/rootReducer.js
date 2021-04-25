import { combineReducers } from 'redux';
import auth from './reducers/auth';
import products_admin from './reducers/products';
import products_customer from './reducers/products_customer';
import cart from './reducers/reducerCart';

export default combineReducers({
    auth,
    products_admin,
    products_customer,
    cart,
});