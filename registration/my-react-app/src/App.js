//
import './App.css';
import React, { useEffect, useState } from 'react';
import UserSignUP from './UserSignUp';
import SellerSignUP from './SellerSignUP';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token);
  useEffect(()=>{
    if (token!=null){
      navigate('/dashboard');
    }
  })
  const [type,setType] = useState("customer");
  const [style,setStyle]=useState({customerStyle :"green",sellerStyle : "grey "})
  function handleTypeChange(e){
    
    if(e.target.value=="customer"){
      setStyle(
        {
          customerStyle:"green",
          sellerStyle:"grey"
        }
      )
      setType("customer");         
    }
    else {
      setStyle(
        {
          customerStyle:"grey",
          sellerStyle:"green"
        }
      )
      setType("seller");          
    }       
  }
  return (
    <div id="register">
      <div id="content">
          <div className="button">
          <button id ="buttoncustomerheading" style = {{backgroundColor:style.customerStyle,width:"50%"}} onClick={handleTypeChange}  value="customer">Customer</button>
          <button id ="buttonsellerheading" style = {{backgroundColor:style.sellerStyle,width:"50%"}} onClick={handleTypeChange} value="seller">Seller</button>
          </div>
                
          {type=="customer" && <UserSignUP/>}
          {type=="seller" && <SellerSignUP/>}
          </div>
      
    </div>
  );
}



export default App;
