import react, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from "@mui/material";
import SimpleLineChart from './SimpleLineChart';
import { json } from "react-router-dom";
import axios from "axios";
const drawerWidth = 240;
function SalesAndInventory(){
    const [rows,setRows]= useState([])
    function createData(Products, Sales, ProductsInInventory) {
        return { Products,Sales, ProductsInInventory};
    }
    
    const token = localStorage.getItem("token");
    useEffect(()=>{
      axios.post('http://localhost:8000/api/InventoryData', null, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
    }).then(response => {
      console.log("response.data"+response.data.products);
      const res = response.data.products;
      setRows(res);
  }
  )
  .catch(error => {
      console.log(error);
  })}
  ,[token])
    
    return(
      <Box
        component="main"
        sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      > 
        <Box sx= {{ minWidth:450 , minHeight:500,display:"flex",justifyContent: 'space-around',flexDirection: 'column',alignItems: 'center'}}>
            <Box >
              <Typography >Sales Report</Typography>
            </Box>
            <Box sx={{ minWidth:450 , minHeight:400}}>
              <SimpleLineChart  />
            </Box>                         
        </Box>
        <Box sx= {{minWidth:450 , minHeight:500,display:"flex",justifyContent: 'space-around',flexDirection: 'column',alignItems: 'center','&:hover': {
        
      }}}>
            <Box >
                  <Typography>Inventory</Typography>
            </Box>
            <Box  sx={{minHeight:400}}>
               <TableContainer component={Paper}>
                  <Table  sx={{ height:380,width:450}}aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Products</TableCell>
                        <TableCell align="right">Sales</TableCell>
                        <TableCell align="right">Products in inventory</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.product.sales}</TableCell>
                          <TableCell align="right">{row.product.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Box>

            
        </Box>
        
        
      </Box>
    );
}

export default SalesAndInventory;