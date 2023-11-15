import React, { useEffect,  useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
const drawerWidth = 240;
function ProductUpdateForm() {
  const token = localStorage.getItem("token");
  const [newProduct, setNewProduct] = useState({
    _id:"", // Include the _id of the product
    product:{ 
      name: "",
      price: "",
      url:"",
      description:""}
  });
  const { productId } = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    axios.post('http://localhost:8000/api/getProduct', {productId},{headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then(response => {           
            //setProducts([response.data]);    
            const products=response.data.products;    
            setNewProduct({
                _id: products._id, // Include the _id of the product
                product:{ 
                  name: products.product.name,
                  price: products.product.price,
                  url: products.product.url,
                  description:products.product.description}
              })   
            console.log(response.data)
            console.log(products)
        })
        .catch(error => {
           console.log(error);
        })
    },[]  )
  const handleDelete = (e) =>{
    axios.post('http://localhost:8000/api/deleteProduct', {productId},{headers: {
            'Authorization': `Bearer ${token}`
          }}).then((response)=>{
            console.log(response.data);
            if(response.data="deleted"){
              navigate("/dashboard/products")
            }
          }).catch((error)=>{
            console.log(error);
          })
  }

  const handleFieldChange = (e) => {
    e.preventDefault();
    console.log(newProduct.product.name)
    const { name, value } = e.target;
    setNewProduct({
      _id :newProduct._id,
      product: {...newProduct.product,
      [name]: value,}
    });
    console.log(newProduct.product.description)
    
  };
  //image 
  const handleImageClick = () => {
    // Trigger a click event on the hidden file input
    document.getElementById('hiddenFileInput').click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
   
    if (file) {
      const imageformData = new FormData();
      imageformData.append('image', file);
      axios.post('http://localhost:8000/api/upload', imageformData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      })
      .then(response => {
          const value=response.data
          console.log(response.data);
          setNewProduct({
            _id :newProduct._id,
            product: {...newProduct.product,
            url: value,}
          });
      }
      )
      .catch(error => {
         console.log(error)
      })
      
      
    }
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

      // Send the updated product data to the server
     axios.post('http://localhost:8000/api/updateProduct', {newProduct}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }).then((response)=>{
        console.log(response.data);
      }).     
    catch ((error)=> {
      // Handle any errors that occur during the update process
      console.error('Error updating product:', error);
    })
  };
//the code for text ar



  return (
    <Box component="main" sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
    <form style={{width:"100%"}}onSubmit={handleSubmit}>
      <Box >
      <Box onClick={handleImageClick} sx={{padding:5,margin:0.5,display:'flex',flexDirection:"column",justifyContent: 'space-around',alignItems: 'center',borderStyle:'solid',borderColor:"#bdbdbd",borderWidth:1,borderRadius:1,
    "&:hover": {
      borderColor:"#424242",

    },
    "&:fosus":{
      borderColor:"#0288d1"
    }
  }}>
      <Box>
      <img src = {newProduct.product.url}  alt= "work avala" style={{display: "block", marginLeft: "auto",marginRight: "auto", width: "20%"}} />
      <input type="file" id="hiddenFileInput" style={{ display: 'none' }}onChange={(e)=>{handleFileChange(e)}}/>
      </Box>
      <Box >
        <Typography>
          Upload Image
        </Typography>
      </Box>
      </Box>
      </Box>
      <Box sx={{padding:0.5,width:"100%"}}>
        <TextField
          name="name"
          label="Product Name"
          fullWidth
          value={newProduct.product.name}
          onChange={handleFieldChange}
        />
      </Box>
      <Box sx={{margin:0.5}}>
        <TextField
          name="price"
          label="Price"
          fullWidth
          value={newProduct.product.price}
          onChange={handleFieldChange}
        />
      </Box>
      
      
      
      <Box sx={{padding:0.5,width:"100%"}}>
        <TextField
          name="description"
          label="Description"
          id="description"
          fullWidth
          value={newProduct.product.description}
          onChange={handleFieldChange}
          sx={{width:"100%"}}
          multiline
          row={2}
          overflow
        />
      </Box>
      
      <Box sx={{padding:1,display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <Button type="submit" variant="contained" color="primary" sx={{margin:0.5}}>
          Update
        </Button>
        <Button onClick={()=>{navigate("/dashboard/products")}} variant="contained" color="secondary" sx={{margin:0.5}}>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" sx={{margin:0.5}}>
          delete
        </Button>
      </Box>
    </form>
    </Box>
  );
}

export default ProductUpdateForm;
