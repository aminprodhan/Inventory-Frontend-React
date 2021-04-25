
import React,{useRef,useState,useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import {useDispatch,useSelector} from 'react-redux';
import * as productsAction from '../../../actions/productsActions';
import Table from 'react-bootstrap/Table'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../../library/AlertDialog';

const ProductList=(props)=>{
    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_admin);
    const[confirmAlert,setConfirmAlert]=useState({
        open:false,
        message:'Are you sure ?',
        title:'Confirmation',
        item:null,
        pendingProcess:false,
    });
    const pUrl=info.imgProductUrl;

    const handleRowUpdate=(item)=>{
        dispatch({
            type:'ItemRowUpdate',
            value:item,
        })
    }
    const handleConfirm=async event=>{

        setConfirmAlert({
            ...confirmAlert,
            message:'Deleting.....',
            pendingProcess:true,
        });
        let actions=productsAction.deleteProductInfo(confirmAlert.item);
        try{
            await dispatch(actions);
            setConfirmAlert({
                ...confirmAlert,
                message:'Are you sure ?',
                open:false,
                pendingProcess:false,
            });
            dispatch({
                type:'ItemRowUpdate',
                value:null,
            })
        }
        catch(err){
            
        }   
    }
    const handleAlertDialogClose=()=>{
        setConfirmAlert({
            ...confirmAlert,
            open:false,
            item:null,
        })
    }
    const handleAlertDialogOpen=(item)=>{
        setConfirmAlert({
            ...confirmAlert,
            open:true,
            item:item,
        })
    }
    const rowSLFormtter=(cell, row, rowIndex, formatExtraData)=>{ 
        return ( 
            <h5><strong>{ rowIndex + 1 }</strong></h5> 
    )}
    const actionsFormatter=(cell, row, rowIndex, formatExtraData)=>{
        return (
            <div style={{ textAlign: "center",cursor: "pointer",lineHeight: "normal" }}>
                <EditOutlinedIcon onClick={() => handleRowUpdate(row)} />
                <DeleteIcon onClick={() => handleAlertDialogOpen(row)} />
                
            </div>
        )          
    }
    const actionsImageFormatter=(cell, row, rowIndex, formatExtraData)=>{
        return (
            <img
                src={pUrl+""+row.image}
                height="80px"
                width="80px"
            />
        )          
    } 
    const columns = [
        {
            dataField: 'sl_id',
            text: 'SL',
            isDummyField: true,
            csvExport: false,
            formatter: rowSLFormtter,
        }, 
        {
            dataField: 'name',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: actionsFormatter,
        },
        {
            dataField: 'name',
            text: 'Name',
            filter: textFilter()
        },
        {
            dataField: 'sku',
            text: 'SKU',
            filter: textFilter(),
        }, 
        {
            dataField: 'description',
            text: 'Description',
        },
        {
            dataField: 'category_name',
            text: 'Category',
            filter: textFilter()
        }, 
        {
            dataField: 'price',
            text: 'Price',
        },
        {
            dataField: 'image',
            text: 'Image',
            isDummyField: true,
            csvExport: false,
            formatter: actionsImageFormatter,
        },
        
        
    ];
    return(
        <>
        <BootstrapTable
            variant="dark"
            classes="foo"
            bootstrap4
            keyField="id"
            data={ info.products }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
            // caption={<HeaderTaskList {...props} />}
        />
        <AlertDialog 
            open={confirmAlert.open}
            title={confirmAlert.title}
            message={confirmAlert.message}
            pendingProcess={confirmAlert.pendingProcess}
            handleDialogConfirm={handleConfirm}
            handleDialogClose={handleAlertDialogClose}
        />
        </> 
    )
}
export default ProductList;