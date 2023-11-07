import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import react, { useEffect, useState } from "react"
import axios from "axios"
import { Image } from "@mui/icons-material";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
const drawerWidth=240;
function ProductsUpdate(){
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [flag,setFlag]=useState([])
    const [addProduct,setAddProduct]=useState(false)
    console.log(addProduct)
    console.log(flag)
    const token = localStorage.getItem("token");
    useEffect(()=>{
        
        axios.post('http://localhost:8000/api/SellersData', null,{headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {
            const array = response.data.array;
            setProducts([...array]);
            console.log(response)
            console.log(response.data.array)
            console.log(products)
        })
        .catch(error => {
           console.log(error);
        })
    },[addProduct])
    console.log("after 1 useef"+addProduct)
    useEffect(() => {
            const flagArray =Array(products.length).fill(false);
            console.log(flagArray)
            setFlag(flagArray)
    }, [products]);
    console.log("after 2 useef"+addProduct)
    const handleChangeEdit = (index)=>{
        console.log(products[index])
        const productId = products[index]._id; 
        
        navigate(`/dashboard/ProductUpdateForm/${productId}`)
        /* console.log(index)
        setFlag([
            ...flag.slice(0,index),
            bool,
            ...flag.slice(index+1)
        ]) */
    }
    console.log("after 47"+addProduct)
    const [imageSrc, setImageSrc] = useState('placeholder-image.png');

    
        
    console.log("after 91"+addProduct)
    
    const handleChangeDelete = (index)=>{
        console.log("index"+index)
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        const updatedFlag = [...flag];
        updatedFlag.splice(index,1)
        setFlag([
            ...flag.slice(0,index),
            ...flag.slice(index+1)
        ])
        console.log(flag.slice(0,index))
        console.log(flag.slice(index+1))
        setProducts(updatedProducts)
        axios.post('http://localhost:8000/api/SellersDataUpdate', {Products:updatedProducts},{headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {
            console.log(response.data);

        })
        .catch(error => {
           console.log(error);
        })
    }
    const handleSubmit=(event,index)=>{
        event.preventDefault();  
        const data = new FormData(event.currentTarget);
        const newName = data.get("Product");
        const newPrice= data.get("Price")
        const newDescription=data.get("Description")
        console.log(newDescription)
        const name = products[index].product.name;
        const price = products[index].product.price;
        const description=products[index].product.description;
        const url= products[index].product.url;
        const updateProduct =[...products.slice(0,index),
            {
             product:{name:newName,
             price:newPrice,
             url:url,
             description:newDescription
             
            }
            },
            ...products.slice(index+1)
        ]
        setProducts(updateProduct)
        axios.post('http://localhost:8000/api/SellersDataUpdate', {Products:updateProduct},{headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {
            console.log(response.data);
            setFlag([
                ...flag.slice(0,index),
                false,
                ...flag.slice(index+1)
            ])

        })
        .catch(error => {
           console.log(error);
        })

    }
    const handleAddProduct = (event)=>{
        setAddProduct(!addProduct);

    }
    console.log("after 136"+addProduct)
    return(
        <Box component="main" sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Box sx={{width:"100%"}}>
                <Box sx={{width:"100%",bgcolor:"#404040"}}>
                    <Typography sx={{textAlign:"left",padding:2,color:"#ffffff",textAlign:"center"}}>
                        Products
                    </Typography>
                    
                </Box>
                <Box sx={{paddingTop:1}}>
               { products.length>=1 && products.map((object,index)=>{
                    
                    return(
                <Box>
                    <Box component="form" onSubmit={(e)=>{handleSubmit(e,index)}}  sx={{paddingBottom:0.5,backgroundColor: ((index%2==0)?"":"#ededed"),width:"100%"}}>
                        <Box sx={{padding:0.5,display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%" }}>
                            <Box sx={{width:(flag[index]?"35%":"25%")}}>
                                {flag[index]==false && <Typography sx={{textAlign:"center"}}>
                                    {object.product.name}
                                </Typography>}
                                {flag[index] && 
                                    <TextField
                                        m = 'normal'
                                        required  fullWidth
                                        id="Product"
                                        name="Product"         
                                        placeholder= {object.product.name}        
                                        size="small"    
                                        sx={{bgcolor:"#FFFFFF"}}
                                />}
                            </Box>
                            
                            <Box sx={{width:(flag[index]?"30%":"20%")}}>     
                                {flag[index] &&<Box>
                                    <img
                                    id="uploadImage"
                                    src = {object.product.url}                                    
                                    style={{display: "block", width:"30px",height:"30px",marginLeft: "auto",marginRight:"auto"}}
                                />
                                
                                </Box> }
                                {
                                    flag[index]==false && <img src={object.product.url} style={{display: "block",width:"30px",height:"30px",marginLeft: "auto",marginRight:"auto"}}/>
                                }
                                
                            </Box>
                            <Box sx={{width:(flag[index]?"35%":"20%")}}>
                                {flag[index]==false && <Typography sx={{textAlign:"center"}}>
                                    {object.product.price}
                                </Typography>}
                                {flag[index] &&<TextField
                                        m = 'normal'
                                        required  fullWidth
                                        id="Price"
                                        name="Price"         
                                        placeholder= {object.product.price}        
                                        size="small"    
                                        sx={{bgcolor:"#FFFFFF"}}
                                />

                                }
                            </Box>
                            <Box sx={{width:"35"}}>
                                {flag[index]==false && <Button sx={{width:"50%",textAlign:"center"}} type="button" onClick={()=>{handleChangeEdit(index)}}>
                                    Edit
                                </Button>}
                            </Box>
                        </Box>
                        <Box sx={{padding:0.5}}>
                            {flag[index]==false &&<Box sx={{display:"flex",alignItems:"center"}}>
                                 <Typography sx={{textAlign:"center",paddingRight:0.5}}>
                                    Description 
                                </Typography>
                                <TextField
                                    m = 'normal'
                                    required  fullWidth
                                    id="Description"
                                    name="Description"         
                                    value= { object.product.description}  
                                    multiline
                                    row={2}      
                                    size="small"    
                                    sx={{bgcolor:"#FFFFFF"}}
                                />
                                </Box>}
                            {flag[index] &&
                                <TextField
                                    m = 'normal'
                                    required  fullWidth
                                    id="Description"
                                    name="Description"         
                                    placeholder= {"Description : " + object.product.description}        
                                    size="small"    
                                    sx={{bgcolor:"#FFFFFF"}}
                                />
                            }
                        </Box>
                        
                    </Box>   
                    
                    </Box> 
                    )
                    }
                    )
                }
                </Box>
                <Box>
                        {addProduct==false && <Box sx={{textAlign:"center",paddingTop:1}}>
                            <Button type = "button" onClick={handleAddProduct} variant="contained">Add Product</Button>
                        </Box>}
                        {addProduct && <Box sx={{paddingTop:2}}>
                            <Products handleAddProduct={handleAddProduct}/>
                            </Box>

                        }
                </Box>
            </Box>  
        </Box>
    );
}

export default ProductsUpdate;