import { Box, Typography } from "@mui/material";
import react from "react"
const drawerWidth=240;
function Customer(){
    console.log("customer");
    return(
        <Box
        component="main"
        sx={{mt:6,display: 'flex',justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      > 
          <Typography>
            Customer
          </Typography>
       </Box>
    );
}

export default Customer;