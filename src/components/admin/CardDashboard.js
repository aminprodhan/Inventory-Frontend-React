
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../css/ProductCardStyles.css';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import {useDispatch,useSelector} from 'react-redux';
import {defaultRouteLink} from '../../common/config';

const height=250;

const useStyles = makeStyles({
  root: {
    minHeight:height,
    minWidth:height,
    marginBottom:15,
    background:'#fff'
  },
});

export default function CardDashboard(props) {
    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_customer);
    const classes = useStyles(); 

    const handleOrderDetails=(status_id)=>{
        props.history.push({
            pathname: defaultRouteLink+"admin/my-order",
            state: { status_id: status_id }
        });
    }

    let cardByStatus=info.orderStatuses.map(item =>{
        let len=0;
        if(typeof info.orderByStatus[item.id] !='undefined')
            len=info.orderByStatus[item.id].length;
            
        return(
            <div className="p-2">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => handleOrderDetails(item.id)} style={{width:'100%',height:height}}>
                        <CardContent>
                            <div className="d-flex flex-column align-items-center">
                                <h3>{item.name}</h3>
                                <h5>{len}</h5>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    })

  return (
      <>
        <div className="p-2">
            <Card className={classes.root}>
                <CardActionArea onClick={() => handleOrderDetails(0)} style={{width:'100%',height:height}}>
                    <CardContent>
                        <div className="d-flex flex-column align-items-center">
                            <h3>Total Order</h3>
                            <h5>{info.orders.length}</h5>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        <div className="p-2">
            <Card className={classes.root}>
                <CardActionArea onClick={() => handleOrderDetails(-1)} style={{width:'100%',height:height}}>
                    <CardContent>
                        <div className="d-flex flex-column align-items-center">
                            <h3>Todays Order</h3>
                            <h5>{info.orders_today.length}</h5>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        {cardByStatus}
    </>
  );
}
