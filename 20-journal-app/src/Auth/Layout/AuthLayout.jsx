import { Box, Typography } from "@mui/material";

export const AuthLayout = ({children, title=''}) => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "primary.main",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="section"
        className="box-shadow"
        sx={{
          width: {
            xs: "70%",
            sm: "60%",
            md: "40%",
            lg: "30%",
          }, // Ancho responsivo
          padding: { xs: 2, sm: 3, md: 4 }, // Padding responsivo
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
          xs: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          { title }
        </Typography>

					{/* Children */}
					{ children }

      </Box>
    </Box>
  );
};
