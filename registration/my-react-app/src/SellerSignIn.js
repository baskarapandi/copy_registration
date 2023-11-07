import { Alert, Avatar, Button,  Container,  CssBaseline,  Link,  TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios"
import  Box from "@mui/material/Box";
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function SellerSignIN(){
    const navigate=useNavigate();
    const [responseMessage, setResponseMessage] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
          const email = data.get('email');
          const password = data.get('password');
          console.log(email);
          console.log(password);
          axios.post('http://localhost:8000/api/loginseller', {
            email: email,
            password: password
          })
          .then(response => {
            const Token = response.data.token;
            localStorage.setItem("type","seller");
            localStorage.setItem("token", Token );
            navigate('/dashboard');
              
            
            /*
            else if(response.data==="not exist"){
              setResponseMessage(true);
            }  
            */
          })
          .catch(error => {
            if(error.response.status === 403){
              console.log("403");
              console.log("i am going to re render");
              setResponseMessage(true);
              console.log("i am going to re render because state changed");
            }
            else{
              console.error('Error:', error);
            }
            
          });
        
      };

    return(
    <Box>
        <Box component="form" onSubmit={handleSubmit} sx={{textAlign:"center",mt:1}}>
            <TextField
                m = 'normal'
                required  fullWidth
                id="email1"
                name="email"
                label="Email Address"
                
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
            />
            {responseMessage && <Alert severity="error">Invalid email id or password</Alert>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Log In
            </Button> 
            <Link href="./">Sign up</Link>

        </Box>
    </Box>


    )
}

export default SellerSignIN;