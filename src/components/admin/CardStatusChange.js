import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'

const CardStatusChange=(props)=>{
    const item=props.item;
    return(
        <ListGroup.Item style={{width:'100%'}}>
            <div className="d-flex">
                <div className="p-2 w-100">
                    <p style={{margin:0,padding:0}}>Order No:{item.order_id}</p>
                    <div className="d-flex d-row">
                        <div className="p-2">{item.qty}X{item.price}</div>
                        <div className="p-2">Total:{item.qty*item.price}</div>
                    </div>
                </div>
                <div className="p-2 flex-lg-shrink-0">
                    <p style={{margin:0,padding:0}}>
                        {item.status_name}
                    </p>
                    <p style={{margin:0,padding:0}}>{item.created_at}</p>
                </div>
            </div>
        </ListGroup.Item>
    )
}
export default CardStatusChange;