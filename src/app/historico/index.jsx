import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function Story() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [anchorEL, setAnchorEL] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");

  const columns = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "telefone", label: "Telefone" },
    { key: "produto", label: "Produto" },
    { key: "quantidade", label: "Quantidade" },
    { key: "preco", label: "Preço" },
    { key: "data", label: "Data do Pedido" },
  ];

  useEffect(() => {
    axios
      .get("http://assets.nelsys.vps-kinghost.net/json5.json")
      .then((response) => {
        console.log("Dados recebidos:", response.data); 
        setData(response.data.clientes);
        setFilteredData(response.data.clientes);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEL(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEL(null);
  };

  const handleProductSelect = (produto) => {
    setSelectedProduct(produto);
    handleClose();
  };

  const open = Boolean(anchorEL);

  const uniqueProducts = Array.from(
    new Set(
      data.flatMap((cliente) =>
        cliente.pedidos.flatMap((pedido) =>
          pedido.itens.map((item) => item.produto)
        )
      )
    )
  );

  const handlePesquisar = () => {
    let filtered = data;

    if (nome) {
      filtered = filtered.filter((cliente) =>
        cliente.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    setFilteredData(filtered);
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
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography
          sx={{ color: "#00B37E", fontSize: "14px", fontWeight: "bold" }}
        >
          Filtros:
        </Typography>
        <Button
          sx={{
            background: "#2b5fc0",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "12px",
            "&:hover": {
              background: "#0942ad",
            },
            width: {
              md: "40%",
              xs: "30%",
            },
          }}
          onClick={handlePesquisar}
          variant="contained"
          aria-label="Adicionar filtro"
        >
          Adicionar
        </Button>
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
                width: {
                  xs: "100%",
                  md: "70%",
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "white", fontSize: "12px" }}></InputLabel>
          <TextField
            variant="outlined"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            label="ID"
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
                width: {
                  xs: "100%",
                  md: "70%",
                },
              },
            }}
          />
        </FormControl>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 50,
            maxHeight: { xs: 100, md: 40 },
            maxWidth: { xs: 50, md: 40 },
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
          {uniqueProducts.map((produto) => (
            <MenuItem
              key={produto}
              onClick={() => handleProductSelect(produto)}
            >
              {produto}
            </MenuItem>
          ))}
        </Popover> */}
        <Button
          sx={{
            background: "#087a58",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "12px",
            "&:hover": {
              background: "#024d36",
            },
            width: {
              md: "40%",
            },
          }}
          onClick={handlePesquisar}
          variant="contained"
        >
          Pesquisar
        </Button>
      </Stack>
      <Stack>
        <DataTable
          table={filteredData}
          columns={columns}
          columnVisibility={{
            showEmail: true,
            showTelefone: true,
            showPreco: true,
            showData: true,
          }}
        />
      </Stack>
    </Stack>
  );
}
