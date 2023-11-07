import { Box, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import react from "react"
const drawerWidth=240;
function Customer(){
    console.log("customer");
    const rows = []
    return(
        <Box
        component="main"
        sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      > 
          <Box  sx={{height:100*rows.length}}>
               <TableContainer component={Paper}>
                  <Table  sx={{ height:380,width:450}}aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Coustomer</TableCell>
                        <TableCell align="right">Product</TableCell>
                        <TableCell align="right">Contact</TableCell>
                        <TableCell align="right">Process</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row[0]}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row[0]}
                          </TableCell>
                          <TableCell align="right">{row[1]}</TableCell>
                          <TableCell align="right">{row[2]}</TableCell>
                          <TableCell align="right">{row[3]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Box>
       </Box>
    );
}

export default Customer;