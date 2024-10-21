import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DataTable = ({ data }) => {
  return (
    <TableContainer
      sx={{
        background: "#323238",
        borderRadius: "12px",
        color: "#FFFA",
        fontWeight: "bold",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              Nome
            </TableCell>
            <TableCell
              sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              Telefone
            </TableCell>
            <TableCell
              sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              Produto
            </TableCell>
            <TableCell
              sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              Quantidade
            </TableCell>
            <TableCell
              sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              Preço
            </TableCell>
            <TableCell sx={{ color: "white", fontSize: "16px" }}>
              Data do Pedido
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.clientes.map((cliente) =>
            cliente.pedidos.map((pedido) =>
              pedido.itens.map((item) => (
                <TableRow key={pedido.id}>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {cliente.nome}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {cliente.email}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {cliente.telefone}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {item.produto}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {item.quantidade}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {item.preco}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {pedido.data}
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
