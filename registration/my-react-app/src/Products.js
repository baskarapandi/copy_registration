import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import react, { useEffect, useRef, useState } from "react"
import axios from "axios"
const drawerWidth=240;
function Products(props){
    
    const [url,setUrl]=useState("");
    const [responseMessage,setResponseMessage]=useState({url:false,saved:false});
    const handleAddProduct = props.handleAddProduct;
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log("hi");
        //extract data from form
        const data = new FormData(event.currentTarget);
        const name = data.get("ProductName");
        const price = data.get("Price");
        const description = data.get("Description");
        const image = data.get("img");
        const token= localStorage.getItem("token");
        //image upload

        const imageformData = new FormData();

        imageformData.append('image', image);

        axios.post('http://localhost:8000/api/upload', imageformData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            setUrl(response.data);
            console.log(response.data);
            axios.post('http://localhost:8000/api/ProductDetails', {
                Name:name,
                Price:price,
                Description:description,
                Url:response.data,
            },{headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then(response => {
                if(response.data=="saved"){
                    
                    setResponseMessage({...responseMessage,saved:true})
                    handleAddProduct();
                }
            }
            )
            .catch(error => {
                if(!error.response.status && error.response.status ===500){
                    setResponseMessage(true);
                }
                else console.log(error);
            })
            }
            )
            .catch(error => {
                if(error.response.status===400){
                    setResponseMessage({...responseMessage,url:true});
                }
            })
        
        
        

        
       
        //server connect
        
        console.log(image);
        event.target.reset();
        
        
    }
    return(
       <Box>
        <Box sx={{bgcolor:"#404040",textAlign:"center",padding:2}}>
            <Typography sx={{color:"#ffffff"}}>
                Add Products
            </Typography>
           
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{boxShadow:"5",paddingTop:3,padding:1,  display: 'flex',justifyContent: 'flex-start',alignItems: 'center' ,flexDirection:"column"}}>
                        
            <Box sx={{display: 'flex',width:"100%",justifyContent: 'flex-Start',alignItems: 'center',m:1 }}>
                
                <Box sx={{display: 'flex',width:"100%",justifyContent: 'flex-end',alignItems: 'center' }}>
                <Box sx={{width:"50%" }}>
                    <Typography >
                        Name
                    </Typography>
                </Box>
                    <TextField
                        m = 'normal'
                        required  fullWidth
                        id="ProductName"
                        name="ProductName"                        
                    />
                </Box>
            </Box>
            <Box sx={{display: 'flex',width:"100%",justifyContent: 'flex-start',alignItems: 'center' }}>
                <Box sx={{display: 'flex',width:"50%",justifyContent: 'flex-start',alignItems: 'center' }}>
                    <Typography >
                        Price
                    </Typography>
                </Box>
                
                <TextField
                    m = 'normal'
                    required  fullWidth
                    id="Price"
                    name="Price"                        
                />
            </Box>
            <Box sx={{display: 'flex',width:"100%",justifyContent: 'flex-start',alignItems: 'center' ,m:1}}>
                <Box sx={{width:"50%"}}>
                    <Typography >
                        Image
                    </Typography>
                </Box>
                <input type="file" style={{padding:20,width:"100%"}}id="img" name="img" accept="image/*" />
                {responseMessage.url && <Alert severity="error">This is an error alert — check it out!</Alert>}
            </Box>
            <Box sx={{display: 'flex',width:"100%",justifyContent: 'space-between',alignItems: 'center' ,m:1}}>
                <Box sx={{width:"50%"}}>
                    <Typography >
                        Description
                    </Typography>
                </Box>
                <TextField
                    m = 'normal'
                    required  fullWidth
                    id="Description"
                    name="Description"                        
                />
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-around"}}>
                <Box sx={{paddingRight:1}}>
                <Button 
                    type="submit"
                    variant="contained"
                    
                >
                    Save
                </Button>
                </Box>
                
                <Button 
                    type="button"
                    variant="contained"
                    onClick={handleAddProduct}
                    
                >
                    Cancel
                </Button>
            </Box>
            <Box>
                {responseMessage.saved && <Alert>Saved</Alert>}
            </Box>
        </Box>
    </Box>
           
       
    );
}

export default Products;