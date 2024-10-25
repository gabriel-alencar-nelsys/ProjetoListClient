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
  CircularProgress,
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
      <Box display="flex" flexDirection="column" alignItems="center" height="100vh" padding={2}>
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
    <Box sx={{ padding: 2 }}>
      <GlobalStyle />
      <IconButton
        onClick={() => router.back()}
        sx={{ position: "absolute", top: 16, left: 16, color: theme.palette.primary.main }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        component="img"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: 233,
          width: "100%",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
        src="/order.svg"
      />

      <Typography variant="h5" align="center" sx={{ color: "white" }}>
        Detalhes do Pedido
      </Typography>

      <Grid container spacing={3} justifyContent="center" marginTop={2}>
        <Grid item xs={12} sm={8} md={6}>
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

              <Accordion>
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

              <Accordion>
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
                    {cliente?.pedidos?.map((pedido) => (
                      <ListItem key={pedido.id} sx={{ borderBottom: "1px solid #ccc", paddingBottom: 2 }}>
                        <ListItemText
                          primary={`Pedido ID: ${pedido.id}`}
                          secondary={`Data: ${formatDate(pedido.data)} | Valor: ${formatCurrency(
                            pedido.valor
                          )}`}
                        />
                        <List sx={{ marginTop: 1 }}>
                          {pedido.itens?.map((item) => (
                            <ListItem key={item.produto}>
                              <ListItemText
                                primary={`${item.quantidade} x ${item.produto} (${formatCurrency(
                                  item.preco
                                )})`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
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
