import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
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
import { EditIconButton } from "@/components/edit";
import { AddForm } from "./form";

export default function Story() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [anchorEL, setAnchorEL] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [produto, setProduto] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const columns = [
    { key: "Id", label: "Id" },
    { key: "nome", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "telefone", label: "Telefone" },
    { key: "produto", label: "Produto" },
    { key: "quantidade", label: "Quantidade" },
    { key: "preco", label: "Preço" },
    { key: "data", label: "Data do Pedido" },
    {
      label: "Editar",
      render: (row) => (
        <EditIconButton
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ];

  function handleOpen() {
    setIsOpen(!isopen);
  }

  useEffect(() => {
    axios
      .get("http://assets.nelsys.vps-kinghost.net/json5.json")
      .then((response) => {
        setData(response.data.clientes);
        setFilteredData(response.data.clientes);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });

      //console.log('data:', data )
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

  const columnVisibility = {
    showEmail: true,
    showTelefone: true,
    showPreco: true,
    showData: true,
    showNome: true,
  };

  const handlePesquisar = () => {
    let filtered = data;

    if (nome) {
      filtered = filtered.filter((cliente) =>
        cliente.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    if (produto) {
      filtered = filtered.filter((cliente) =>
        cliente.pedidos?.some((pedido) =>
          pedido.itens?.some((item) =>
            item.produto.toLowerCase().includes(produto.toLowerCase())
          )
        )
      );
    }

    setFilteredData(filtered);
  };

  const handleSave = (formData) => {
    if (selectedClient) {
      const updatedData = data.map((cliente) =>
        cliente.id === formData.id ? formData : cliente
      );
      setData(updatedData);
      setFilteredData(updatedData);
    } else {
      setData([...data, formData]);
      setFilteredData([...filteredData, formData]);
    }
    handleClose();
    setSelectedClient(null);
  };

  const handleEdit = (cliente) => {
    setIsOpen(true);
    setSelectedClient(cliente);
  };

  const handleDelete = (clientId) => {
    const updatedData = data.filter((cliente) => cliente.id !== clientId);
    setData(updatedData);
    setFilteredData(updatedData);
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
      <Stack direction='row' justifyContent='flex-end'>
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
          onClick={handleOpen}
          variant="contained"
        >
          Adicionar
        </Button>
        <AddForm
          open={isopen}
          onclose={() => {
            setIsOpen(false);
            setSelectedClient(null);
          }}
          onSave={handleSave}
          data={selectedClient} 
        />
      </Stack>
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
            onChange={(e) => setProduto(e.target.value)}
            value={produto}
            label="Produto"
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
          columnVisibility={columnVisibility}
          showEditIcon={true}
          onEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Stack>
    </Stack>
  );
}
