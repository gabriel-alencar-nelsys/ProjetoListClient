import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Header } from "./header/index";
import DataTable from "../defaultTable/index";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";

export const Initial = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const columns = [
    { label: "Nome", key: "nome" },
    { label: "Produto", key: "produto" },
    { label: "Quantidade", key: "quantidade" },
  ];

  useEffect(() => {
    axios
      .get("http://assets.nelsys.vps-kinghost.net/json5.json")
      .then((response) => {
        setData(response.data.clientes);
        setFilteredData(response.data.clientes);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  const columnVisibility = {
    showEmail: false,
    showTelefone: false,
    showPreco: false,
    showData: false,
    showNome: true,
  };

  return (
    <>
      <Stack spacing={3} sx={{ direction: "column", padding: 2 }}>
        <Header />
        <Stack sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              marginTop: 2,
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            Lista de Clientes
          </Typography>
          <Divider />
        </Stack>
        <Stack>
          {loading ? (
            <Typography variant="body1" color="white">
              Carregando...
            </Typography>
          ) : filteredData.length === 0 ? (
            <Typography variant="body1" color="white">
              Nenhum cliente encontrado.
            </Typography>
          ) : (
            <DataTable
              table={filteredData}
              columns={columns}
              columnVisibility={columnVisibility}
              showEditIcon={false}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};
