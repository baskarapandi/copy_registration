import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Login';
import AuthRequired from './AuthRequired';
import Home from './home';
import AuthRequiredForUser from './AuthRequiredForUser';
import DashBoard from './DetailPage';
import ProductUpdateForm from './seller/ProductUpdateForm';
import ProductsUpdate from './seller/ProductsPagination';
import AnalyticalReport from './AnalyticalReport';
import Customer from './Customer';
import SalesAndInventory from './SalsAndInventory';
import { Inventory } from '@mui/icons-material';
const Fp = () => {
  return (
    <Router>
       <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<Login />}/>
        <Route element={<AuthRequired />}>
          <Route path="/dashboard" element={<DashBoard />}>
            <Route index element={<SalesAndInventory />} />
            <Route path="customer" element={<Customer />} />
            <Route path="analytical" element={<AnalyticalReport />} />
            <Route path="products" element={<ProductsUpdate />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="support" element={<Inventory />} />
            <Route path="ProductUpdateForm/:productId" element={<ProductUpdateForm/>} />
          </Route>
          
        </Route>  
        <Route element={<AuthRequiredForUser />}>
          <Route path="/home" element={<Home />}/>
        </Route>
      </Routes>
    </Router>
    
  );
};

export default Fp;