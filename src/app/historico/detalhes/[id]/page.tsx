"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Skeleton,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GlobalStyle } from "@/app/styles/global";

const Detalhes = () => {
  const { id } = useParams();
  const router = useRouter();
  const theme = useTheme();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCliente = useCallback(async () => {
    try {
      const response = await fetch(`http://assets.nelsys.vps-kinghost.net/json5.json`);

      if (!response.ok) {
        throw new Error("Erro ao buscar os detalhes do cliente");
      }

      const data = await response.json();

      if (!data.clientes || !Array.isArray(data.clientes)) {
        throw new Error("A resposta não contém uma lista de clientes");
      }

      const clienteEncontrado = data.clientes.find((cliente) => cliente.id.toString() === id);

      if (!clienteEncontrado) {
        throw new Error("Cliente não encontrado");
      }

      setCliente(clienteEncontrado);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCliente();
  }, [fetchCliente]);

  const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");
  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

   if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
        <Skeleton variant="rectangular" width={300} height={150} />
        <Skeleton variant="text" width={200} sx={{ marginTop: 2 }} />
        <Skeleton variant="circular" width={40} height={40} sx={{ marginTop: 2 }} />
        <Typography marginTop={2}>Carregando detalhes do cliente...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          color="primary"
          sx={{ marginLeft: 2 }}
        >
          Tentar novamente
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 5 }, margin: "0 auto", maxWidth: { md: "60%", lg: "50%", xl: "40%" } }}>
      <GlobalStyle />
      <IconButton
        onClick={() => router.back()}
        sx={{ position: "absolute", top: 16, left: 16, color: theme.palette.primary.main }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        component="img"
        src="/order.svg"
        sx={{
          height: { xs: 100, md: 300 },
          width: "100%",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: { xs: "scale(1.2)", md: "none" },
          },
        }}
      />

      <Typography variant="h5" align="center" sx={{ color: "white", background:"#035039", borderRadius:"10px" }}>
        Detalhes do Pedido
      </Typography>

      <Grid container spacing={3} justifyContent="center" marginTop={2}>
        <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
          <Card sx={{ padding: 3, borderRadius: 15 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ width: 80, height: 80, marginRight: 2 }}>
                  {cliente?.nome.charAt(0)}
                </Avatar>
                <Typography fontWeight={"bold"} variant="h5">
                  {cliente?.nome || "Nome não disponível"}
                </Typography>
              </Box>
              <Divider />

              <Accordion sx={{ maxWidth: "600px", margin: "0 auto", marginBottom: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography fontWeight={"bold"} variant="h6">
                    Informações de Contato
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Email:</strong> {cliente?.email || "Não disponível"}
                    <br />
                    <strong>Telefone:</strong> {cliente?.telefone || "Não disponível"}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ maxWidth: "600px", margin: "0 auto", marginBottom: 2 }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel2-content"
    id="panel2-header"
  >
    <Typography fontWeight={"bold"} variant="h6">
      Pedidos Realizados
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
  <List>
    {cliente?.pedidos?.map((pedido) => {
      const totalProdutos = pedido.itens.reduce(
        (acc, item) => acc + item.quantidade * item.preco,
        0
      );

      return (
        <ListItem key={pedido.id} sx={{ borderBottom: "1px solid #ccc", paddingBottom: 2 }}>
          <ListItemText
            primary={`Pedido ID: ${pedido.id}`}
            secondary={`Data: ${formatDate(pedido.data)} | Total dos Produtos: ${formatCurrency(totalProdutos)}`}
          />
          <List sx={{ marginTop: 1 }}>
            {pedido.itens?.map((item) => (
              <ListItem key={item.produto}>
                <ListItemText
                  primary={`${item.quantidade} x ${item.produto} (${formatCurrency(item.preco)})`}
                />
              </ListItem>
            ))}
          </List>
        </ListItem>
      );
    })}

    <ListItem sx={{ marginTop: 2, borderTop: "2px solid #000", background:"#00B37E" }}>
      <ListItemText
        primary="Valor Total Pago:"
        secondary={formatCurrency(
          cliente.pedidos.reduce(
            (acc, pedido) =>
              acc + pedido.itens.reduce((accItem, item) => accItem + item.quantidade * item.preco, 0),
            0
          )
        )}
        sx={{ fontWeight: "bold" }}
      />
    </ListItem>
  </List>
</AccordionDetails>
</Accordion>


              <Accordion sx={{ maxWidth: "600px", margin: "0 auto", marginBottom: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography fontWeight={"bold"} variant="h6">
                    Informações Adicionais
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>ID do Cliente:</strong> {cliente?.id || "Não disponível"}
                    <br />
                    <strong>Status:</strong>
                    <span
                      style={{
                        color: cliente?.status === "ativo" ? "green" : "grey",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {cliente?.status || "Concluido"}
                    </span>
                    <br />
                    <strong>Data de Cadastro:</strong> {formatDate(cliente?.dataCadastro) || "Não disponível"}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Detalhes;
