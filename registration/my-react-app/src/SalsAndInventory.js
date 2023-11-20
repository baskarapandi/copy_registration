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
    const [sales,setSales]=useState([]);
    const [newSales,setNewSales]=useState([]);
    const [productIndex,setProductIndex] =useState([]);
    const [newProductIndex,setNewProductIndex] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("All");

    
      const handleProductChange = (value,key) => {
        const array = value === "All"
          ? sales
          : sales.filter((product) => product.productName === value);
        setNewSales(array);
        const indexArray = key=== -1
          ? productIndex 
          : productIndex.filter((index)=> index === key)
          setNewProductIndex(indexArray);
      };
    
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
     
      console.log("i am ok");
  }
  )
  .catch(error => {
      console.log(error);
  })
  axios.post('http://localhost:8000/api/salesReport', null, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    }).then(response => {
      if(response.data.sales){
        console.log("response.data"+response.data.sales[0]);
        const res = response.data.sales;
        setSales(res);
        setNewSales(res);
        const array = res.map((element,index)=>{
          return index;
        });
        setProductIndex(array);
        setNewProductIndex(array);
        console.log(array);
        console.log("i am ok");
      }
  }
  )
  .catch(error => {
      console.log(error);
  })
}
  ,[token]);
    
    return(
      <Box
        component="main"
        sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      > 
        <Box sx= {{ minWidth:450 , minHeight:500,display:"flex",justifyContent: 'space-around',flexDirection: 'column',alignItems: 'center'}}>
            <Box >
              <Typography >Sales Report</Typography>
              {<select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    handleProductChange(e.target.value,e.target.selectedIndex - 1);
                  }}
                  style={{ cursor: 'pointer', margin: '5px' ,borderStyle:"solid",borderColor:"grey",color:"black"}}
              >
                  <option key={-1} value="All" >All</option>
                  {sales.map((product, index) => (
                    <option key={index} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
              </select>}
            </Box>
            <Box sx={{ minWidth:450 , minHeight:400}}>
              <SimpleLineChart  Sales={newSales} newProductIndex={newProductIndex}/>
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