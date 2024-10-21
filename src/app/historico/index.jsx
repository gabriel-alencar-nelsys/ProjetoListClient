"use client";

import React, { useState } from "react";

import { Box, Button, MenuItem, Popover, TextField } from "@mui/material";
import { Header } from "@/components/home/header";
import { GlobalStyle } from "../styles/global";
import {
  Divider,
  FormControl,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import DataTable from "@/components/defaultTable";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const handleChange = (event) => {
  event.target.value;
};

const data = {
  clientes: [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@exemplo.com",
      telefone: "1234-5678",
      pedidos: [
        {
          id: 101,
          data: "2024-09-01",
          valor: 150.75,
          itens: [
            {
              produto: "Produto A",
              quantidade: 2,
              preco: 29.99,
            },
            {
              produto: "Produto B",
              quantidade: 1,
              preco: 49.99,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria.oliveira@exemplo.com",
      telefone: "9876-5432",
      pedidos: [
        {
          id: 201,
          data: "2024-09-10",
          valor: 200,
          itens: [
            {
              produto: "Produto A",
              quantidade: 1,
              preco: 29.99,
            },
            {
              produto: "Produto D",
              quantidade: 4,
              preco: 40,
            },
          ],
        },
      ],
    },
  ],
};

export default function Story() {
  const [nome, setNome] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [anchorEL, setanchorEL] = useState(null);

  const handleClick = (event) => {
    setanchorEL(event.currentTarget);
  };
  const handleClose = () => {
    setanchorEL(null);
  };

  const open = Boolean(anchorEL);

  const handlePesquisar = () => {
    const filtered = data.clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(nome.toLowerCase())
    );
    setfilteredData(filtered);
  };

  return (
    <Stack spacing={1}>
      <GlobalStyle />
      <Header />
      <Stack>
        <Typography
          sx={{
            color: "white",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          Dados Gerais
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography
          sx={{ color: "#00B37E", fontSize: "14px", fontWeight: "bold" }}
        >
          Filtros:
        </Typography>
      </Stack>
      <Divider />
      <Stack sx={{ color: "white", flexDirection: "row", gap: 0.5 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "white", fontSize: "12px" }}></InputLabel>
          <TextField
            variant="outlined"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            label="Nome"
            InputLabelProps={{ style: { color: "white", fontSize: "12px" } }}
            InputProps={{
              sx: {
                color: "white",
                fontSize: "12px",

                background: "#323238",
                border: "1px solid white",
                borderRadius: "12px",
                "&:hover": {
                  background: "#171718",
                },
              },
            }}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 50,
            maxHeight: { xs: 100, md: 10 },
            maxWidth: { xs: 50, md: 10 },
            color: "white",
          }}
          onClick={handleClick}
        >
          <FilterAltIcon />
        </Box>
        <Popover
          open={open}
          anchorEl={anchorEL}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleClose}>Opção 1</MenuItem>
          <MenuItem onClick={handleClose}>Opção 2</MenuItem>
          <MenuItem onClick={handleClose}>Opção 3</MenuItem>
        </Popover>
        <Button
          sx={{
            background: "#087a58",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "12px",
            "&:hover": {
              background: "#024d36",
            },
          }}
          onClick={handlePesquisar}
          variant="contained"
        >
          Pesquisar
        </Button>
      </Stack>
      <Stack>
        <DataTable />
      </Stack>
    </Stack>
  );
}
