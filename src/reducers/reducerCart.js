
import { UPDATE_ITEM_QTY,ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY} from '../actions/types'
const initialState = {
    items: null,
    addedItems:[],
    total: 0,
}


if ( localStorage.getItem("itemsArray") != null) 
{
   var result = JSON.parse(localStorage.getItem('itemsArray')) || [];
   var item_total = localStorage.getItem('item_total') || 0;       
    
    result.map(item=>{
      if(typeof item.id == "undefined" || isNaN(item_total))
        {
            result=[];
            item_total=0;
        }
     else
        return;
    });
  initialState.addedItems=result;
  initialState.total=parseFloat(item_total);
 
}
export default (state = initialState, action = {}) => {
  switch(action.type) {

    case UPDATE_ITEM_QTY:
        let existed_item_up= state.addedItems.find(item=> action.item.id === item.id)
        let list=state.addedItems.map((i, index) => {         
                if(i.id == action.item.id)
                    {
                        return Object.assign(i, {quantity: action.qty})
                    }
                
                return i;
            });
            var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
            const returnedTarget = Object.assign(oldItems, list);
            localStorage.setItem("itemsArray",JSON.stringify(returnedTarget));
            let qty_value=(state.total - (existed_item_up.quantity * action.item.price)) ;
            let total=qty_value + + ((action.qty * action.item.price));
            localStorage.setItem("item_total",total);

             return{
              ...state,
              addedItems: [...state.addedItems],
              total : total 
          }

    case ADD_TO_CART:
        
        let existed_item= state.addedItems.find(item=> action.item.id === item.id)
        let addedItem=action.item;
        if(existed_item)
         {
             if(isNaN(parseInt(existed_item.quantity)))
                existed_item.quantity=1;

                existed_item.quantity = parseInt(existed_item.quantity) + 1; 

            let list=state.addedItems.map((i, index) => {         
                if(i.id == action.item.id)
                    {
                        return Object.assign(i, {quantity: existed_item.quantity})
                    }
                
                return i;
            });
            var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
            const returnedTarget = Object.assign(oldItems, list);
            console.log(existed_item.quantity);
            console.log(returnedTarget);
            localStorage.setItem("itemsArray",JSON.stringify(returnedTarget));
             return{
                    ...state,
                    total: state.total + + addedItem.price ,
                    addedItems: [...state.addedItems],
                  }
        }
        else{
           
          addedItem.quantity = 1;
          let newTotal = state.total + + addedItem.price  
          let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
          oldItems.push(addedItem);
          localStorage.setItem("itemsArray", JSON.stringify(oldItems));
          localStorage.setItem("item_total",newTotal);        
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
        }
    case REMOVE_ITEM:
          let itemToRemove= state.addedItems.find(item=> action.id === item.id)
          let new_items = state.addedItems.filter(item=> action.id !== item.id)          
          let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
          localStorage.setItem("itemsArray", JSON.stringify(new_items));
          localStorage.setItem("item_total",newTotal); 

          return{
              ...state,
              addedItems: new_items,
              total: newTotal
        }
    
    case ADD_QUANTITY:

            let addedItemQty= state.addedItems.find(item=> action.id === item.id)
            addedItemQty.quantity += 1 
            let newTotalQty = state.total + + addedItemQty.price
            let new_items_plus = state.addedItems.filter(item=>item.id !== action.id)
            var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
            const returnedTarget_add = Object.assign(oldItems, addedItemQty);
            localStorage.setItem("itemsArray",JSON.stringify(returnedTarget_add));
            localStorage.setItem("item_total",newTotalQty);
          return{
              ...state,
              total: newTotalQty,
              addedItems: [...state.addedItems]
          }    

    case SUB_QUANTITY:
          let subItem = state.addedItems.find(item=> item.id === action.id) 
          if(subItem.quantity === 1){
              let new_items = state.addedItems.filter(item=>item.id !== action.id)
              let newTotal = state.total - subItem.price
            localStorage.setItem("itemsArray",JSON.stringify(new_items));
            localStorage.setItem("item_total",newTotal);
              return{
                  ...state,
                  addedItems: new_items,
                  total: newTotal
              }
          }
          else {
                subItem.quantity -= 1
                let newTotal = state.total - subItem.price
                var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
                const returnedTarget_sub = Object.assign(oldItems, subItem);
                localStorage.setItem("itemsArray",JSON.stringify(returnedTarget_sub));
                localStorage.setItem("item_total",newTotal); 
              return{
                  ...state,
                  addedItems: [...state.addedItems],
                  total: newTotal
              }
          }

  
    default: return state;
  }
}
