'use strict';

const fs = require('fs');
console.log('\nAbriendo Archivo...');

function imprimir(error, content) {
   console.log(content);
}
 
let content = fs.readFile('archivo.txt', 'utf8', imprimir);

console.log('\nHaciendo otra cosa\n');

console.log( process.uptime() );