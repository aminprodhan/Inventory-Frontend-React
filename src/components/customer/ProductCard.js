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


const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    minWidth:250,
    minHeight:350,
    maxHeight:350,
    marginBottom:15,
  },
});

export default function ProductCard(props) {

  const classes = useStyles();
  const {item,rootUrl}=props;

  const myCart=useSelector(state=>state.cart);
  let existed_item_up= myCart.addedItems.find(c=> item.id === c.id);
  const [value, setValue] = useState([1, 3]);
  const handleChange = (val,item) =>{

      if(val == 3)
        props.handleAddToCart(item)
      else if(val == 1)
        props.handleRemoveFromCart(item)
  }
    
    
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.handleAddToCart(item)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height={180}
          image={rootUrl+""+item.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <label>
                {item.name}
          </label>
          <Typography variant="body2" color="textSecondary" component="p">
                <div className="block-ellipsis">Price {item.price}</div>  
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="d-flex justify-content-center flex-wrap" style={{width:'100%'}}>
          <Button onClick={() => props.handleAddToCart(item)} variant="primary" size="sm" block>
              View
          </Button>
        </div>
            
      </CardActions>
    </Card>
  );
}