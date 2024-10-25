import React, { useMemo } from "react";
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
import Link from "next/link";

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
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleEdit = (cliente) => onEdit && onEdit(cliente);
  const handleDeleteClick = (id) => handleDelete && handleDelete(id);

  const renderTableHeader = useMemo(() => (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.key} sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>
            {column.label}
          </TableCell>
        ))}
        {showEditIcon && <TableCell sx={{ color: "white" }}>Ações</TableCell>}
      </TableRow>
    </TableHead>
  ), [columns, showEditIcon]);
  const ClienteCard = ({ cliente }) => (
    <Grid item xs={12} key={cliente.id}>
      <Card sx={cardStyles}>
        <CardContent>
          <h4 style={headerStyle}>
            Cliente: {cliente.nome}
            <div>
              <Link href={`/historico/detalhes/${cliente.id}`} passHref>
                <VisibilityIcon sx={iconStyle} />
              </Link>
              {onEdit && <EditIcon onClick={() => handleEdit(cliente)} sx={iconStyle} />}
              {handleDelete && <DeleteIcon onClick={() => handleDeleteClick(cliente.id)} sx={iconStyle} />}
            </div>
          </h4>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span>Informações de Contato:</span>
            </AccordionSummary>
            <AccordionDetails>
              {columnVisibility.showid && <p>ID: {cliente.id}</p>}
              {columnVisibility.showEmail && <p>Email: {cliente.email}</p>}
              {columnVisibility.showTelefone && <p>Telefone: {cliente.telefone}</p>}
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Grid>
  );

  const ClienteRow = ({ cliente }) => (
    <TableRow key={cliente.id}>
      <TableCell colSpan={columns.length + (showEditIcon ? 1 : 0)} sx={rowStyles}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={rowHeaderStyle}>
              <span style={nameStyle}>Cliente: {cliente.nome}</span>
              <div>
                <Link href={`/historico/detalhes/${cliente.id}`} passHref>
                  <VisibilityIcon sx={iconStyle} />
                </Link>
                {onEdit && <EditIcon onClick={() => handleEdit(cliente)} sx={iconStyle} />}
                {handleDelete && <DeleteIcon onClick={() => handleDeleteClick(cliente.id)} sx={iconStyle} />}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableBody>
                {columnVisibility.showid && (
                  <TableRow>
                    <TableCell sx={{ color: "#FFF" }}>ID</TableCell>
                    <TableCell sx={{ color: "#FFF" }}>{cliente.id}</TableCell>
                  </TableRow>
                )}
                {columnVisibility.showEmail && (
                  <TableRow>
                    <TableCell sx={{ color: "#FFF" }}>Email</TableCell>
                    <TableCell sx={{ color: "#FFF" }}>{cliente.email}</TableCell>
                  </TableRow>
                )}
                {columnVisibility.showTelefone && (
                  <TableRow>
                    <TableCell sx={{ color: "#FFF" }}>Telefone</TableCell>
                    <TableCell sx={{ color: "#FFF" }}>{cliente.telefone}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer sx={tableContainerStyle}>
      {(isMobile || isTablet) ? (
        <Grid container spacing={2}>
          {table.map((cliente) => <ClienteCard key={cliente.id} cliente={cliente} />)}
        </Grid>
      ) : (
        <Table>
          {renderTableHeader}
          <TableBody>
            {table.map((cliente) => <ClienteRow key={cliente.id} cliente={cliente} />)}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};


const cardStyles = {
  backgroundColor: "#323238",
  color: "#FFF",
  borderRadius: "8px",
};

const headerStyle = { display: "flex", justifyContent: "space-between" };
const iconStyle = { cursor: "pointer", marginRight: "8px", color: "#FFF" };
const tableContainerStyle = {
  background: "#323238",
  borderRadius: "12px",
  color: "#FFFA",
  fontWeight: "bold",
};
const rowStyles = {
  backgroundColor: "#323238",
  padding: 0,
  borderBottom: "none",
};
const rowHeaderStyle = { display: "flex", alignItems: "center" };
const nameStyle = { color: "#FFF", marginRight: "auto" };

export default DataTable;
