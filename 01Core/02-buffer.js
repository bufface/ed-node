/*
 Buffers
 Una tira de bytes (datos binarios)
 Similar a un array de enteros
 Tamaño fijo
 Manipular datos directamente
 Sockets
 Streams
 Implementar protocolos complejos
 Manipulación de ficheros/imágenes
 Criptografía
 */
'use strict';

let buf = new Buffer(26);

console.log(
  buf,
  buf.length,
  buf.toString()
);

for ( let i = 0; i < buf.length; i++ ) {
  // 97 en ASCII es a
  buf[i] = i + 97;
}

console.log( buf.toString() );