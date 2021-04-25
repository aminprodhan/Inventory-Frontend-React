import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import * as productsCustomerAction from '../../actions/productsCustomerAction';
import ProductCard from './ProductCard';
import * as cartAction from '../../actions/cartAction';

const Products=(props)=>{

    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_customer);
    const myCart=useSelector(state=>state.cart);
    const rootUrl=info.imgProductUrl;


    //console.log("cart="+JSON.stringify(myCart)); //addedItems

    useEffect(() => {
        getProductsInfo();
    },[]);

    const handleAddToCart=(item)=>{
        dispatch(cartAction.addToCart(item));
      }
    const handleRemoveFromCart=(item)=>{
        dispatch(cartAction.subtractQuantity(item.id));
    }

    const getProductsInfo=async()=>{
        let info=productsCustomerAction.getCustomerProductsInfo();
        try{
            await dispatch(info);
        }
        catch(err){}
    }
    let Products=info.products.map(item =>{
        return(
            <div className="p-2">
                <ProductCard 
                        handleRemoveFromCart ={handleRemoveFromCart}
                        handleAddToCart={handleAddToCart} 
                        item={item} rootUrl={rootUrl} />
            </div>
        )
    })

    return(
        <div className="col-12">
            <div className="row justify-content-left">
                <div class="col-12 p-2">
                    <div className="row justify-content-left">
                        <h2 style={{margin:0,padding:0}}>Our Products</h2>
                    </div>
                    <div className="d-flex justify-content-left flex-wrap">
                        {Products}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Products;