'use strict';

const fs = require('fs');

let promise = new Promise((resolve, reject) => {
	fs.readFile('archivo.txt', (error, content) => {
		return (error) ? reject( new Error('El archivo no se pudo leer') ) : resolve(content);
	});
});

console.log('\nAbriendo Archivo...');

promise
	.then( promiseData => console.log( promiseData.toString() )  )
	.catch( error => console.log(error.message) );

console.log('\nHaciendo otra cosa\n');

console.log( process.uptime() );