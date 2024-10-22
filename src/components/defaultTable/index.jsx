import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DataTable = ({ table = [], columns = [], columnVisibility = {} }) => {
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
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((cliente) =>
            cliente.pedidos.map((pedido) =>
              pedido.itens.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {cliente.nome}
                  </TableCell>
                  {columnVisibility.showEmail && (
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
                      {cliente.email}
                    </TableCell>
                  )}

                  {columnVisibility.showTelefone && (
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
                      {cliente.telefone}
                    </TableCell>
                  )}

                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {item.produto}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {item.quantidade}
                  </TableCell>

                  {columnVisibility.showPreco && (
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
                      {item.preco}
                    </TableCell>
                  )}

                  {columnVisibility.showData && (
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
                      {pedido.data}
                    </TableCell>
                  )}
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
