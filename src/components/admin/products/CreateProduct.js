
import React,{useRef,useState,useEffect}  from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

const CreateProduct=(props)=>{
    const initState={
        title:'',
        remarks:'',
        deadline:'',
        deafultDeadLine:'',
        standBy:false,
        projectAdmin:[],
        projectUsers:[],
        isErrors:false,
        errorsMsg:'',
        isUpdate:false,
        updateId:0,
        btnText:'Submit',
    }
    const [formData,setFormData]=useState(initState);
    const handleInput=()=>{

    }
    const handleFormSubmit=()=>{

    }
    const handleRefresh=()=>{

    }
    return(
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formUserName">
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                        value={formData.title} 
                        onChange={handleInput}
                        name="title" 
                        type="input" 
                        placeholder="Enter Name" />
               <Form.Label>
                    SKU
                </Form.Label>
                <Form.Control
                        value={formData.title} 
                        onChange={handleInput}
                        name="title" 
                        type="input" 
                        placeholder="Enter SKU" />
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control as="textarea" rows={2}
                        value={formData.title} 
                        onChange={handleInput}
                        name="title" 
                        type="input" 
                        placeholder="Enter Description" />
                <Form.Label>
                    Category
                </Form.Label>
                <Form.Control
                        value={formData.title} 
                        onChange={handleInput}
                        name="title" 
                        type="input" 
                        placeholder="Enter Category" />
                <Form.Label>
                    Price
                </Form.Label>
                <Form.Control
                        value={formData.title} 
                        onChange={handleInput}
                        name="title" 
                        type="input" 
                        placeholder="Enter Price" />
                <Form.Label>
                    Image
                </Form.Label>
                <Form.Control
                        value={formData.title} 
                        onChange={handleInput}
                        name="title" 
                        type="file" 
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