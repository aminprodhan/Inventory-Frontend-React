
import React,{useRef,useState,useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import {useDispatch,useSelector} from 'react-redux';
import * as productsAction from '../../../actions/productsActions';


const CreateProduct=(props)=>{
    const dispatch=useDispatch();
    const initState={
        name:'',
        desc:'',
        sku:'',
        categoryId:'',
        price:'',
        isErrors:false,
        errors:{
            sku:false,
            name:false,
            categoryId:false,
            price:false,
            product_image:false,
        },
        errorsMsg:'',
        isUpdate:false,
        updateId:0,
        btnText:'Submit',
    }
    const info=useSelector(state=>state.products_admin);
    const [validated, setValidated] = useState(false);
    //console.log("info="+JSON.stringify(info.categories));
    let categories=info.categories.map(item => {
        return(
            <option value={item.id}>{item.category_name}</option>
        )
    })
    const [formData,setFormData]=useState(initState);
    const handleInput=event=>{
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    }
    const handleFormSubmit=async event=>{
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            
            let actions=productsAction.saveProductInfo(formData);
            try{
                await dispatch(actions);
            }
            catch(err){
                setFormData(oldState => ({
                    ...oldState,
                    errors: {
                        sku:true,
                    }
                }));
            }
            
        }
        setValidated(true);
        
    }
    const handleRefresh=()=>{

    }
    const changephoto = event => {
        const file = event.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)){
            setFormData(oldState => ({
                ...oldState,
                product_image: ''
            }));
            alert("your image is invalid format");
        }
        else if (file.size > 1048576) {
            setFormData(oldState => ({
                ...oldState,
                product_image: ''
            }));
            alert("your image too long");
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                setFormData(oldState => ({
                    ...oldState,
                    product_image: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    //validated={validated}
    return(
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} encType="multipart/form-data">
            <Form.Group controlId="formUserName">
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                        value={formData.name} 
                        onChange={handleInput}
                        name="name" 
                        type="input"
                        isInvalid={!!formData.errors.name}
                        required 
                        placeholder="Enter Name" />
                <Form.Control.Feedback type="invalid">
                   Name is required!!.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
               <Form.Label>
                    SKU
                </Form.Label>
                <Form.Control
                        value={formData.sku} 
                        onChange={handleInput}
                        isInvalid={!!formData.errors.sku}
                        name="sku" 
                        type="input"
                        placeholder="Enter SKU" />
                <Form.Control.Feedback type="invalid">
                    Unique sku is required!!.
                </Form.Control.Feedback>        
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control as="textarea" rows={2}
                        value={formData.desc} 
                        onChange={handleInput}
                        name="desc" 
                        type="input" 
                        placeholder="Enter Description" />
            </Form.Group>
            <Form.Group controlId="formPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        value={formData.roleId}
                        required 
                        isInvalid={!!formData.errors.categoryId}
                        name="categoryId" as="select" onChange={handleInput}>
                        <option value=""></option>
                        {categories}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Category is required!!.
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>   
                <Form.Label>
                    Price
                </Form.Label>
                <Form.Control
                        value={formData.price} 
                        onChange={handleInput}
                        name="price"
                        isInvalid={!!formData.errors.price} 
                        type="number"
                        required 
                        placeholder="Enter Price" />
                <Form.Control.Feedback type="invalid">
                   Price is required!!.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Image
                </Form.Label>
                <Form.Control
                    onChange={changephoto}
                    name="product_image"
                    required 
                    type="file"
                    isInvalid={!!formData.errors.product_image} 
                />
                <Form.Control.Feedback type="invalid">
                   Valid image is required!!.
                </Form.Control.Feedback>
                <img
                    src={formData.product_image}
                    height="80px"
                    width="80px"
                />                                                 
            </Form.Group>
            <Button  variant="primary" type="submit">
                <AddIcon />{formData.btnText}
            </Button> 
            <Button className="ml-3"
                onClick={handleRefresh}
                variant="warning" type="button">
                <RefreshIcon /> Refresh
            </Button>
        </Form>   
    )
}
export default CreateProduct;