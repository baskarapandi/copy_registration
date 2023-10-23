import { Alert, Avatar, Button,  Container,  CssBaseline,  Link,  TextField } from "@mui/material";

import axios from "axios"
import  Box from "@mui/material/Box";
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function UserSignIN(){
    const navigate=useNavigate();
    const [responseMessage, setResponseMessage] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
          const email = data.get('email');
          const password = data.get('password');
          console.log(email);
          console.log(password);
          axios.post('http://localhost:8000/api/loginuser', {
            email: email,
            password: password
          })
          .then(response => {
            const type = "user";
            const Token = response.data.token;
            localStorage.setItem("type",type);
            localStorage.setItem("token", Token );
            navigate('/home');
              
            
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
    <Box >
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

export default UserSignIN;