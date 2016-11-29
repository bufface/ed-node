'use strict';

const http = require('http').createServer(webServer),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	urls = [
		{
			id : 1,
			route : '',
			html : './assets/index.html'
		},
		{
			id : 2,
			route : 'acerca',
			html : './assets/acerca.html'
		},
		{
			id : 3,
			route : 'contacto',
			html : './assets/contacto.html'
		}
	];

function webServer(req, res) {
	let pathURL = path.basename(req.url),
		//Pass true as the second argument to also parse the query string using the querystring module
		id = url.parse( req.url, true ).query.id;

	console.log(`path:${pathURL}, id: ${id}`);

	urls.forEach(pos => {
		if ( pos.route == pathURL || pos.id == id ) {
			res.writeHead(200, {'Content-Type':'text/html'});
			fs.readFile( pos.html, (err, data) => (err) ? console.log(err.message) : res.end(data) );
		}
	});
}

http.listen( 3000, 'localhost', () => console.log('Servidor corriendo en http://localhost:3000/') );