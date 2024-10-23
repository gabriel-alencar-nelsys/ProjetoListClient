import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { EditIconButton } from "../edit";

const DataTable = ({
  table = [],
  columns = [],
  columnVisibility = {},
  showEditIcon,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      sx={{
        background: "#323238",
        borderRadius: "12px",
        color: "#FFFA",
        fontWeight: "bold",
      }}
    >
      {isMobile ? (
        <Grid container spacing={2}>
          {table.map((cliente) =>
            cliente?.pedidos.map((pedido) =>
              pedido.itens.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      backgroundColor: "#323238",
                      color: "#FFF",
                      borderRadius: "8px",
                    }}
                  >
                    <CardContent>
                      <h4>
                        Cliente: {cliente.nome}
                        <span style={{ marginLeft: "5rem" }}></span>
                        {showEditIcon && <EditIconButton />}
                      </h4>
                      {columnVisibility.showid && (
                        <p>ID do Pedido: {pedido.id}</p>
                      )}
                      {columnVisibility.showEmail && (
                        <p>Email: {cliente.email}</p>
                      )}
                      {columnVisibility.showTelefone && (
                        <p>Telefone: {cliente.telefone}</p>
                      )}
                      <p>Produto: {item.produto}</p>
                      <p>Quantidade: {item.quantidade}</p>
                      {columnVisibility.showPreco && <p>Preço: {item.preco}</p>}
                      {columnVisibility.showData && <p>Data: {pedido.data}</p>}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )
          )}
        </Grid>
      ) : (
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
                    {columnVisibility.showid && (
                      <TableCell
                        sx={{ backgroundColor: "#323238", color: "#FFF" }}
                      >
                        {pedido.id}
                      </TableCell>
                    )}
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
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
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
                      {item.produto}
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
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
                    <TableCell
                      sx={{ backgroundColor: "#323238", color: "#FFF" }}
                    >
                      <EditIconButton />
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
