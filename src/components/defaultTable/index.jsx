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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Link from "next/link"; // Importa Link do Next.js

const DataTable = ({
  table = [],
  columns = [],
  columnVisibility = {},
  showEditIcon = true,
  onEdit,
  handleDelete,
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
          {table.map((cliente) => (
            <Grid item xs={12} key={cliente.id}>
              <Card
                sx={{
                  backgroundColor: "#323238",
                  color: "#FFF",
                  borderRadius: "8px",
                }}
              >
                <CardContent>
                  <h4
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Cliente: {cliente.nome}
                    <div>
                      <Link href={`/historico/detalhes/${cliente.id}`} passHref>
                        <VisibilityIcon
                          style={{ cursor: "pointer", marginRight: "8px" }}
                        />
                      </Link>
                      {onEdit && (
                        <EditIcon
                          onClick={() => onEdit(cliente)}
                          style={{ cursor: "pointer", marginRight: "8px" }}
                        />
                      )}
                      {handleDelete && (
                        <DeleteIcon
                          onClick={() => handleDelete(cliente)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  </h4>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <span>Ver Detalhes</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      {columnVisibility.showid && <p>ID: {cliente.id}</p>}
                      {columnVisibility.showEmail && (
                        <p>Email: {cliente.email}</p>
                      )}
                      {columnVisibility.showTelefone && (
                        <p>Telefone: {cliente.telefone}</p>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
              {showEditIcon && (
                <TableCell sx={{ color: "white" }}>Ações</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                  {cliente.nome}
                </TableCell>
                {columnVisibility.showEmail && (
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {cliente.email}
                  </TableCell>
                )}
                {columnVisibility.showTelefone && (
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    {cliente.telefone}
                  </TableCell>
                )}
                {showEditIcon && (
                  <TableCell sx={{ backgroundColor: "#323238", color: "#FFF" }}>
                    <Link href={`/historico/detalhes/${cliente.id}`} passHref>
                      <VisibilityIcon
                        style={{ cursor: "pointer", marginRight: "8px" }}
                      />
                    </Link>
                    <EditIcon
                      onClick={() => onEdit(cliente)}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    />
                    <DeleteIcon
                      onClick={() => handleDelete(cliente)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
