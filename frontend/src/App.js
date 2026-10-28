import React, { Component } from 'react';
import {
  Container, Typography, Paper, Table, TableHead, TableBody, TableRow,
  TableCell, TableContainer, TextField, Button, Box, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const API = 'http://localhost:8000/api/producto/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false,
      descripcion: '',
      precio: '',
      mensaje: null
    }
  }

  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos() {
    fetch(API)
      .then((response) => response.json())
      .then((prod) => {
        this.setState({ productos: prod, recuperado: true })
      })
  }

  agregarProducto = (e) => {
    e.preventDefault();
    const { descripcion, precio } = this.state;
    if (!descripcion.trim() || precio === '') {
      this.setState({ mensaje: { tipo: 'error', texto: 'Completa descripción y precio' } });
      return;
    }
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion: descripcion.trim(), precio: parseFloat(precio) })
    })
      .then((response) => response.json())
      .then((nuevo) => {
        this.setState({
          productos: [...this.state.productos, nuevo],
          descripcion: '',
          precio: '',
          mensaje: { tipo: 'success', texto: `Producto "${nuevo.descripcion}" registrado` }
        })
      })
  }

  mostrarTabla() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Código</b></TableCell>
              <TableCell><b>Descripción</b></TableCell>
              <TableCell align="right"><b>Precio</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.productos.map(prod => (
              <TableRow key={prod.codigo}>
                <TableCell>{prod.codigo}</TableCell>
                <TableCell>{prod.descripcion}</TableCell>
                <TableCell align="right">S/ {prod.precio.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Lista de productos</Typography>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Agregar producto</Typography>
          <Box component="form" onSubmit={this.agregarProducto}
               sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField label="Descripción" size="small" fullWidth value={this.state.descripcion}
              onChange={(e) => this.setState({ descripcion: e.target.value })} />
            <TextField label="Precio" type="number" size="small" sx={{ width: 140 }}
              slotProps={{ htmlInput: { step: '0.01', min: '0' } }} value={this.state.precio}
              onChange={(e) => this.setState({ precio: e.target.value })} />
            <Button type="submit" variant="contained" sx={{ flexShrink: 0 }} startIcon={<AddIcon />}>Agregar</Button>
          </Box>
          {this.state.mensaje && (
            <Alert severity={this.state.mensaje.tipo} sx={{ mt: 2 }}>{this.state.mensaje.texto}</Alert>
          )}
        </Paper>
        {this.state.recuperado
          ? this.mostrarTabla()
          : <Box sx={{ textAlign: 'center' }}><CircularProgress /><div>recuperando datos...</div></Box>}
      </Container>
    );
  }
}

export default App;
