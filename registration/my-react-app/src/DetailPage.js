import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate } from 'react-router-dom';
import ProductsIcon from './image/products';
import CustomerIcon from './image/customer';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Container } from '@mui/material';
import SalesAndInventory from './SalsAndInventory';
import Customer from './Customer';
import Products from './Products';
import AnalyticalReport from './AnalyticalReport';
import InventoryIcon from './image/inventory';
import Inventory from './Inventory';
import ProductsUpdate from './ProductsUpdate';
const drawerWidth = 240;

function DashBoard(props) {
  const navigate  = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleNavigation(value){
    console.log(value);
    navigate(`/dashboard/${value}`);
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    navigate("/login");
  }

  const drawer = (
    <div>             
      <List>
        <ListItem sx={{direction:"ltr" , display: { sm: 'none' }}}>
          <Container>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            
          >
            <MenuIcon />
          </IconButton>
          </Container>
          
        </ListItem>
        <ListItem  >
            <ListItemButton onClick={e=>{handleNavigation("products")}}>
              <ListItemIcon>
                <ProductsIcon  />
              </ListItemIcon>
              <ListItemText  primary= "Products " />
            </ListItemButton>
           
        </ListItem>
        <ListItem>
            <ListItemButton onClick={e=>{handleNavigation("customer")}}>
              <ListItemIcon>
                <CustomerIcon />
              </ListItemIcon>
              <ListItemText  primary= "Customer" />
            </ListItemButton>
           
        </ListItem>
        <ListItem>
            <ListItemButton onClick={e=>{handleNavigation("inventory")}}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText  primary= "Inventory" />
            </ListItemButton>
           
        </ListItem>
        <ListItem>
            <ListItemButton onClick={e=>{handleNavigation("analytical")}}>
              <ListItemIcon>
                <AnalyticsIcon sx={{color:"black"}}/>
              </ListItemIcon>
              <ListItemText  primary= "Analytical Report" />
            </ListItemButton>
           
        </ListItem>
        <ListItem>
            <ListItemButton onClick={e=>{handleNavigation("support")}} >
              <ListItemIcon>
                <SupportAgentIcon sx={{color:"black"}}/>
              </ListItemIcon>
              <ListItemText  primary= "Support" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon sx={{color:"black"}} />
              </ListItemIcon>
              <ListItemText  primary= "Logout" />
            </ListItemButton>
        </ListItem>
      </List>
     
      
    </div>
  );
  
  
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{backgroundColor:"red"}}>
      <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
      >
            <Toolbar sx = {{direction : 'flex' ,justifyContent: 'space-between' }}>
              
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 , display: { sm: 'none' }}}
                >
                  <MenuIcon />
                </IconButton>
                <Typography onClick={e=>{handleNavigation("SalesAndInventory")}}>
                  HOME
                </Typography>
              
              <IconButton
                color="inherit"
                aria-label="logout"
                edge="start"
                onClick={handleLogOut}
                sx={{ mr: 2 }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ backgroundColor:"yellow" ,width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet /> 

    </Box>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;