
import React,{useRef,useState,useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import {useDispatch,useSelector} from 'react-redux';
import * as productsAction from '../../../actions/productsActions';


const CreateProduct=(props)=>{
    const dispatch=useDispatch();
    const refFile=useRef(null);
    const [ errors, setErrors ] = useState({})
    let initState={
        name:'',
        desc:'',
        sku:'',
        categoryId:'',
        price:'',
        isErrors:false,
        product_image:'',
        isImgUpdate:false,
        errorsMsg:'',
        isUpdate:false,
        updateId:0,
        btnText:'Submit',
    }
    const info=useSelector(state=>state.products_admin);
    const pUrl=info.imgProductUrl;

    const [validated, setValidated] = useState(false);
    const [formData,setFormData]=useState(initState);
    useEffect(() => {
        if(info.updateItem){
            setFormData({
                ...formData,
                name:info.updateItem.name,
                sku:info.updateItem.sku,
                categoryId:info.updateItem.category_id,
                price:info.updateItem.price,
                desc:info.updateItem.description,
                product_image:pUrl+""+info.updateItem.image,
                updateId:info.updateItem.id,
                btnText:'Update'
            });
        }
        else{
            setFormData(initState);
        }
    },[info.updateItem]);

    let categories=info.categories.map(item => {
        return(
            <option selected={formData.categoryId == item.id} value={item.id}>{item.category_name}</option>
        )
    })
    const handleInput=event=>{
        const { name, files, value } = event.target;
        setFormData(oldState => ({
            ...oldState,
            [name]: value
        }));
    }
    const findFormErrors = () => {
        const { name, sku, categoryId, price,product_image } = formData
        const newErrors = {}
        if ( !name || name === '' ) newErrors.name = 'Name is required!'
        else if ( name.length > 30 ) newErrors.name = 'Name is too long!'
        if ( !sku || sku === '' ) newErrors.sku = 'SKU is required!'
        if ( !categoryId || categoryId === '' ) newErrors.categoryId = 'select a Category!'
        if ( !price || price <=0 ) newErrors.price = 'Price must be grater than zero'
        if ( !product_image || product_image == '' ) newErrors.product_image = 'Product image is required!'
        //newErrors.sku = 'SKU is required!'
        return newErrors
    }
    const handleFormSubmit=async event=>{
        const form = event.currentTarget;
        event.preventDefault();
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        }
        else{
            
            let actions=productsAction.saveProductInfo(formData);
            try{
                await dispatch(actions);
                setFormData(initState);
                refFile.current.value=null;
                setErrors({});
                handleRefresh();
            }
            catch(err){
                setErrors({});
                const parseJson=JSON.parse(err.message);
                parseJson.map(e => {
                    errors[e.key]=e.msg;
                });
                setErrors(errors);
       
            }    
        }
    }
    const handleRefresh=()=>{
        dispatch({
            type:'ItemRowUpdate',
            value:null,
        })
    }
    const changephoto = event => {
        const file = event.target.files[0];

        if(typeof file == 'undefined')
            return 0;

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)){
            setFormData(oldState => ({
                ...oldState,
                product_image: '',
                isImgUpdate:false,
            }));
            alert("your image is invalid format");
        }
        else if (file.size > 1048576) {
            setFormData(oldState => ({
                ...oldState,
                product_image: '',
                isImgUpdate:false,
            }));
            alert("your image too long");
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                setFormData(oldState => ({
                    ...oldState,
                    product_image: event.target.result,
                    isImgUpdate:true,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    return(
        <Form  noValidate onSubmit={handleFormSubmit} encType="multipart/form-data">
            <Form.Group controlId="formUserName">
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                        value={formData.name} 
                        onChange={handleInput}
                        name="name" 
                        type="input"
                        autoComplete="off"
                        isInvalid={!!errors.name}
                        placeholder="Enter Name" />
                <Form.Control.Feedback type="invalid">
                    { errors.name }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
               <Form.Label>
                    SKU
                </Form.Label>
                <Form.Control
                        value={formData.sku} 
                        onChange={handleInput}
                        isInvalid={!!errors.sku}
                        name="sku" 
                        type="input"
                        autoComplete="off"
                        placeholder="Enter SKU" />
                <Form.Control.Feedback type="invalid">
                    { errors.sku }
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
                        isInvalid={!!errors.categoryId}
                        name="categoryId" as="select" onChange={handleInput}>
                        <option selected={formData.categoryId == ''} value=""></option>
                        {categories}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        { errors.categoryId }
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
                        autoComplete="off"
                        isInvalid={!!errors.price} 
                        type="number"   
                        placeholder="Enter Price" />
                <Form.Control.Feedback type="invalid">
                    { errors.price }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Image
                </Form.Label>
                <Form.Control
                    onChange={changephoto}
                    name="product_image"
                    type="file"
                    ref={refFile}
                    isInvalid={!!errors.product_image} 
                />
                <Form.Control.Feedback type="invalid">
                    { errors.product_image }
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