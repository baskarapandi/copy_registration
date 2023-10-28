import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import react, { useState } from "react"
import SearchIcon from "./image/SearchIcon";
import axios from "axios";
const drawerWidth=240;
function Inventory(){
    const [flag,setFlag] = useState(true);
    const [arr,setArr] = useState([]);
    const [val,setVal]=useState(""); 
    const token=localStorage.getItem("token");
    console.log("customer");
    const handleOnClickChange=(element)=>{
      console.log(element)

      setVal(element)
      setFlag(false);
    }
    const handleChange=(e)=>{
      const value = e.target.value;
      setFlag(true)
      setVal(value);
      axios.post('http://localhost:8000/api/Search', {val:value},{
           headers: {
             'Authorization': `Bearer ${token}`
           }
        })
        .then(response => {
            setArr(response.data.key);
            console.log(response.data.key);
            console.log(arr)

          }
        )
        .catch(error => {
            console.log(error);
        })
      }
      const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const Stock = data.get("stock");
        const Name = data.get("Description");
        axios.post('http://localhost:8000/api/editStock', {name:Name,stock:Stock},{
           headers: {
             'Authorization': `Bearer ${token}`
           }
        })
        .then(response => {
            console.log(response.data);

          }
        )
        .catch(error => {
            console.log(error);
        })
      }
    return(
      <Box
        component="main"
        sx={{mt:6,display: 'flex',flexDirection:"column", justifyContent: 'space-around',alignItems: 'center' ,  flexWrap:'wrap', p: 3 ,width :{sm:`calc(100% - ${drawerWidth}px)`}}}
      > 
       <Box component="form" onSubmit={handleSubmit} sx={{width:"100%",display: 'flex',justifyContent: 'flex-start',alignItems: 'center' ,flexDirection:"column"}}>
        <Box sx={{display:"flex",alignItems:"center",boxShadow:"0px 0px 8px",borderRadius:3}}>
          <Avatar sx={{marginRight:2}}>
            <SearchIcon />
          </Avatar>
          <TextField 
            m = 'normal'
            border = "none"
            required  fullWidth
            id="Description"
            name="Description"  
            value = {val}
            onChange={handleChange}
          >
          </TextField>
          
        </Box>
        
        <Box sx={{display:"flex",width:"50%",alignItems:"center",mt:1,boxShadow:"0px 0px 8px",borderRadius:3,display:"flex",alignItems:"center",flexDirection:"column"}}>
        {flag && arr.map((element)=>{return(<Button onClick={(e)=>{handleOnClickChange(element)}}>{element}</Button>)})}
        </Box>
        <Box sx={{display: 'flex',width:"100%",justifyContent: "space-around",alignItems: 'center',m:1 }}>
          <Box sx={{width:"50%"}}>
              <Typography >
                  stock
              </Typography>
          </Box>
          <Box sx={{width:"100%",display: 'flex',justifyContent: 'flex-end',alignItems: 'center' }}>
              <TextField
                  m = 'normal'
                  required  fullWidth
                  id="stock"
                  name="stock"                        
              />
          </Box>
        </Box>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >submit</Button>
      </Box>
    </Box>
    );
}

export default Inventory;