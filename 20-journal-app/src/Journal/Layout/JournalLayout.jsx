import { Box, Toolbar } from "@mui/material";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBar";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__faster">
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />
      {/* Sidebar */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        {children}
      </Box>

    </Box>
  );
};
