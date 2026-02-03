import { StarOutline } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "80vh",
        backgroundColor: "primary.main",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
      }}
			className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid>
        <StarOutline
          sx={{
            fontSize: "100px",
            color: "white",
          }}
        />
      </Grid>

      <Grid>
        <Typography color="white" variant="h5">
          Seleciona o crea una nota
        </Typography>
      </Grid>
    </Box>
  );
};
