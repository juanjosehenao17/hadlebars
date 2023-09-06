const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home'); 
});


io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
  io.on('connection', (socket) => {
    console.log('Cliente conectado');
  
   
    socket.emit('productos', obtenerListaDeProductos());
  
   
    socket.on('crearProducto', (nuevoProducto) => {
      
      io.emit('productos', obtenerListaDeProductos());
    });
  
    socket.on('eliminarProducto', (productoId) => {
      
  
      
      io.emit('productos', obtenerListaDeProductos());
    });
  
    
  });
  
  
  function obtenerListaDeProductos() {
    
    return listaDeProductos;
  }

 
});
app.post('/crearproducto', (req, res) => {
    
    io.emit('productos', obtenerListaDeProductos());
  
    
  });
  


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});