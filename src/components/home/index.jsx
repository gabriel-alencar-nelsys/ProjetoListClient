import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Header } from "./header/index";
import Typography from "@mui/material/Typography";
import { Divider, Card, CardContent, Grid, IconButton } from "@mui/material";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      <IconButton
        onclick={() => setIsDrawerOpen(true)}
        sx={{ position: "fixed", top: 10, left: 10 }}
      >
        <MenuIcon sx={{color: 'white'}}/>
      </IconButton>
      <Stack>
        <Header />
      </Stack>
      <Stack spacing={3} sx={{ direction: "column", padding: 2 }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: { xs: "15px", md: "24px" },
              background: "#035039",
              display: "inline-block",
              borderRadius: "10px",
              padding: "4px 8px",
              border: "solid white 1px",
            }}
          >
            Dashboard:
          </Typography>
          <Divider />
        </Stack>
        <Card sx={{ background: "#272626" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginBottom: 2 }}
          >
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  backgroundColor: "#323238",
                  color: "#00B37E",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center" color="white">
                    Clientes
                  </Typography>
                  <Typography variant="h4" align="center">
                    {totalClientes}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  backgroundColor: "#323238",
                  color: "#00B37E",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center" color="white">
                    Pedidos
                  </Typography>
                  <Typography variant="h4" align="center">
                    {totalPedidos}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  backgroundColor: "#323238",
                  color: "#00B37E",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center" color="white">
                    Quantidade
                  </Typography>
                  <Typography variant="h4" align="center">
                    {totalQuantidade}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{
                  backgroundColor: "#323238",
                  color: "#00B37E",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center" color="white">
                    Valor Total
                  </Typography>
                  <Typography variant="h4" align="center">
                    R$ {totalValor.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Card>

        <Stack sx={{ marginTop: 3 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "white", marginBottom: 2 }}
          >
            Total Comprado por Cliente
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientesCompras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" tick={{ fill: "white" }} />{" "}
              <YAxis tick={{ fill: "white" }} /> <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalComprado" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Stack>

        <Stack
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "white", marginBottom: 2 }}
          >
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
              <Typography variant="body1">
                Nenhum produto encontrado.
              </Typography>
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
