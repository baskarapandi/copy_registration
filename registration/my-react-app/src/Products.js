import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import react, { useState } from "react"
import axios from "axios"
const drawerWidth=240;
function Products(){
    const [url,setUrl]=useState("");
    const [responseMessage,setResponseMessage]=useState({url:false,saved:false});
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
        }
        )
        .catch(error => {
            if(error.response.status===400){
                setResponseMessage({...responseMessage,url:true});
            }
        })
        axios.post('http://localhost:8000/api/ProductDetails', {
            Name:name,
            Price:price,
            Description:description,
            Url:url,
        },{headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {
            if(response.data=="saved"){
                setResponseMessage({...responseMessage,saved:true})
            }
        }
        )
        .catch(error => {
            if(error.response.status===500){
                setResponseMessage(true);
            }
            else console.log(error);
        })
        

        
       
        //server connect
        
        console.log(image);
        
    }
    return(
       <Box component="main"
       sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex',justifyContent: 'flex-start',alignItems: 'center' ,flexDirection:"column"}}>
                <Box sx={{m:1}}>
                    <Typography>
                        Products
                    </Typography>
                </Box>
                <Box sx={{display: 'flex',width:"100%",justifyContent: 'flex-Start',alignItems: 'center',m:1 }}>
                    <Box sx={{width:"50%" }}>
                        <Typography >
                            Name
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex',width:"100%",justifyContent: 'flex-end',alignItems: 'center' }}>
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
                <Box sx={{m:1}}>
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
       </Box>
    );
}

export default Products;