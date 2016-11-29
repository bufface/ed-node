'use strict';

const fs = require('fs');
console.log('\nAbriendo Archivo...');

let content = fs.readFileSync('archivo.txt', 'utf8');
console.log(content);

console.log('\nHaciendo otra cosa\n');

console.log( process.uptime() );