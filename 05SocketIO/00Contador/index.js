/*
 Socket.IO
 1)Eventos connection y disconnect
 2)Puedes crear tus propios eventos
 3)emit(): cuando se comunica un mensaje a todos los clientes conectados
 4)broadcast.emit(): cuando se comunica un mensaje a todos los clientes, excepto al que lo origina
 5)Los 4 puntos anteriores funcionan en el servidor y en el cliente
 */
'use strict';

const http = require('http').createServer(server),
  fs = require('fs'),
  io = require('socket.io')(http);

let conections = 0;

function server(req, res) {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text-html'});
      return res.end('<h1>Error interno del Servidor</h1>')
    } else {
      res.writeHead(200, {'Content-Type': 'text-html'});
      return res.end(data, 'utf-8');
    }
  });
}

http.listen(3000, () => console.log('Servidor corriendo desde localhost:3000'));

io.on('connection', (socket) => {
  socket.emit('hello', {message: 'Hola Mundo con Socket.IO'});

  socket.on('otro evento que me invite', data => console.log(data));

  conections++;
  console.log(`Conexiones activas: ${conections}`);
  socket.emit('connect users', {numbers: conections });

  socket.broadcast.emit('connect users', {numbers: conections});

  socket.on('disconnect', () => {
    conections--;
    console.log(`Conexiones activas: ${conections}`);
    socket.broadcast.emit('connect users', {numbers: conections });
  });
});