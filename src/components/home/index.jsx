import React from "react";
import Stack from "@mui/material/Stack"; 
import { Header } from "./header/index";
import DataTable from "../defaultTable/index";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion"; 
import AccordionSummary from "@mui/material/AccordionSummary"; 
import AccordionDetails from "@mui/material/AccordionDetails"; 
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import { Divider } from "@mui/material";

export const Initial = () => {
  return (
    <>
      <Stack spacing={3} sx={{ direction: "column"}}>
        <Header />
        <Stack sx={{display:'flex',justifyContent:'center'}}>
          <Typography sx={{ color: "white", fontWeight: "bold", marginTop: 2, display:'flex', justifyContent:'center' }}>
            Clientes/Pedidos:
          </Typography>
           <Divider/>
        </Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{fontWeight:"bold"}} >Veja a tabela de clientes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DataTable />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{fontWeight:"bold"}} >Pedidos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DataTable />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
};
