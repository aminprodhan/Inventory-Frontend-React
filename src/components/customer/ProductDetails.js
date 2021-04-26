
import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import AlertDialog from '../library/AlertDialog';
import * as productsCustomerAction from '../../actions/productsCustomerAction';
import {defaultRouteLink} from '../../common/config';

const ProductDetails=(props)=>{
    const info=useSelector(state=>state.products_customer);
    const dispatch=useDispatch();

    const rootUrl=info.imgProductUrl;
    const item=props.data;
    const [orderQty,setOrderQty]=useState(1);
    const [value, setValue] = useState([1, 3]);
    const[confirmAlert,setConfirmAlert]=useState({
        open:false,
        message:'Are you sure ?',
        title:'Confirmation',
        item:null,
        pendingProcess:false,
    });

    const handleChange = (val,item) =>{
        if(val == 3)
                setOrderQty(orderQty + 1);
        else if(val == 1)
        {
            let afterDec=orderQty - 1;
            if(afterDec <= 0)
                afterDec=1;
            setOrderQty(afterDec);   
        }
    }
    const handleModalClose=()=>{
        props.handleModalClose();
        setOrderQty(1);
    }
    const handleAlertDialogClose=()=>{
        setConfirmAlert({
            ...confirmAlert,
            open:false,
        })
    }
    const handleAlertDialogOpen=(item)=>{
        setConfirmAlert({
            ...confirmAlert,
            open:true,
        })
    }
    const handleOrder=async()=>{

        setConfirmAlert({
            ...confirmAlert,
            message:'Loading....',
            pendingProcess:true,
        });
        let actions=productsCustomerAction.makeOrder(item,orderQty);
        try{
            await dispatch(actions);
            window.location=defaultRouteLink+"my-order"
        }
        catch(err){
            
        }   
    }
    const handleOrderConfirm=()=>{
        setConfirmAlert({
            ...confirmAlert,
            open:true,
        })
    }
    return(
        <>
            <div className="col-12">
                <div className="row">
                <div className="col-6">
                    <div className="row justify-content-center">
                        <div className="col-12 p-10">
                            {
                                (item) ? (
                                    <img style={{width:300,height:300}} 
                                            src={rootUrl+""+item.image} />
                                ) : null
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row justify-content-left">
                        {
                            (item) ? (
                                <div>
                                    <h1 style={{margin:0,padding:0,fontFamily:'segoe ui,Helvetica,droid sans,Arial,lucida grande,tahoma,verdana,arial,sans-serif'}}>
                                        {item.name}    
                                    </h1>
                                    <div style={{fontSize:18,fontWeight:'bold'}}>
                                        <span>{'\u09F3'}</span> <span>{item.price}</span>      
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="p-2">
                                            <ToggleButtonGroup   type="checkbox" value={value} 
                                                    onChange={(val) => handleChange(val,item)} style={{width:'100%',backgroundColor:'#454365'}}>
                                                    <ToggleButton variant="danger" value={3}>-</ToggleButton>
                                                    <ToggleButton variant="danger" value={2}>{orderQty} in bag</ToggleButton>
                                                    <ToggleButton variant="danger" value={1}>+</ToggleButton>
                                            </ToggleButtonGroup>     
                                        </div>
                                        <div className="p-2">
                                            <Button className="" 
                                                    onClick={() => handleOrderConfirm()} 
                                                    variant="primary" size="sm" block style={{height:40,width:100}} >
                                                Order
                                            </Button>
                                        </div>       
                                    </div>
                                    <div className="d-flex flex-row">
                                        <span>{item.description}</span>    
                                    </div>    
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
            </div>
            <AlertDialog 
                open={confirmAlert.open}
                title={confirmAlert.title}
                message={confirmAlert.message}
                pendingProcess={confirmAlert.pendingProcess}
                handleDialogConfirm={handleOrder}
                handleDialogClose={handleAlertDialogClose}
            />
        </>
    )
}
export default ProductDetails;