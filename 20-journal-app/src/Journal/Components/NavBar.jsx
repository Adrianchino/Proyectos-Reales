import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
} from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../Store/Auth";

export const NavBar = ({ drawerWidth = 240 }) => {
  
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch( startLogout() )
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        // position="static"

        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },

          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label=""
            onClick={() => setOpen(true)}
            color="inherit"
            edge="start"
            sx={{
              display: { xs: "flex", sm: "none" },

              mr: 2,
            }}
          >
            <MenuOutlined />
          </IconButton>

          <Typography
            variant="h6"
            // noWrap

            component="span"
            sx={{ flexGrow: 1 }}
          >
            JournalApp
          </Typography>

          <IconButton aria-label="" color="error" 
            onClick={ onLogout }
          >
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <Typography variant="h6" color="initial">
          Lolcat
        </Typography>
      </Drawer>
      
    </>
  );
};
