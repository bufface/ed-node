'use strict';

const http = require('http'),
	options = {
		host : 'escuela.digital',
		port : 80,
		path : '/'
	};

http
	.get( options, res => console.log(`El sitio ${options.host} ha respondido. Código de Estado: ${res.statusCode}`) )
	.on( 'error', err => console.log(`El sitio ${options.host} no respondió. Código de Estado: ${err.code}. Error: ${err.message}`) );