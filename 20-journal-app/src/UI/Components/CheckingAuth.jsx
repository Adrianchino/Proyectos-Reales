import { Box, CircularProgress } from "@mui/material";

export const CheckingAuth = () => {
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
				flexDirection='row'
      >

				<CircularProgress color="warning}"/>

			</Box>
    </Box>
  );
};
