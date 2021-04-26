
import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import * as productsActions from '../../actions/productsActions';
import CardStatusChange from "./CardStatusChange";
import Button from 'react-bootstrap/Button'

const OrderStatusForm=(props)=>{
    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_customer);
    const [statusId,setStatusId]=useState(0);
    const [pendingProcess,setPendingProcess]=useState(false);
    const [errors,setErrors]=useState(null);
    let cardByStatus=info.orderStatuses.map(item =>{
        if(item.id <= props.item.order_status)
            return;
        return(
            <option value={item.id}>{item.name}</option>
        )
    });
    const handleSubmit=async()=>{
        if(statusId == 0){
            setErrors("Please select a status!!!");
        }
        else{
            setPendingProcess(true);
            let info=productsActions.updateOrderStatus(props.item,statusId);
            try{
                await dispatch(info);
                props.handleModalClose();
            }
            catch(err){}
        }
    }
    const handleInputChange=(e)=>{
        setStatusId(e.target.value);
    }

    return(
        <div className="col-12 offset-2">
            <div className="row">
                <div className="p-2">
                    <h1>Change My Order Status</h1>
                    {
                        (errors) ? (<div class="p-3 mb-2 bg-danger text-white">{errors}</div>) : null
                    }
                </div>
            </div>
            <div className="row">
                <div className="p-2">
                    <CardStatusChange {...props} />
                </div>
            </div>
            <div className="row">
                <div className="p-2">
                    <label>Status</label>
                    <select onChange={handleInputChange} className="form-control">
                        <option value="0"></option>
                        {cardByStatus}
                    </select>
                </div>
            </div>
            <div className="row"> 
                <div className="p-2">

                    <Button disabled={pendingProcess ? true:false} onClick={handleSubmit} variant="danger" size="sm" block>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default OrderStatusForm;