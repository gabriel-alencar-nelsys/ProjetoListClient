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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddForm = ({ open, onclose, data, onSave }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    // produto: "",
    // quantidade: "",
    // preco: "",
    pedidos:[],
    // data: new Date().toISOString().split("T")[0], 
  });


  useEffect(() => {
    if (data) {
      setFormData(data); 
    } else {
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        // produto: "",
        // quantidade: "",
        pedidos:[]
        // preco: "",
        // data: new Date().toISOString().split("T")[0], 
      });
    }
  }, [data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    if (!formData.nome || !formData.email) {
      toast.error("Por favor, preencha os campos obrigatórios!");
      return;
    }

    toast.success("Dados Salvos com Sucesso!");
    onSave(formData);
    onclose(); 
  };

  return (
    <Dialog open={open} onClose={onclose}>
      <Stack>
        <DialogTitle sx={{ fontWeight: "bold" }}>Adicionar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            name="nome"
            label="Nome"
            fullWidth
            margin="normal"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="telefone"
            label="Telefone"
            fullWidth
            margin="normal"
            value={formData.telefone}
            onChange={handleChange}
          />
          {/* <TextField
            name="produto"
            label="Produto"
            fullWidth
            margin="normal"
            value={formData.produto}
            onChange={handleChange}
          />
          <TextField
            name="quantidade"
            label="Quantidade"
            fullWidth
            margin="normal"
            type="number"
            value={formData.quantidade}
            onChange={handleChange}
          />
          <TextField
            name="preco"
            label="Preço"
            fullWidth
            margin="normal"
            type="number"
            value={formData.preco}
            onChange={handleChange}
          /> */}
          {/* <TextField
            name="data"
            label="Data Do Pedido"
            value={formData.data}
            fullWidth
            type="date"
            margin="normal"
            onChange={handleChange}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onclose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Stack>
      <ToastContainer />
    </Dialog>
  );
};
