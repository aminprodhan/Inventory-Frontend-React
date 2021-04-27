
import React,{useRef,useState,useEffect}  from 'react';
import {SET_DRAWER_BOOLEAN} from '../../../actions/user_types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CreateProduct from './CreateProduct';
import * as productsAction from '../../../actions/productsActions';
import {useDispatch,useSelector} from 'react-redux';
import ProductList from './ProductList';
import {defaultAdminRouteLink} from '../../../common/config';

const ManageProducts=(props)=>{
    const dispatch=useDispatch();

    useEffect(() => {
        getProductsInfo();
    },[]);

    const getProductsInfo=async()=>{
        dispatch({
            type:SET_DRAWER_BOOLEAN,
            value:false,
        });

        let info=productsAction.getProductsInfo();
        try{
            await dispatch(info);
        }
        catch(err){
            
        }
    }
    const handleDashboard=()=>{
        props.history.push({
            pathname: defaultAdminRouteLink+"dashboard",
            state: { status_id: 0 }
        });
    }

    return(
        <div className="col-12" style={{marginLeft:10}}>
            
            <div className="row justify-content-left">
                <div class="col-8 p-4">
                    <div className="row justify-content-left">
                        <div className="d-flex">
                            <div className="p-2 w-100">
                                <h2 style={{margin:0,padding:0}}>Manage Product</h2>
                            </div>
                            <div className="p-2 flex-lg-shrink-0">
                                <Button onClick={()=>handleDashboard()} variant="danger" size="sm" block>
                                    Dashboard
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-left" style={{maxHeight:500,overflowY:'auto'}}>
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