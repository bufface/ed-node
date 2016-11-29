'use strict';

const fs = require('fs');
console.log('\nAbriendo Archivo...');
 
let content = fs.readFile('archivo.txt', 'utf8', (error, content) => {
	console.log(content);
});

console.log('\nHaciendo otra cosa\n');

console.log( process.uptime() );