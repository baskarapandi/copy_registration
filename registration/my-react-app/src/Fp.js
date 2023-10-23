import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Login';
import AuthRequired from './AuthRequired';
import Home from './home';
import AuthRequiredForUser from './AuthRequiredForUser';
import DashBoard from './DetailPage';
const Fp = () => {
  return (
    <Router>
       <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<Login />}/>
        <Route element={<AuthRequired />}>
          <Route path="/details" element={<DashBoard />}/>
          
        </Route>  
        <Route element={<AuthRequiredForUser />}>
          <Route path="/home" element={<Home />}/>
        </Route>
      </Routes>
    </Router>
    
  );
};

export default Fp;