import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddForm = ({ open, onclose, onSave, data }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    produto: "",
    quantidade: "",
    preco: "",
    data: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        produto: "",
        quantidade: "",
        preco: "",
        data: new Date().toISOString().split("T")[0],
      });
    }
  }, [data, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    toast.success("Salvo com sucesso!");
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      produto: "",
      quantidade: "",
      preco: "",
      data: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Dialog open={open} onClose={onclose}>
      <ToastContainer />
      <DialogTitle>Adicionar Cliente</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            name="nome"
            label="Nome"
            variant="outlined"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="telefone"
            label="Telefone"
            variant="outlined"
            value={formData.telefone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="produto"
            label="Produto"
            variant="outlined"
            value={formData.produto}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="quantidade"
            label="Quantidade"
            variant="outlined"
            value={formData.quantidade}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="preco"
            label="Preço"
            variant="outlined"
            value={formData.preco}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="data"
            label="Data do Pedido"
            type="date"
            variant="outlined"
            value={formData.data}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onclose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
