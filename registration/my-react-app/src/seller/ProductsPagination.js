import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import react, { useEffect, useState } from "react"
import axios from "axios"
import { BorderStyle, Image } from "@mui/icons-material";
import Products from "../Products";
import { useNavigate } from "react-router-dom";
const drawerWidth=240;
function ProductsUpdate(){
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    
    const [addProduct,setAddProduct]=useState(false)
    let array = [];
    for(let i=0;i<totalPage;i++){
        array.push(i+1);
    }
    const pageNumbers = [];
    pageNumbers.push(
        <option key="default" value={page} >
          Products per Page
        </option>
      );
    for (let i = 1; i <= 3; i++) {
      pageNumbers.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    const handlePageChange = (newlimit)=>{
        setLimit(newlimit)
    }
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.post(`http://localhost:8000/api/productsPaggination?page=${page}&limit=${limit}`,null,{headers: {
                'Authorization': `Bearer ${token}`
              }});
            setProducts(response.data.products);
            setTotalPage(response.data.total.totalPage)
            console.log(response.data.products)
            console.log(response.data.total.totalPage)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, [page, limit]);        
    const handleChangeEdit = (index)=>{
        console.log(products[index])
        const productId = products[index]._id; 
        
        navigate(`/dashboard/ProductUpdateForm/${productId}`)
    }
    
    
    const handleAddProduct = (event)=>{
        setAddProduct(!addProduct);

    }
    // prev page
    const handlePrev = (e)=>{
        e.preventDefault();
        
        setPage(page-1);
        console.log(page);
        console.log(limit);
    }
    // next page
    const handleNext = (e)=>{
        e.preventDefault();
        setPage(page+1);
        console.log(page);
        console.log(limit);
   }
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
                    <Box component="form"   sx={{paddingBottom:2,backgroundColor: ((index%2==0)?"":"#ededed"),width:"100%"}}>
                        <Box sx={{padding:0.5,display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%" }}>
                            <Box sx={{width:"25%"}}>
                                 <Typography sx={{textAlign:"center"}}>
                                    {object.product.name}
                                </Typography>          
                            </Box>
                            <Box sx={{width:("20%")}}>     
                                <Box>
                                    <img
                                    id="uploadImage"
                                    src = {object.product.url}                                    
                                    style={{display: "block", width:"30px",height:"30px",marginLeft: "auto",marginRight:"auto"}}
                                />
                                
                                </Box>                                
                                
                            </Box>
                            <Box sx={{width:"20%"}}>
                                <Typography sx={{textAlign:"center"}}>
                                    {object.product.price}
                                </Typography>
                            </Box>
                            <Box sx={{width:"35"}}>
                                 <Button sx={{width:"50%",textAlign:"center"}} type="button" onClick={()=>{handleChangeEdit(index)}}>
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{padding:0.5}}>
                            <Box sx={{display:"flex",alignItems:"center"}}>
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
                                </Box>
                        </Box>
                        
                    </Box>   
                    
                    </Box> 
                    )
                    }
                    )
                }
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-around"}}>
                    <Button type="button" onClick={handlePrev} disabled={page === 1}>
                        Prev
                    </Button>
                    {
                        array.map((page)=>{
                            return (
                                <Box sx={{padding:1,color:"grey"}}>
                                    {page}
                                </Box>
                            )
                        }

                        )
                    }
                    <Button type="button" onClick={handleNext} disabled={page === totalPage}>
                        Next
                    </Button>
                </Box>
                <Box>
                    {<select
                        value="productsPerPage"
                        onChange={(e) => handlePageChange(parseInt(e.target.value))}
                        style={{ cursor: 'pointer', margin: '5px' }}
                    >
                            {pageNumbers}
                    </select>}
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