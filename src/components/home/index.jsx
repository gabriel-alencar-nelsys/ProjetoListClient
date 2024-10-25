import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Header } from "./header/index";
import Typography from "@mui/material/Typography";
import { Divider, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Initial = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const totalClientes = filteredData.length;
  const totalPedidos = filteredData.reduce(
    (acc, cliente) => acc + (cliente.pedidos ? cliente.pedidos.length : 0),
    0
  );
  const totalQuantidade = filteredData.reduce((acc, cliente) => {
    const quantidadeCliente = cliente.pedidos?.reduce(
      (accPedidos, pedido) =>
        accPedidos +
        pedido.itens.reduce((accItens, item) => accItens + item.quantidade, 0),
      0
    );
    return acc + (quantidadeCliente || 0);
  }, 0);
  const totalValor = filteredData.reduce((acc, cliente) => {
    const valorCliente = cliente.pedidos?.reduce(
      (accPedidos, pedido) => accPedidos + pedido.valor,
      0
    );
    return acc + (valorCliente || 0);
  }, 0);

  const clientesCompras = filteredData.map((cliente) => ({
    nome: cliente.nome,
    totalComprado:
      cliente.pedidos?.reduce((acc, pedido) => acc + pedido.valor, 0) || 0,
  }));

  const clienteMaisComprou = clientesCompras.reduce(
    (prev, current) => {
      return prev.totalComprado > current.totalComprado ? prev : current;
    },
    { nome: "", totalComprado: 0 }
  );

  const listaProdutos = filteredData.flatMap((cliente) =>
    cliente.pedidos?.flatMap((pedido) =>
      pedido.itens.map((item) => item.produto)
    )
  );

  const produtosUnicos = Array.from(new Set(listaProdutos));

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
            Dashboard:
          </Typography>
          <Divider />
        </Stack>

        <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ backgroundColor: "#323238", color: "#FFF", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Clientes
                </Typography>
                <Typography variant="h4" align="center">
                  {totalClientes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ backgroundColor: "#323238", color: "#FFF", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Pedidos
                </Typography>
                <Typography variant="h4" align="center">
                  {totalPedidos}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ backgroundColor: "#323238", color: "#FFF", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Quantidade
                </Typography>
                <Typography variant="h4" align="center">
                  {totalQuantidade}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ backgroundColor: "#323238", color: "#FFF", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Valor Total
                </Typography>
                <Typography variant="h4" align="center">
                  R$ {totalValor.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Stack sx={{ marginTop: 3 }}>
          <Typography variant="h6" align="center" sx={{ color: "white", marginBottom: 2 }}>
            Total Comprado por Cliente
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientesCompras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis color="white" dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalComprado" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Stack>

        <Stack sx={{ marginTop: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6" align="center" sx={{ color: "white", marginBottom: 2 }}>
            Produtos Comprados
          </Typography>
          <Stack
            spacing={1}
            sx={{
              color: "white",
              paddingLeft: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {produtosUnicos.length === 0 ? (
              <Typography variant="body1">Nenhum produto encontrado.</Typography>
            ) : (
              produtosUnicos.map((produto, index) => (
                <Typography key={index} variant="body1">
                  {produto}
                </Typography>
              ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

