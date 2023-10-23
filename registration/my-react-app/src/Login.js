import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Avatar, Box, Container, CssBaseline , Typography} from '@mui/material';
import SellerSignIN from './SellerSignIn';
import UserSignIN from './UserSignIn';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function Login(){
  console.log("i am re rendering");
  const navigate = useNavigate();
  const [type,setType] = useState("customer");
  const [style,setStyle]=useState({customerStyle :"greenyellow",sellerStyle : "lightgrey"})
  const token = localStorage.getItem('token');
  console.log(token);
  useEffect(()=>{
    if (token!=null){
      if(localStorage.getItem("type")=="seller")navigate('/details');
      else if(localStorage.getItem("type")=="user")navigate('/home');
    }
  })
  
  const handleLogin = (value)=>{
    if(value==="seller"){
      setStyle({customerStyle :"lightgrey",sellerStyle :"greenyellow" });
      setType("seller");
    }
    else if(value === "customer") {
      setStyle({customerStyle :"greenyellow",sellerStyle : "lightgrey"});
      setType("customer");
    }
  }
    
  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component = "h1" variant="h5" >
           Sign In
        </Typography>
        <Box
         sx={{
          display: 'flex',
          alignItems: 'center',
          width:"100%"
        }}
        >
          <Box onClick={e=>{handleLogin("customer")}}  sx={{width: '50%',height:'50%',backgroundColor:style.customerStyle,textAlign:"center",padding:2,cursor:"pointer"}}>
            User
          </Box>
          <Box onClick={e=>{handleLogin("seller")}}  sx={{width: '50%',height:'50%',backgroundColor:style.sellerStyle,textAlign:"center",padding:2,cursor:"pointer"}}>
            seller
          </Box>
        </Box>
        <Box>
          {(type=="customer")&&<UserSignIN/>}
          {(type=="seller")&&<SellerSignIN/>}
        </Box>
      </Box>   
    </Container>
  );
}

export default  Login;