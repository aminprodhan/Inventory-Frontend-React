
import React,{useRef,useState,useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CreateProduct from './CreateProduct';
import * as productsAction from '../../../actions/productsActions';
import {useDispatch,useSelector} from 'react-redux';
import ProductList from './ProductList';

const ManageProducts=(props)=>{
    const dispatch=useDispatch();

    useEffect(() => {
        getProductsInfo();
    },[]);

    const getProductsInfo=async()=>{
        let info=productsAction.getProductsInfo();
        try{
            await dispatch(info);
        }
        catch(err){
            
        }
    }

    return(
        <div className="col-12" style={{marginLeft:10}}>
            
            <div className="row justify-content-left">
                <div class="col-8 p-4">
                    <div className="row justify-content-left">
                        <h2 style={{margin:0,padding:0}}>Manage Product</h2>
                    </div>
                    <div className="row justify-content-left">
                        <ProductList />
                    </div>
                </div>
                <div class="col-4 p-4" style={{backgroundColor:'#fff'}}>
                        <CreateProduct />
                </div>
            </div>
        </div>            
    )
}
export default ManageProducts;