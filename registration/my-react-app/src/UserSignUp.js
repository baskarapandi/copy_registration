import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css"
function UserSignUP(){
    const navigate = useNavigate();
  /*
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  */
  
  const [formData,setFormData]= useState({
      Name :"",
      Email :"",
      Password : "",
      ConfirmPassword :""
  })
  const [responseMessage, setResponseMessage] = useState('');

  
 console.log("side effect");
  
  const handleChange = (e) => {
    const value = e.target.value;
    const Name  = e.target.name;
    setFormData((prevData)=>{
      return({
        ...prevData,
        [Name]: value

      })
    }
      
    );
     
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.Password!==formData.ConfirmPassword){
      setResponseMessage('Password is not same');
      return
    }
    
    axios.post('http://localhost:8000/api/user', {
      name: formData.Name,
      email: formData.Email,
      password: formData.Password,
      type : "user"
    })
    .then(response => {
      console.log("res.headers");
      console.log(response.headers);
      const type = "user"
        localStorage.setItem("type", type );
        const Token = response.data.token;
        localStorage.setItem("token", Token );
        navigate('/home');
    })
    .catch(error => {
      if(error.response.status === 403){
        setResponseMessage('Invalid');
      }
      else if(error.response.status === 401){
        setResponseMessage('Email Id or name exist');
      }
      console.log(error);
      console.error('Error:', error);
    });
  }
    return(
        <div className="centered-form">
      <form onSubmit={handleSubmit}>
        <section id="RegForm">
          <div id='reg'>
            <p><b>Sign Up</b></p>
          </div>
          <div id="FormInput">
          <input
          type='text'
          id="name"
          placeholder="Name"
          name ="Name"
          onChange={handleChange}
        /><br></br>
        <input
          type='text'
          id="email"
          placeholder="Email"
          name = "Email"
          onChange={handleChange}
        /><br></br>
        <input
          type='text'
          id="password"
          placeholder="Password"
          name ="Password"
          onChange={handleChange}
        /><br></br>
        <input
          type='text'
          id="confirm-password"
          placeholder="ConfirmPassword"
          name ="ConfirmPassword"
          onChange={handleChange}
          
        />
        <br/>
        
        <input id="submit" type="submit" value='register'/>
        <br/>
        <a href ="./login" >login</a>
        <div id = 'notRegistered'>
                {responseMessage && <p>{responseMessage}</p>}
        </div>
          </div>
        </section>
        
        
      </form>
    </div>
    )
}
export default UserSignUP;