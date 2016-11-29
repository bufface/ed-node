/*
 Streams
 'Chorros' de información que se transmiten en 'Pedazos' (Chunks)
 3 tipos: Lectura / Escritura / Duplex
 Instancias de EventEmitter
 Acceso asíncrono
 Es raro crear streams directamente
 Pero muchos recursos nos ofrecen este interfaz
 Detrás de muchos mecanismos de Node.JS
 stdin/stdout
 request de HTTP
 Sockets
 Manipulación de ficheros/imágenes
 */

'use strict';

const fs = require('fs');

let readStream = fs.createReadStream('./assets/nombres.txt'),
  writeStream = fs.createWriteStream('./assets/nombres_copia.txt');

readStream.pipe(writeStream);

readStream
  .on( 'data', chunk => {
    console.log(chunk);
    console.log( chunk.toString() );
    console.log('He leído:', chunk.length, 'caracteres');
  } )
  .on( 'end', () => console.log('Terminé de leer el archivo') )
  .on( 'error', error => console.log('Ocurrió un error: ', error.message) );