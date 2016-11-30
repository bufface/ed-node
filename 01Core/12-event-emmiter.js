'use strict';

const EventEmitter = require('events').EventEmitter,
	ee = new EventEmitter();

ee
	.on( 'myevent', message => console.log(message) )
	.once( 'myevent', message => console.log(`Se emite la primera vez: ${message}`) );

ee.emit('myevent', 'Soy un emisor de eventos');
ee.emit('myevent', 'Volviendo a emitir');
ee.removeAllListeners('myevent');
ee.emit('myevent', 'Volviendo a emitir por tercera vez');