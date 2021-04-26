import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import * as productsCustomerAction from '../../actions/productsCustomerAction';
import ProductCard from './ProductCard';
import * as cartAction from '../../actions/cartAction';
import ModalDynamic from "../modal/ModalDynamic";
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import {defaultRouteLink} from '../../common/config';
import ProductDetails from "./ProductDetails";

const Products=(props)=>{

    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_customer);
    const myCart=useSelector(state=>state.cart);
    const rootUrl=info.imgProductUrl;
    const modalInfoInit={
        isModalShow:false,
        modalText:'',
        modalHeaderBg:'',
        data:null,
    }
    const [modalInfo,setModalInfo]=useState(modalInfoInit);
    useEffect(() => {
        getProductsInfo();
    },[]);
    const handleModalClose=()=>{
        setModalInfo({
            ...modalInfo,
            isModalShow:false,
        });
    }
    const handleAddToCart=(item)=>{
        //dispatch(cartAction.addToCart(item));
        setModalInfo({
            ...modalInfo,
            isModalShow:true,
            modalText:"Task => "+item.name,
            data:item,
        });

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
    const handleMyOrder=()=>{
        props.history.push(defaultRouteLink+"my-order");
    }
    return(
        <>
            <div className="col-12">
                <div className="row justify-content-left">
                    <div class="col-12 p-2">
                        <div className="d-flex">
                            <div className="p-2 w-100">
                                <h2 style={{margin:0,padding:0}}>Our Products</h2>
                            </div>
                            <div className="p-2 flex-lg-shrink-0">
                                <Button onClick={handleMyOrder} variant="danger" size="lg" block>
                                    My Order <Badge variant="light">{info.orders.length}</Badge>
                                    <span className="sr-only"></span>
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-left flex-wrap">
                            {Products}
                        </div>
                    </div>
                </div>
            </div>
            <ModalDynamic 
                  showModal={modalInfo.isModalShow}
                  handleModalClose={handleModalClose}
                  modalTitle={modalInfo.modalText}
                  data={modalInfo.data}
                  {...props}  >
                    <ProductDetails 
                        data={modalInfo.data}
                        {...props} 
                        
                        />  
            </ModalDynamic>   
        </>
    )
}
export default Products;