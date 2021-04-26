import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import * as productsCustomerAction from '../actions/productsCustomerAction';
import ModalDynamic from "./modal/ModalDynamic";
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {defaultRouteLink,GetStatusColor} from '../common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';
import {getAccessTokenName} from '../common/config';
import OrderStatusForm from "./admin/OrderStatusForm";



const MyOrder=(props)=>{
    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_customer);
    const isLoginExit=getCookieKeyInfo(getAccessTokenName);
    const modalInfoInit={
        isModalShow:false,
        modalText:'',
        modalHeaderBg:'',
        data:null,
    }
    const [modalInfo,setModalInfo]=useState(modalInfoInit);

    let statusId=0;
    if(typeof props.location.state != 'undefined')
        statusId=props.location.state.status_id;
    const isExistStatus=info.orderStatuses.find(item => item.id == statusId);
    const role_id=isLoginExit.role_id;

    useEffect(() => {
        getMyOrder();
    },[]);
    const handleModalClose=()=>{
        setModalInfo({
            ...modalInfo,
            isModalShow:false,
        });
    }
    const getMyOrder=async()=>{
        let info=productsCustomerAction.getMyOrder();
        try{
            await dispatch(info);
        }
        catch(err){}
    }
    const handleChangeStatus=(item)=>{
        setModalInfo({
            ...modalInfo,
            isModalShow:true,
            modalText:"Task => "+item.name,
            data:item,
        });
    }
    let myOrders=info.orders.map(item => {
        if(statusId > 0 && item.order_status != statusId)
            return null;

        const color=GetStatusColor(item.order_status);

        return(
            <ListGroup.Item>
                <div className="d-flex">
                    <div className="p-2 w-100">
                        
                        <p style={{margin:0,padding:0}}>Order No:{item.order_id}</p>
                        <div className="d-flex d-row">
                            <div className="p-2">{item.qty}X{item.price}</div>
                            <div className="p-2">Total:{item.qty*item.price}</div>
                        </div>
                    </div>
                    <div className="p-2 flex-lg-shrink-0">
                        <p className={color} style={{margin:0,padding:0,fontWeight:'bold',fontSize:16}}>
                            {item.status_name}
                        </p>
                        <p style={{margin:0,padding:0}}>{item.created_at}</p>
                        {
                            (role_id == 1) ? 
                                (
                                    <Button onClick={()=>handleChangeStatus(item)} variant="danger" size="sm" block>
                                        Action
                                    </Button>
                                ) : null
                        }
                    </div>
                </div>
            </ListGroup.Item>
        )
    })
    
    const handleNewOrder=()=>{
        props.history.push("/");
    }
    return(
            <>
                <div className="row" style={{minHeight:'90vh',marginTop:20}}>
                <div className="col-12 offset-2">
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={8}>
                            <div>
                                <div className="d-flex">
                                    <div className="p-2 w-100">
                                        <h2 style={{margin:0,padding:0}}>My Order
                                            {(isExistStatus)?(`(${isExistStatus.name})`):null}
                                        </h2>
                                    </div>
                                    <div className="p-2 flex-lg-shrink-0">
                                        {
                                            (role_id == 2) ? 
                                                (
                                                    <Button onClick={handleNewOrder} variant="danger" size="sm" block>
                                                        New Order
                                                    </Button>
                                                ) : null
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    (info.orders.length <= 0)  ? <h1>You have no order</h1> :(
                                        <ListGroup>{myOrders}</ListGroup>
                                    )
                                }
                            </div>
                        </Col>
                        {/* <div className="col-8">
                            {
                                (info.orders.length <= 0)  ? null :(
                                    <Tab.Content>
                                        <Tab.Pane eventKey="#link1">
                                            <p>H1</p>
                                        </Tab.Pane>
                                    </Tab.Content>
                                )
                            }
                        </div> */}
                    </Row>
                </Tab.Container>
                </div>
            </div>
                <ModalDynamic 
                    showModal={modalInfo.isModalShow}
                    handleModalClose={handleModalClose}
                    modalTitle={modalInfo.modalText}
                    data={modalInfo.data}
                    {...props}  >
                        <OrderStatusForm handleModalClose={handleModalClose} item={modalInfo.data} />
                </ModalDynamic>        
            </>
        )
}
export default MyOrder;