import React from "react";
import Stack from "@mui/material/Stack";
import { Header } from "./header/index";
import DataTable from "../defaultTable/index";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

export const Initial = () => {
  return (
    <>
      <Stack spacing={3} sx={{ direction: "column" }}>
        <Header />
        <Stack sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            Lista de Clientes:
          </Typography>
          <Divider />
        </Stack>
        <Stack>
          <DataTable />
        </Stack>
      </Stack>
    </>
  );
};
