"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, Typography, Grid, Avatar, Divider, CircularProgress, Box, List, ListItem, ListItemText } from "@mui/material";

const Detalhes = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://assets.nelsys.vps-kinghost.net/json5.json`);

        if (!response.ok) {
          throw new Error("Erro ao buscar os detalhes do cliente");
        }

        const data = await response.json();
        
        // Log da estrutura do JSON recebido
        console.log("Dados recebidos:", data);

        // Acessa a lista de clientes
        if (!data.clientes || !Array.isArray(data.clientes)) {
          throw new Error("A resposta não contém uma lista de clientes");
        }

        // Filtrando o cliente que corresponde ao ID obtido
        const clienteEncontrado = data.clientes.find(cliente => cliente.id.toString() === id);
        
        if (!clienteEncontrado) {
          throw new Error("Cliente não encontrado");
        }

        setCliente(clienteEncontrado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography marginLeft={2}>Carregando detalhes do cliente...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center" marginTop={4}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ padding: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ width: 80, height: 80, marginRight: 2 }}>
                {cliente.nome.charAt(0)} {/* Exibe a primeira letra do nome */}
              </Avatar>
              <Typography variant="h5">{cliente.nome}</Typography>
            </Box>

            <Divider />

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Informações Pessoais
              </Typography>
              <Typography>
                <strong>Email:</strong> {cliente.email}
              </Typography>
              <Typography>
                <strong>Telefone:</strong> {cliente.telefone}
              </Typography>
            </Box>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Pedidos Realizados
              </Typography>
              <List>
                {cliente.pedidos.map(pedido => (
                  <ListItem key={pedido.id} sx={{ borderBottom: "1px solid #ccc", paddingBottom: 2 }}>
                    <ListItemText
                      primary={`Pedido ID: ${pedido.id}`}
                      secondary={`Data: ${pedido.data} | Valor: R$ ${pedido.valor.toFixed(2)}`}
                    />
                    <List sx={{ marginTop: 1 }}>
                      {pedido.itens.map(item => (
                        <ListItem key={item.produto}>
                          <ListItemText
                            primary={`${item.quantidade} x ${item.produto} (R$ ${item.preco.toFixed(2)})`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Informações Adicionais
              </Typography>
              <Typography>
                <strong>ID do Cliente:</strong> {cliente.id}
              </Typography>
              <Typography>
                <strong>Status:</strong> {cliente.status}
              </Typography>
              <Typography>
                <strong>Data de Cadastro:</strong> {cliente.dataCadastro}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Detalhes;
