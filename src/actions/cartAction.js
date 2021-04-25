
import { UPDATE_ITEM_QTY,ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY} from './types'
export const addToCart= (item)=>{
    return{
        type: ADD_TO_CART,
        item:item
    }
}
export const updateItemQty=(item,qty)=>{
    return{
        type: UPDATE_ITEM_QTY,
        item:item,
        qty:qty
    }  
}

export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}